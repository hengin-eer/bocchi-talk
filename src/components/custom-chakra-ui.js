import { Box, Button, Flex, Heading, Icon, Text, Textarea, forwardRef } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { PiArrowSquareOutFill, PiPaperPlaneTiltFill, PiSignInFill } from "react-icons/pi";
import ResizeTextarea from 'react-textarea-autosize';

export const GradientHeading = (props) => {
	return (
		<Heading bgClip='text' bgGradient='linear(to-br, #1DBEE1, #487EE7, #884FE4)' lineHeight='1.5' {...props} />
	)
}

export const GradientText = (props) => {
	return (
		<Text bgClip='text' bgGradient='linear(to-br, #1DBEE1, #487EE7, #884FE4)' {...props} />
	)
}

export const LoginButton = (props) => {
	return (
		<Button variant='unstyled' display='block' h='max' w='max' px='50px' py='20px'
			color='black' bg='greenyellow' borderRadius='full' {...props} transitionDuration='.3s'
			_hover={{ color: 'white', bg: 'green.500' }} onClick={() => signIn('google')}>
			<Flex align='center' columnGap='10px'>
				<Icon as={PiSignInFill} fontSize='30px' />
				<Text fontSize='20px'>ログインして始める</Text>
			</Flex>
		</Button>
	)
}

export const PrimaryButton = ({ children, icon = PiPaperPlaneTiltFill }) => {
	return (
		<Button variant='unstyled' display='block' h='max' w='max' px='50px' py='20px'
			color='black' bg='greenyellow' borderRadius='full' transitionDuration='.3s'
			_hover={{ color: 'white', bg: 'green.500' }}>
			<Flex align='center' columnGap='10px'>
				<Icon as={icon} fontSize='30px' />
				<Text fontSize='20px'>{children}</Text>
			</Flex>
		</Button>
	)
}

export const ButtonLink = ({ children, icon = PiArrowSquareOutFill, href = '' }) => {
	return (
		<Button as='a' href={href} variant='unstyled' display='block'
			h='max' w='max' px='25px' py='10px' color='black' bg='white'
			border='2px' borderColor='#884FE4' borderRadius='full' transitionDuration='.3s'
			_hover={{ color: 'white', bg: '#884FE4' }}>
			<Flex align='center' columnGap='5px'>
				<Icon as={icon} fontSize='20px' />
				<Text fontSize='16px'>{children}</Text>
			</Flex>
		</Button>
	)
}

export const Title100 = ({ children, color = 'black' }) => {
	return (
		<Heading as='h1' fontSize={{ base: '32px', lg: '40px' }} color={color} w='auto' lineHeight='140%'>{children}</Heading>
	)
}

export const Text100 = ({ children, color = 'black' }) => {
	return (
		<Text fontSize={{ base: '16px', lg: '20px' }} color={color} w='auto' lineHeight='150%'>{children}</Text>
	)
}

export const AutoResizeTextarea = forwardRef((props, ref) => {
	return (
		<Textarea as={ResizeTextarea} minRows={1} maxRows={4} minH='unset' overflow='hidden' mr={2} variant='filled' resize='none' type="text" {...props} />
	)
})