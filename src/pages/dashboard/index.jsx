import { DashboardNav } from '@/components/dashboard-nav'
import { Box, Editable, EditableInput, EditablePreview, Flex, Heading, Icon, Skeleton, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useLoading } from '@/hooks/useLoading'
import { PiLink, PiPlusCircleFill } from 'react-icons/pi'
import Randomstring from 'randomstring'
import { EditableControls } from '@/components/editable-controls'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '@/lib/firebase'

export default function Dashboard() {
	const [currentUser, setCurrentUser] = useState(null)
	const [chatsData, setChatsData] = useState([])
	const [isFetched, setIsFetched] = useState(false)
	const { data: session } = useSession({ required: true })
	const { isLoading, isPageLoading } = useLoading()
	const [chatTitle, setChatTitle] = useState('')

	useEffect(() => {
		if (!isFetched && session) {
			setCurrentUser({
				name: session.user.name,
				email: session.user.email,
				image: session.user.image,
			})
			setIsFetched(true)
		}
	}, [session])

	useEffect(() => {
		if (currentUser && session) {
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
		<Flex>
			<DashboardNav user={currentUser} />
			<Box w='full' p='20px'>
				<Heading as='h1' size='lg'>Chats</Heading>
				<Flex direction='column' align='flex-start' rowGap='20px' py='20px'>
					{(!currentUser || isLoading || isPageLoading || chatsData.length === 0) &&
						<>
							<Skeleton h='52px' w='full' borderRadius='10px'></Skeleton>
							<Skeleton h='52px' w='full' borderRadius='10px'></Skeleton>
						</>
					}
					{currentUser && !isLoading && !isPageLoading && chatsData.map((chatData) => (
						<Box key={chatData.id} w='full' px='30px' py='10px' bg='gray.200' borderRadius='10px'>
							<Editable
								textAlign='center'
								defaultValue={chatData.title ? chatData.title : chatData.id}
								fontSize='md'
								isPreviewFocusable={false}
							>
								<Flex align='center' justify='space-between'>
									<Link href={`/chat/${chatData.id}`}>
										<EditablePreview />
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
			</Box>
		</Flex>
	)
}