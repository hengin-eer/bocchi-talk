import { ChevronLeftIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export const AppHeader = () => {
	return (
			<Flex h='32px' mx={5} my={3} align='center' justify='space-between'>
				<Link href='/'>
					<ChevronLeftIcon boxSize={8} />
				</Link>	
				<Text fontSize={18}>Chat Title</Text>
				<AppMenu />
			</Flex>
	)
}

export const AppMenu = () => {
	return (
		<div>
			<HamburgerIcon boxSize={6} />
		</div>
	)
}
