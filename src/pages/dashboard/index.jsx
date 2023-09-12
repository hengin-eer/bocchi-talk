import { DashboardNav } from '@/components/dashboard-nav'
import { useFirestore } from '@/hooks/useFirestore'
import { Box, Flex, Heading, Skeleton, Text } from '@chakra-ui/react'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import { authOptions } from '../api/auth/[...nextauth]'

export default function Dashboard({ currentUser }) {
	const { useChatsIds } = useFirestore()
	console.log(currentUser)

	const chatsIds = useChatsIds(currentUser.email)

	return (
		<Flex>
			<DashboardNav user={currentUser} />
			<Box w='full' p='20px'>
				<Heading as='h1' size='lg'>Chats</Heading>
				<Flex direction='column' align='flex-start' rowGap='20px' py='20px'>
					{!currentUser &&
						<>
							<Skeleton h='65px' w='full' borderRadius='10px'></Skeleton>
							<Skeleton h='65px' w='full' borderRadius='10px'></Skeleton>
						</>
					}
					{currentUser && chatsIds.map((chatsId) => (
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

export const getServerSideProps = async (context) => {
	const session = await getServerSession(context.req, context.res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	const currentUser = {
		name: session.user.name,
		email: session.user.email,
		image: session.user.image,
	}

	if (session) {
		return {
			props: { currentUser },
		};
	}
};