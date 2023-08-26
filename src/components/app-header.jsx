import { ChevronLeftIcon, HamburgerIcon } from '@chakra-ui/icons'
import { Flex, Select, Text } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'

export const AppHeader = ({ speechLanguage, setSpeechLanguage }) => {
	return (
		<Flex h='32px' mx={5} my={3} align='center' justify='space-between'>
			<Link href='/'>
				<ChevronLeftIcon boxSize={8} />
			</Link>
			<Text fontSize={18}>Chat Title</Text>
			<Flex align='center' columnGap={2}>
				<Select value={speechLanguage} placeholder='Language' variant='filled' size='sm' onChange={(e) => setSpeechLanguage(e.target.value)}>
					<option value='en-US'>en-US</option>
					<option value='ja'>ja</option>
				</Select>
				<HamburgerIcon boxSize={6} />
			</Flex>
		</Flex>
	)
}