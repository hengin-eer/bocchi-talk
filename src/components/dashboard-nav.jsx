import { Image } from '@chakra-ui/react';
import { Button, Flex, Icon, SkeletonCircle, Text } from '@chakra-ui/react'
import { signOut } from 'next-auth/react';
import Link from 'next/link'
import { PiGearSixFill, PiHeartFill, PiHouseFill, PiSignOutFill } from 'react-icons/pi';

export const DashboardNav = ({ user }) => {
	return (
		<Flex direction={{ base: 'row', sm: 'column' }} align='center' justify='space-between' h={{ base: '80px', sm: '100dvh' }} w={{ base: '100%', sm: '80px' }} mt={{ base: 'auto', sm: '0px' }} p={{ base: '0px 30px', sm: '30px 0px' }} bg='greenyellow'>
			{user ?
				<Image src={user.image} alt={user.name} boxSize='50px' borderRadius='50%' />
				:
				<SkeletonCircle size='50px' />
			}
			{user && (
				<Flex direction={{ base: 'row', sm: 'column' }} align='center' gap={{ base: '20px', sm: '30px' }} pb={{ base: '0px', sm: '50px' }}>
					<Button display='block' variant='link' colorScheme='orange'>
						<Link href='/dashboard'>
							<Icon boxSize='30px' as={PiHouseFill} />
							<Text fontSize='xs'>Home</Text>
						</Link>
					</Button>
					<Button display='block' variant='link' colorScheme='red'>
						<Link href='/favorites'>
							<Icon boxSize='30px' as={PiHeartFill} />
							<Text fontSize='xs'>Favorites</Text>
						</Link>
					</Button>
					<Button display='block' variant='link' colorScheme='cyan'>
						<Link href='/settings'>
							<Icon boxSize='30px' as={PiGearSixFill} />
							<Text fontSize='xs'>Settings</Text>
						</Link>
					</Button>
					<Button display='block' variant='link' colorScheme='red' onClick={() => signOut({redirect: true, callbackUrl: '/'})}>
						<Icon boxSize='30px' as={PiSignOutFill} />
						<Text fontSize='xs'>LogOut</Text>
					</Button>
				</Flex>
			)}
		</Flex>
	)
}