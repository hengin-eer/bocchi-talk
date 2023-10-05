import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Spacer, Text } from '@chakra-ui/react'
import { Box, Editable, Flex, Heading, Icon, Skeleton } from '@chakra-ui/react'
import Link from 'next/link'
import { useState } from 'react'
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

export default function Dashboard() {
	const [chatsData, setChatsData] = useRecoilState(chatsDataState)
	const { isLoading, isPageLoading } = useLoading()
	const { getNewsData } = useFirestore()
	const hoveredChat = useRecoilValue(hoveredChatState)
	const currentUser = useRecoilValue(currentUserState)
	const [currentChatTitle, setCurrentChatTitle] = useState('')
	const [ newsData, setNewsData ] = useState([])
	const [ isFetched, setIsFetched ] = useState(false);

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
	
	if (currentUser && !isFetched) {
		; (async () => {
			const data = await getNewsData();
			setNewsData(data);
			setIsFetched(true);
		})()
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
					<Link href={`/chat/${randomSlug}`}>新しくチャットを始める</Link>
				</Flex>
			</Flex>
			<Heading as='h1' size='lg' mt='10px'>News</Heading>
			<Accordion allowToggle py='20px'>
				{newsData.slice() // オリジナルの配列を変更せずにコピーを作成
  				.sort((b, a) => a.date.seconds - b.date.seconds) // 日付でソート
  				.map((newData, index) => (
					<AccordionItem key={index}>
						<h2>
							<AccordionButton>
								<Flex as="span" textAlign='left'>
									<Icon as={PiBellZBold} w={6} h={6} mr={2} color='slategray' />
									<Text fontSize='md'>{newData.titleJA}</Text>
								</Flex>
								<Spacer />
								<Text pr={2} color='gray.500'>-{new Date(newData.date.seconds * 1000).toLocaleDateString('ja-JP')}-</Text>
								<AccordionIcon />
							</AccordionButton>
						</h2>
						<AccordionPanel pb={4} pl={12}>
							{newData.isInNewTab?(
								<Link href={newData.linkURL} target="_blank" rel="noopener noreferrer"><Text fontSize='sm'>{newData.contentJA}</Text></Link>
							) : (
								<Link href={newData.linkURL}><Text fontSize='sm'>{newData.contentJA}</Text></Link>
							)}
						</AccordionPanel>
					</AccordionItem>
				))}
			</Accordion>
		</DashboardLayout>
	)
}