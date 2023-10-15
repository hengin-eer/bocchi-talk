import { Box, Button, Divider, Fade, Flex, Icon, Image, Text, useDisclosure } from '@chakra-ui/react'
import { PiCheckBold, PiMicrophoneFill, PiPaperPlaneRightFill, PiXBold } from 'react-icons/pi'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { AutoResizeTextarea } from './custom-chakra-ui';
import { useFirestore } from '@/hooks/useFirestore';
import { useRecoilValue } from 'recoil';
import { speechLanguageState } from '@/states/speechLanguageState';
import { NewerDiffMessages, OlderDiffMessages } from './preview-diff-messages';
import isProofOnState from '@/states/isProofOnState';
import { systemPromptState } from '@/states/chatThemeState';

export const ChatArea = ({ firestoreMessages, chatsId, currentUser }) => {
	const speechLanguage = useRecoilValue(speechLanguageState)
	const [message, setMessage] = useState({ role: "user", content: "" });
	const [proovedText, setProovedText] = useState(''); // 校正対象のメッセージを管理
	const systemPrompt = useRecoilValue(systemPromptState);
	console.log(systemPrompt);
	const [chats, setChats] = useState([systemPrompt]); // 初期値の設定

	if (firestoreMessages && (firestoreMessages.length !== 0) && (chats.length === 1)) {
		setChats([...chats, ...firestoreMessages])
	}

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [menuIndex, setMenuIndex] = useState(null); // 右クリックされたときのメニューのindexを保持する
	const [viewportHeight, setViewportHeight] = useState(100);
	const [textareaHeight, setTextareaHeight] = useState(0);
	const [isClient, setIsClient] = useState(false);
	const scrollContainer = useRef(null);
	const { addChatsData, updateChatsData, addFirestoreDoc } = useFirestore()
	const isProofOn = useRecoilValue(isProofOnState)
	const loadingAnime = ["🤫", "🫢", "🤔", "🫡"];
	const animeNum = useRef(0);


	const handleInputChange = (value) => {
		setMessage({ role: "user", content: value });
		setProovedText(value);
	}

	const sendMessage = async (e) => {
		try {
			
			e.preventDefault()
			if (message.content === "") return;
			resetTranscript()
			if (firestoreMessages.length === 0) addChatsData(currentUser.email, chatsId)
			else updateChatsData(currentUser.email, chatsId)
			addFirestoreDoc(message, currentUser.email, chatsId)
			setMessage({ role: "user", content: "" });
			setChats((prev) => [...prev, message, { role: "loadingNow", content: loadingAnime[animeNum.current] }]);
			
			const intervalId = setInterval(() => {
				setChats((prev) => {
					const lastMessage = prev[prev.length - 1];
					console.log("intervalIdが発火しました.");
					if (lastMessage.role === "loadingNow") {
						console.log(animeNum.current, ": ", loadingAnime[animeNum.current]);
						animeNum.current = (animeNum.current + 0.5) % loadingAnime.length;
						return [...prev.slice(0, -1), { role: "loadingNow", content: loadingAnime[Math.floor(animeNum.current)] }];
					}
					console.log("intervalIdがクリアされました."); 
					return prev;
				});
			}, 300);
			
			if (isProofOn) {
				const proofResponse = await fetch("/api/proofread", {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						message: proovedText,
					}),
				});

				const proofData = await proofResponse.json();
				if (proofResponse.status !== 200) {
					throw (
						proofData.error ||
						new Error(`Request failed with status ${proofResponse.status}`)
					);
				}

				const proofText = proofData.result.content;
				if (proofText !== proovedText) {
					const proofreadingSentences = {
						role: "proofread",
						content: {
							beforeText: proovedText,
							afterText: proofText,
						},
					}
					setChats((prev) => [...prev.filter((chat) => chat.role !== "loadingNow"), proofreadingSentences]);
					addFirestoreDoc(proofreadingSentences, currentUser.email, chatsId)
					// console.log(proovedText)
				}
			}

			setChats((prev) => [...prev.filter((chat) => chat.role !== "loadingNow"), { role: "loadingNow", content: loadingAnime[animeNum.current] }]);
			
			// ChatGPT APIと通信
			const msgResponse = await fetch("/api/messages", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message: [...chats, message].filter(d => d.role !== "proofread").filter(d => d.role !== "loadingNow").map((d) => ({
						role: d.role,
						content: d.content,
					})),
				}),
			});

			const msgData = await msgResponse.json();
			if (msgResponse.status !== 200) {
				throw (
					msgData.error ||
					new Error(`Request failed with status ${msgResponse.status}`)
				);
			}
			clearInterval(intervalId);

			setChats(prev => [...prev.filter((chat) => chat.role !== "loadingNow"), msgData.result]);
			addFirestoreDoc(msgData.result, currentUser.email, chatsId)
		} catch (error) {
			console.error(error);
			if (error.status === 429) {
				alert("Error 429: サーバーへのリクエストが多すぎます。しばらく時間をおいてから再度お試しください。")
			}
			alert(`Error ${error.status}: サーバーとの通信に失敗しました。ページをリロードしてください！`)
		}
	};

	const handleRightClick = (e, index) => {
		e.preventDefault()
		setMenuIndex(index) // 右クリックされたときのメニューのindexを保持する
		onOpen() // 右クリック時にメニューを開く
	}

	useEffect(() => {
		const updateViewportHeight = () => {
			setViewportHeight(window.visualViewport.height);
		};

		updateViewportHeight();

		window.addEventListener("resize", updateViewportHeight);

		return () => {
			window.removeEventListener("resize", updateViewportHeight);
		};
	}, []);

	const textareaElement = useRef(null);
	useEffect(() => {
		if (textareaElement.current) {
			setTextareaHeight(textareaElement.current.scrollHeight);
		}
	}, [message.content])


	const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition } = useSpeechRecognition();

	useEffect(() => {
		setIsClient(true);
	}, []);

	if (isClient && !browserSupportsSpeechRecognition) return <Box>ブラウザが音声認識に対応していません。</Box>;
	useMemo(() => {
		transcript && setMessage({ role: "user", content: transcript });
		console.log(transcript);
	}, [transcript])

	// ここにページ下までスクロールするコードを追記する
	if (scrollContainer.current) {
		scrollContainer.current.scrollTop = scrollContainer.current.scrollHeight;
	}
	// console.log("chatsが更新されました。");

	return (
		<Box height={`calc(${viewportHeight}px - ${56}px)`} overflowY='hidden' onClick={() => onClose()}> {/* クリックしたときにメニューを閉じる */}
			<Flex direction='column' align='center' rowGap={3} h={`calc(${viewportHeight}px - 56px - ${textareaHeight}px)`} px={4} py='4' bg={'blue.200'} my={0} overflowY='auto' ref={scrollContainer}>
				{chats.slice(1, chats.length).map((message, index) => (
					<Flex key={index} onContextMenu={(e) => handleRightClick(e, index)}
						pos='relative' flexDirection={message.role === "user" ? 'row-reverse' : 'row'} align='flex-start' columnGap='10px'
						marginLeft={message.role === "user" ? 'auto' : '0px'}
						marginRight={message.role === "user" ? '0px' : 'auto'}
					>
						{message.role === "user" ?
							<Image src={currentUser.image} w='40px' h='40px' borderRadius='50%' />
							:
							<Image src='/BocchiTalk-android-chrome-72x72.png' w='40px' h='40px' borderRadius='50%' bg='white' />
						}
						<Text w='max-content' maxW='70vw' px={5} py={3} bg={'white'}
							borderRadius={message.role === "user" ? '20px 0px 20px 20px' : '0px 20px 20px 20px'}
							css={{
								whiteSpace: 'pre-wrap',
							}}
							border={message.role === "proofread" ? '2px' : 'none'}
							borderColor={message.role === "proofread" ? 'green' : ''}
						>
							{message.role === "proofread" && (
								<Flex direction='column' align='flex-start' rowGap='10px'>
									<Flex align='center' columnGap='10px'>
										<Icon as={PiXBold} color='red' fontSize='sm' />
										<OlderDiffMessages beforeText={message.content.beforeText} AfterText={message.content.afterText} />
									</Flex>
									<Divider borderBottomWidth='2px' />
									<Flex align='center' columnGap='10px'>
										<Icon as={PiCheckBold} color='green' fontSize='sm' />
										<NewerDiffMessages beforeText={message.content.beforeText} AfterText={message.content.afterText} />
									</Flex>
								</Flex>
							)}
							{(message.role === "assistant" || message.role === "user" || message.role === "loadingNow") && message.content}
						</Text>
						{index === menuIndex && (
							<Box pos='absolute' zIndex={999} top='40px' right={0}>
								<Fade in={isOpen} key={index}>
									<Flex direction='column' align='flex-start' rowGap={2} px={5} py={3} bg='teal' borderRadius={5}>
										<Button variant='link' color='white'>保存する</Button>
										<Button variant='link' color='white'>コピー</Button>
										<Button variant='link' color='white'>翻訳する</Button>
										<Button variant='link' color='white'>返信する</Button>
										<Button variant='link' color='white'>辞書を引く</Button>
									</Flex>
								</Fade>
							</Box>
						)}
					</Flex>
				))}
			</Flex>
			<form onSubmit={(e) => sendMessage(e)} >
				<Flex ref={textareaElement} align='flex-end' w='100%' maxW={800} h='auto' px={3} mx='auto' py={3}>
					<AutoResizeTextarea placeholder="Let's Chat!!" value={message.content} onChange={(e) => handleInputChange(e.target.value)} />
					{(message.content !== "" || speechLanguage === "") && (
						<Button colorScheme='teal' type='submit'><Icon as={PiPaperPlaneRightFill} /></Button>
					)}
					{message.content === "" && speechLanguage !== "" && (
						<Button colorScheme='green' variant={listening ? 'solid' : 'ghost'} onClick={() => SpeechRecognition.startListening({ language: speechLanguage })}><Icon as={PiMicrophoneFill} /></Button>
					)}
				</Flex>
			</form>
		</Box>
	)
}
