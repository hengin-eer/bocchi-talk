import { Avatar, Button, Flex, Icon, SkeletonCircle, Text } from '@chakra-ui/react'
import { signOut } from 'next-auth/react';
import Link from 'next/link'
import { PiSignOutFill } from 'react-icons/pi';

export const DashboardNav = ({ user }) => {
	return (
		<Flex direction='column' align='center' justify='space-between' h='100vh' w='80px' py='30px' bg='greenyellow'>
			{user ?
			<Avatar name={user.name} src={user.image} boxSize='50px' />
			:
			<SkeletonCircle size='50px' />
			}
			<Flex direction='column' align='center' rowGap='30px' pb='50px'>
				<Link href='/'>
					<Text fontSize='md'>Home</Text>
				</Link>
				{user &&
					<Button variant='link' colorScheme='red' onClick={() => signOut()}>
						<Icon boxSize='30px' as={PiSignOutFill} />
					</Button>
				}
			</Flex>
		</Flex>
	)
}