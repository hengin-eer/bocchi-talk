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
					<option value='en-US'>English(US)</option>
					<option value='ja'>日本語</option>
					<option value='ko'>한국어(韓国語)</option>
					<option value='zh-CN'>中文(中国語)</option>
					<option value='zh-TW'>中文(台湾語)</option>
					<option value='fr-FR'>French(フランス語)</option>
					<option value='de-DE'>German(ドイツ語)</option>
					<option value='th-TH'>ภาษาไทย(タイ語)</option>
				</Select>
				<HamburgerIcon boxSize={6} />
			</Flex>
		</Flex>
	)
}