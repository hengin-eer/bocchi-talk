import { ChevronLeftIcon, Icon } from '@chakra-ui/icons'
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Select, Text, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { PiGearSixFill } from 'react-icons/pi'

export const AppHeader = ({ speechLanguage, setSpeechLanguage }) => {
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<Flex h='32px' mx={5} my={3} align='center' justify='space-between'>
			<Link href='/dashboard'>
				<ChevronLeftIcon boxSize={8} />
			</Link>
			<Text fontSize={18}>Chat Title</Text>
			<Flex align='center' columnGap={2}>
				<Button variant='solid' colorScheme='gray' size='md' onClick={onOpen}>
					<Icon as={PiGearSixFill} fontSize='20px' />
				</Button>
				<Drawer
					isOpen={isOpen}
					placement='right'
					onClose={onClose}
					finalFocusRef={null}
					size='xs'
				>
					<DrawerOverlay />
					<DrawerContent>
						<DrawerCloseButton />
						<DrawerHeader>Option Menu</DrawerHeader>

						<DrawerBody>
							<Box mb='2rem'>
								<Text mb='1rem' fontSize='lg'>音声入力言語</Text>
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
							</Box>

							<Box>
								<Text mb='1rem' fontSize='lg'>その他の設定</Text>
							</Box>
						</DrawerBody>

						<DrawerFooter>
							<Button variant='outline' colorScheme='gray' onClick={onClose}>Close</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</Flex>
		</Flex>
	)
}