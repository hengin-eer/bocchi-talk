import { useFirestore } from '@/hooks/useFirestore'
import { Heading, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export default function Dashboard() {
	const { useChatsIds } = useFirestore()
	const chatsIds = useChatsIds()
	let chatsUpdatedAt
	console.log(chatsIds)

	return (
		<div>
			<Heading as='h1' size='lg' mb={5}>Dashboard</Heading>
			<ul>
				{chatsIds.map((chatsId) => (
					<Link key={chatsId} href={`/chat/${chatsId.id}`}>
						<Text fontSize='md'>{chatsId.id}</Text>
						<Text fontSize='sm' color='gray.400'>{new Date(chatsId.updatedAt.seconds * 1000).toLocaleString()}</Text>
					</Link>
				))}
			</ul>
		</div>
	)
}