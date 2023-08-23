import { Box, Heading, Text } from "@chakra-ui/react";

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