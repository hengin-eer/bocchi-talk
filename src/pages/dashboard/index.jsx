import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Spacer, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Stack, Radio, RadioGroup, ModalFooter, Button, Input, Divider } from '@chakra-ui/react'
import { Box, Editable, Flex, Heading, Icon, Skeleton } from '@chakra-ui/react'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useLoading } from '@/hooks/useLoading'
import { PiBellZBold, PiPlusCircleFill } from 'react-icons/pi'
import Randomstring from 'randomstring'
import { EditableChatList } from '@/components/editable-controls'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { DashboardLayout } from '@/components/dashboard-layout'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentUserState } from '@/states/currentUserState'
import { chatsDataState, hoveredChatState } from '@/states/chatsDataState'
import { useFirestore } from '@/hooks/useFirestore'
import { router } from 'next/router'
import { systemPromptState } from '@/states/chatThemeState'

export default function Dashboard() {
	const [chatsData, setChatsData] = useRecoilState(chatsDataState)
	const { isLoading, isPageLoading } = useLoading()
	const hoveredChat = useRecoilValue(hoveredChatState)
	const currentUser = useRecoilValue(currentUserState)
	const [currentChatTitle, setCurrentChatTitle] = useState('')
	const { isOpen, onOpen, onClose } = useDisclosure();
	const initialRef = useRef(null);
	const finalRef = useRef(null);
	const [courseValue, setCourseValue] = useState('1');
	const [roleValue, setRoleValue] = useState('1');
	const [discussionTheme, setDiscussionTheme] = useState('');
	const [systemPrompt, setSystemPrompt] = useRecoilState(systemPromptState);
	const [isWizarded, setIsWizarded] = useState(false);

	if (currentUser && chatsData.length === 0) {
		; (async () => {
			const snapshot = await getDocs(collection(db, 'users', currentUser.email, 'chats'))
			const getData = snapshot.docs.map((doc) => {
				const data = doc.data()
				if (data.id !== doc.id) data.id = doc.id
				return data
			})

			const data = getData
			setChatsData(data.sort((a, b) => b.updatedAt.seconds - a.updatedAt.seconds))
		})()
	}

	const randomSlug = Randomstring.generate(16);
	const resetWizard = () => {
		setCourseValue('1');
		setRoleValue('1');
		setDiscussionTheme('');
		onOpen();
	}

	const handleThemeChange = (value) => {
		setDiscussionTheme(value);
	}

	const onClickWizardSave = async() => {
		setIsWizarded(true);
		if (courseValue === '1') {
			if (discussionTheme === '') {
				return;
			}
			setSystemPrompt({ ...systemPrompt, content: `You are my friend. We have to discuss about "${discussionTheme}".` });
			console.log(discussionTheme);
			onClose();
		} else if (courseValue === '2') {
			if (roleValue === '1') {
				console.log('空港');
				setSystemPrompt({ ...systemPrompt, content: "You are the Central airport staff. We are role-playing. First, you must say Welcome to Central Airport." });
				onClose();
			} else if (roleValue === '2') {
				console.log('ホテル');
				setSystemPrompt({ ...systemPrompt, content: "You are my hotel(the central hotel) staff. We are role-playing. First, you must say Welcome to Central Hotel" });
				onClose();
			}
		} else if (courseValue === '3') {
			console.log('フリートーク');
			setSystemPrompt({ ...systemPrompt, content: "You are my friend." });
			onClose();
		}
		console.log("セット完了")
		await router.push(`/chat/${randomSlug}`);
		setIsWizarded(false);
	}

	return (
		<DashboardLayout>
			<Heading as='h1' size='lg'>Chats</Heading>
			<Flex direction='column' align='flex-start' rowGap='20px' py='20px'>
				{(!currentUser || isLoading || isPageLoading || chatsData.length === 0) &&
					<>
						<Skeleton h='73px' w='full' borderRadius='10px'></Skeleton>
						<Skeleton h='73px' w='full' borderRadius='10px'></Skeleton>
					</>
				}
				{currentUser && !isLoading && !isPageLoading && chatsData.map((chatData) => (
					<Box key={chatData.id} w='full' px='30px' py='10px' bg={(hoveredChat === chatData.id) ? 'gray.300' : 'gray.200'} borderRadius='10px' transitionDuration='.5s'>
						<Editable
							textAlign='center'
							defaultValue={chatData.title ? chatData.title : 'Untitled'}
							fontSize='md'
							isPreviewFocusable={false}
							onSubmit={() => setChatsData(chatsData.map((chat) => {
								if (chat.id === chatData.id) return { ...chat, title: currentChatTitle }
								return chat
							}))}
						>
							<EditableChatList currentChatTitle={currentChatTitle} setCurrentChatTitle={setCurrentChatTitle} chatData={chatData} userId={currentUser.email} />
						</Editable>
					</Box>
				))}
				<Flex align='center' columnGap='10px' px='30px' py='10px' bg='gray.200' borderRadius='10px'>
					<Icon as={PiPlusCircleFill} color='slategray' w={6} h={6} />
					{isWizarded ? (
						<Button bg='gray.200'>作成中・・・</Button>
					) : (
						<Button onClick={resetWizard} bg='gray.200'>Create New Chat</Button>
					)}
				</Flex>
			</Flex>
			<Modal
				initialFocusRef={initialRef}
				finalFocusRef={finalRef}
				isOpen={isOpen}
				onClose={onClose}
			>
				<ModalOverlay />
				<ModalContent mx={2}>
					<ModalHeader>Start Chat with Wizard</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<RadioGroup onChange={setCourseValue} value={courseValue} mb={2}>
							<Stack direction='row'>
								<Radio value='1'>Discussion</Radio>
								<Radio value='2'>Role Play</Radio>
								<Radio value='3'>Free Talk</Radio>
							</Stack>
						</RadioGroup>
						{courseValue === '1' && (
							<>
								<Divider/>
								<Text fontSize='sm' mt={2}>Input the theme</Text>
								<Input placeholder='Theme...' onChange={(e) => handleThemeChange(e.target.value)} mt={1}/>
								{discussionTheme === '' && (
									<Text fontSize='xs' ml={2} mt={1} color='tomato'>テーマを入力してください</Text>
								)}
							</>
						)}
						{courseValue === '2' && (
							<>
								<Divider />
								<RadioGroup onChange={setRoleValue} value={roleValue} mt={2}>
									<Stack>
										<Radio value='1'>Airport</Radio>
										<Radio value='2'>Hotel</Radio>
										<Radio isDisabled>Coming soon...</Radio>
									</Stack>
								</RadioGroup>
							</>
						)}
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onClickWizardSave}>
						Go
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</DashboardLayout>
	)
}