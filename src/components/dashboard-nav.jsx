import { useAuth } from '@/hooks/useFirebaseAuth';
import { login, logout } from '@/lib/auth';
import { Avatar, Box, Button, Flex, Icon, SkeletonCircle, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { PiSignInFill, PiSignOutFill } from 'react-icons/pi';

export const DashboardNav = () => {
	const user = useAuth();
	console.log(user);

	return (
		<Flex direction='column' align='center' justify='space-between' h='100vh' w='80px' py='30px' bg='greenyellow'>
			{user ? <Avatar name={user.name} src={user.pic} boxSize='50px' /> : <SkeletonCircle size='50px' />}
			<Flex direction='column' align='center' rowGap='30px' pb='50px'>
				<Link href='/'>
					<Text fontSize='md'>Home</Text>
				</Link>
				{user === null &&
					<Button variant='link' colorScheme='green' onClick={login}>
						<Icon boxSize='30px' as={PiSignInFill} />
					</Button>
				}
				{user &&
					<Button variant='link' colorScheme='red' onClick={logout}>
						<Icon boxSize='30px' as={PiSignOutFill} />
					</Button>
				}
			</Flex>
		</Flex>
	)
}