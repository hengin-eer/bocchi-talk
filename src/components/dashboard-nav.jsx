import {
	Button, 
	Flex, 
	Icon, 
	SkeletonCircle, 
	Text, 
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Image,
} from '@chakra-ui/react'
import { signOut } from 'next-auth/react';
import Link from 'next/link'
import { PiGearSixFill, PiHeartFill, PiHouseFill, PiPaperPlaneTiltFill, PiSignOutFill } from 'react-icons/pi';

export const DashboardNav = ({ user }) => {
	return (
		<Flex direction={{ base: 'row', sm: 'column' }} align='center' justify='space-between' h={{ base: '80px', sm: '100dvh' }} w={{ base: '100%', sm: '80px' }} mt={{ base: 'auto', sm: '0px' }} p={{ base: '0px 30px', sm: '30px 0px' }} bg='greenyellow'>
			{user ?
				<Menu>
					<MenuButton as={Button} p={0} bg="transparent">
						<Image src={user.image} alt={user.name} boxSize="50px" borderRadius="50%" />
					</MenuButton>
					<MenuList>
						<MenuItem as='a' href='/settings' icon={<Icon boxSize='30px' as={PiGearSixFill} />}>Settings</MenuItem>
						<MenuItem onClick={ () => signOut({redirect: true, callbackUrl: '/'}) } icon={<Icon boxSize='30px' as={PiSignOutFill} />}>LogOut</MenuItem>
					</MenuList>
				</Menu>
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
						<a href="https://forms.gle/uLbxD1v2XmXhXfer7" target="_blank" rel="noopener noreferrer">
							<Icon boxSize='30px' as={PiPaperPlaneTiltFill} />
							<Text fontSize='xs'>FeedBack</Text>
						</a>
					</Button>
				</Flex>
			)}
		</Flex>
	)
}