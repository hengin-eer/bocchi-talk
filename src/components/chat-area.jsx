import { Box, Button, Fade, Flex, Icon, Image, Text, useDisclosure } from '@chakra-ui/react'
import { PiMicrophoneFill, PiPaperPlaneRightFill } from 'react-icons/pi'
import React, { use, useEffect, useRef, useState } from 'react'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { AutoResizeTextarea } from './custom-chakra-ui';
import { useFirestore } from '@/hooks/useFirestore';

export const ChatArea = ({ speechLanguage, firestoreMessages, chatsId }) => {
	const [message, setMessage] = useState({ role: "user", content: "" });
	const [chats, setChats] = useState([{
		role: "system",
		content: "system_prompt" // 初期値としてシステムメッセージを入れておく。
	}]); // 初期値の設定

	useEffect(() => {
		setChats([...chats, ...firestoreMessages])
	}, [firestoreMessages])

	const { isOpen, onOpen, onClose } = useDisclosure();
	const [menuIndex, setMenuIndex] = useState(null); // 右クリックされたときのメニューのindexを保持する
	const [viewportHeight, setViewportHeight] = useState(100);
	const [textareaHeight, setTextareaHeight] = useState(0);
	const [isClient, setIsClient] = useState(false);
	const { addFirestoreDoc } = useFirestore()

	const handleInputChange = (value) => {
		setMessage({ role: "user", content: value });
	}

	const sendMessage = async (e) => {
		try {
			e.preventDefault()
			if (message.content === "") return;
			resetTranscript()

			addFirestoreDoc(message, chatsId)
			setMessage({ role: "user", content: "" });
			setChats((prev) => [...prev, message]);

			// ChatGPT APIと通信
			const response = await fetch("/api/messages", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message: [...chats, message].map((d) => ({
						role: d.role,
						content: d.content,
					})),
				}),
			});

			const data = await response.json();
			if (response.status !== 200) {
				throw (
					data.error ||
					new Error(`Request failed with status ${response.status}`)
				);
			}
			setChats((prev) => [...prev, data.result]);
			addFirestoreDoc(data.result, chatsId)
		} catch (error) {
			console.log(error);
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

	useEffect(() => {
		transcript && setMessage({ role: "user", content: transcript });
		console.log(transcript)
	}, [transcript])

	console.log(chats)

	return (
		<Box height={`calc(${viewportHeight}px - ${56}px)`} overflowY='hidden' onClick={() => onClose()}> {/* クリックしたときにメニューを閉じる */}
			<Flex direction='column' align='center' rowGap={3} h={`calc(${viewportHeight}px - 56px - ${textareaHeight}px)`} px={4} py='4' bg={'blue.200'} my={0} overflowY='auto'>
				{chats.slice(1, chats.length).map((message, index) => (
					<Flex key={index} onContextMenu={(e) => handleRightClick(e, index)}
						pos='relative' flexDirection={message.role === "user" ? 'row-reverse' : 'row'} align='flex-start' columnGap='10px'
						marginLeft={message.role === "user" ? 'auto' : '0px'}
						marginRight={message.role === "user" ? '0px' : 'auto'}
					>
						{message.role === "user" ?
							<Image src='/face.jpg' w='40px' h='40px' borderRadius='50%' />
							:
							<Image src='/BocchiTalk-android-chrome-72x72.png' w='40px' h='40px' borderRadius='50%' bg='white' />
						}
						<Text w='max-content' maxW='70vw' px={5} py={3} bg={'white'}
							borderRadius={message.role === "user" ? '20px 0px 20px 20px' : '0px 20px 20px 20px'}
						>
							{message.content}
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
