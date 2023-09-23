import { ChevronLeftIcon, Icon } from '@chakra-ui/icons'
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Select, Spacer, Text, VStack, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import React from 'react'
import { PiArchiveBoxBold, PiFacebookLogoBold, PiGearSixBold, PiGearSixFill, PiLinkBold, PiListBulletsBold, PiNotepadBold, PiSnapchatLogoBold, PiTranslateBold, PiTwitterLogoBold } from 'react-icons/pi'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { speechLanguageState } from '@/states/speechLanguageState'
import { AutoResizeTextarea } from '@/components/custom-chakra-ui'

export const AppHeader = ({ chatTitle }) => {
	const [speechLanguage, setSpeechLanguage] = useRecoilState(speechLanguageState)
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<Flex h='32px' mx={5} my={3} align='center' justify='space-between'>
			<Link href='/dashboard'>
				<ChevronLeftIcon boxSize={8} />
			</Link>
			<Text fontSize={18}>{chatTitle ? chatTitle : 'Untitled'}</Text>
			<Flex align='center' columnGap={2}>
				<Button variant='solid' colorScheme='gray' size='md' onClick={onOpen}>
					<Icon as={PiListBulletsBold} fontSize='20px' />
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
							<Tabs>
								<TabList>
									<Tab>
										<VStack>
											<Icon as={PiTranslateBold} fontSize='30px' color='#5e5e5e' />
											<Text fontSize='10px'>Translate</Text>
										</VStack>
									</Tab>
									<Tab>
										<VStack>
											<Icon as={PiNotepadBold} fontSize='30px' color='#5e5e5e' />
											<Text fontSize='10px'>Phrase</Text>
										</VStack>
									</Tab>
									<Tab>
										<VStack>
											<Icon as={PiArchiveBoxBold} fontSize='30px' color='#5e5e5e' />
											<Text fontSize='10px'>Something</Text>
										</VStack>
									</Tab>
									<Tab>
										<VStack>
											<Icon as={PiGearSixBold} fontSize='30px' color='#5e5e5e' />
											<Text fontSize='10px'>Setting</Text>
										</VStack>
									</Tab>
								</TabList>

								<TabPanels>
									<TabPanel>
										<Box>
											<Flex>
												<Text mr='1rem' fontSize='lg'>Before</Text>
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
											</Flex>
											<AutoResizeTextarea mt='1rem'></AutoResizeTextarea>

											<Flex mt='1rem'>
												<Text mr='1rem' fontSize='lg'>After</Text>
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
											</Flex>
										</Box>
									</TabPanel>
									<TabPanel>
										<Text>単語帳</Text>
									</TabPanel>
									<TabPanel>
										<Text>なにか</Text>
									</TabPanel>
									<TabPanel>
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
									</TabPanel>
								</TabPanels>
							</Tabs>
						</DrawerBody>

						<DrawerFooter>
							<Flex w='50%'>
								<Spacer />
								<Icon as={PiLinkBold} fontSize='22px' color='#5e5e5e' />
								<Spacer />
								<Icon as={PiTwitterLogoBold} fontSize='22px' color='#5e5e5e' />
								<Spacer />
								<Icon as={PiSnapchatLogoBold} fontSize='22px' color='#5e5e5e' />
								<Spacer />
								<Icon as={PiFacebookLogoBold} fontSize='22px' color='#5e5e5e' />
								<Spacer />
							</Flex>
							<Button variant='outline' colorScheme='gray' onClick={onClose}>Close</Button>
						</DrawerFooter>
					</DrawerContent>
				</Drawer>
			</Flex>
		</Flex>
	)
}