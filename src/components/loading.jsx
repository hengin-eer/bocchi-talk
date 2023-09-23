import { Flex, Spinner } from '@chakra-ui/react'
import React from 'react'

export const Loading = () => {
	return (
		<Flex pos='absolute' top='0' left='0' h='100%' w='100%' align='center' justify='center'>
			<Spinner
				thickness="2px"
				speed="0.8s"
				emptyColor="gray.200"
				color='teal.300'
				size="xl"
			/>
		</Flex>
	)
}
