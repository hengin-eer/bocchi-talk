import { DashboardNav } from '@/components/dashboard-nav'
import { useFirestore } from '@/hooks/useFirestore'
import { Box, Flex, Heading, Icon, Skeleton, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useLoading } from '@/hooks/useLoading'
import { PiLink, PiPlusCircleFill } from 'react-icons/pi'
import Randomstring from 'randomstring'

export default function Dashboard() {
	const { useChatsIds } = useFirestore()
	const [currentUser, setCurrentUser] = useState(null)
	const [isFetched, setIsFetched] = useState(false)
	const { data: session } = useSession({ required: true })
	const { isLoading, isPageLoading } = useLoading()

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

	const chatsIds = useChatsIds(currentUser, session)

	const randomSlug = Randomstring.generate(16)

	return (
		<Flex>
			<DashboardNav user={currentUser} />
			<Box w='full' p='20px'>
				<Heading as='h1' size='lg'>Chats</Heading>
				<Flex direction='column' align='flex-start' rowGap='20px' py='20px'>
					{(!currentUser || isLoading || isPageLoading || chatsIds.length === 0) &&
						<>
							<Skeleton h='65px' w='full' borderRadius='10px'></Skeleton>
							<Skeleton h='65px' w='full' borderRadius='10px'></Skeleton>
						</>
					}
					{currentUser && !isLoading && !isPageLoading && chatsIds.map((chatsId) => (
						<Box w='full' px='30px' py='10px' bg='gray.200' borderRadius='10px'>
							<Link key={chatsId} href={`/chat/${chatsId.id}`}>
								<Text fontSize='md'>{chatsId.id}</Text>
								<Text fontSize='sm' color='gray.400'>{new Date(chatsId.updatedAt.seconds * 1000).toLocaleString()}</Text>
							</Link>
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