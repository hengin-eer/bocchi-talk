import HowToUsePWA from '@/components/howToUsePWA';
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
import { PiBellRingingFill, PiDevicesBold, PiGearSixFill, PiHeartFill, PiHouseFill, PiPaperPlaneTiltFill, PiSignOutFill } from 'react-icons/pi';

export const DashboardNav = ({ user }) => {
	return (
		<Flex direction={{ base: 'row', lg: 'column' }} align='center' justify={{ base: 'space-around', lg: 'flex-end' }} h={{ base: '80px', lg: '100dvh' }} w={{ base: '100%', lg: '80px' }} gap={{ base: '20px', lg: '30px' }} px='20px' py='30px' bg='white' border='1px' borderColor='gray.200'>
			{user ? (
				<>
					<Button display='block' variant='link' colorScheme='black'>
						<Link href='/dashboard'>
							<Icon boxSize='30px' as={PiHouseFill} />
						</Link>
					</Button>
					<Button display='block' variant='link' colorScheme='black'>
						<Link href='/news'>
							<Icon boxSize='30px' as={PiBellRingingFill} />
						</Link>
					</Button>
					<Button display='block' variant='link' colorScheme='black'>
						<Link href='/favorites'>
							<Icon boxSize='30px' as={PiHeartFill} />
						</Link>
					</Button>
					<Button display='block' variant='link' colorScheme='black'>
						<a href="https://forms.gle/EWAGxPBGrEeKSWJg9" target="_blank" rel="noopener noreferrer">
							<Icon boxSize='30px' as={PiPaperPlaneTiltFill} />
						</a>
					</Button>
					<Menu>
						<MenuButton variant='unstyled' p={0} bg="transparent">
							<Image src={user.image} alt={user.name} boxSize="40px" borderRadius="50%" />
						</MenuButton>
						<MenuList>
							<MenuItem>
								<Link href='/settings'>
									<Flex align='center' columnGap='12px'>
										<Icon boxSize='30px' color='slategray' as={PiGearSixFill} />
										<Text>Settings</Text>
									</Flex>
								</Link>
							</MenuItem>
							<MenuItem>
								<Flex align='center' columnGap='12px'>
									<Icon boxSize='30px' color='slategray' as={PiDevicesBold} />
									<HowToUsePWA />
								</Flex>
							</MenuItem>
							<MenuItem onClick={() => signOut({ redirect: true, callbackUrl: '/' })} icon={<Icon boxSize='30px' color='red' as={PiSignOutFill} />}>LogOut</MenuItem>
						</MenuList>
					</Menu>
				</>
			)
			:
				<SkeletonCircle size='50px' />
			}
		</Flex>
	)
}
