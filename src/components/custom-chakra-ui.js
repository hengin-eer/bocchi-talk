import { Box, Heading, Text, Textarea, forwardRef } from "@chakra-ui/react";
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

export const AutoResizeTextarea = forwardRef((props, ref) => {
	return (
		<Textarea as={ResizeTextarea} minRows={1} maxRows={4} minH='unset' overflow='hidden' mr={2} variant='filled' resize='none' type="text" {...props} />
	)
})