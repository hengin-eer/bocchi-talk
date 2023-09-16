import { DashboardNav } from '@/components/dashboard-nav'
import { Box, Editable, EditableInput, EditablePreview, Flex, Heading, Icon, Skeleton, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useLoading } from '@/hooks/useLoading'
import { PiPlusCircleFill } from 'react-icons/pi'
import Randomstring from 'randomstring'
import { EditableControls } from '@/components/editable-controls'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { DashboardLayout } from '@/components/dashboard-layout'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentUserState } from '@/states/currentUserState'
import { chatsDataState } from '@/states/chatsDataState'

export default function Dashboard() {
	const [chatsData, setChatsData] = useRecoilState(chatsDataState)
	const { isLoading, isPageLoading } = useLoading()
	const [chatTitle, setChatTitle] = useState('')
	const [hoveredChat, setHoveredChat] = useState('')

	const currentUser = useRecoilValue(currentUserState)

	useEffect(() => {
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
	}, [currentUser])

	const randomSlug = Randomstring.generate(16)

	return (
		<DashboardLayout>
			<Heading as='h1' size='lg'>Chats</Heading>
			<Flex direction='column' align='flex-start' rowGap='20px' py='20px'>
				{(!currentUser || isLoading || isPageLoading || chatsData.length === 0) &&
					<>
						<Skeleton h='52px' w='full' borderRadius='10px'></Skeleton>
						<Skeleton h='52px' w='full' borderRadius='10px'></Skeleton>
					</>
				}
				{currentUser && !isLoading && !isPageLoading && chatsData.map((chatData) => (
					<Box key={chatData.id} w='full' px='30px' py='10px' bg={(hoveredChat === chatData.id) ? 'gray.300' : 'gray.200'} borderRadius='10px' transitionDuration='.5s'>
						<Editable
							textAlign='center'
							defaultValue={chatData.title ? chatData.title : chatData.id}
							fontSize='md'
							isPreviewFocusable={false}
						>
							<Flex align='center' justify='space-between'>
								<Link href={`/chat/${chatData.id}`}>
									<>
										<EditablePreview cursor='pointer' onMouseEnter={() => setHoveredChat(chatData.id)} onMouseLeave={() => setHoveredChat('')}/>
									</>
								</Link>
								<EditableInput onChange={(e) => setChatTitle(e.target.value)} />
								<EditableControls chatsData={chatsData} setChatsData={setChatsData} userId={currentUser.email} chatsId={chatData.id} chatTitle={chatTitle} />
							</Flex>
						</Editable>
					</Box>
				))}
				<Flex align='center' columnGap='10px' px='30px' py='10px' bg='gray.200' borderRadius='10px'>
					<Icon as={PiPlusCircleFill} color='slategray' w={6} h={6} />
					<Link href={`/chat/${randomSlug}`}>新しくチャットを始める</Link>
				</Flex>
			</Flex>
		</DashboardLayout>
	)
}