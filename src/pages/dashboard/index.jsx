import { DashboardNav } from '@/components/dashboard-nav'
import { useAuth } from '@/hooks/useFirebaseAuth'
import { useFirestore } from '@/hooks/useFirestore'
import { Box, Flex, Heading, Skeleton, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function Dashboard() {
	const { useChatsIds } = useFirestore()
	const chatsIds = useChatsIds()
	const user = useAuth()

	return (
		<Flex>
			<DashboardNav />
			<Box w='full' p='20px'>
				<Heading as='h1' size='lg'>Chats</Heading>
				<Flex direction='column' align='flex-start' rowGap='20px' py='20px'>
					{user === null &&
						<>
							<Skeleton h='65px' w='full' borderRadius='10px'></Skeleton>
							<Skeleton h='65px' w='full' borderRadius='10px'></Skeleton>
						</>
					}
					{user && chatsIds.map((chatsId) => (
						<Box w='full' px='30px' py='10px' bg='gray.200' borderRadius='10px'>
							<Link key={chatsId} href={`/chat/${chatsId.id}`}>
								<Text fontSize='md'>{chatsId.id}</Text>
								<Text fontSize='sm' color='gray.400'>{new Date(chatsId.updatedAt.seconds * 1000).toLocaleString()}</Text>
							</Link>
						</Box>
					))}
				</Flex>
			</Box>
		</Flex>
	)
}