import { ChevronLeftIcon, Icon } from '@chakra-ui/icons'
import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, Select, Spacer, Text, VStack, useDisclosure } from '@chakra-ui/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { PiArchiveBoxBold, PiFacebookLogoBold, PiGearSixBold, PiLinkBold, PiListBulletsBold, PiNotepadBold, PiSnapchatLogoBold, PiTranslateBold, PiTwitterLogoBold } from 'react-icons/pi'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'
import { speechLanguageState } from '@/states/speechLanguageState'
import { AutoResizeTextarea } from '@/components/custom-chakra-ui'
import { translateLanguageState } from '@/states/translateLanguageState'
import { isWaitChatGPTState } from '@/states/isWaitChatGPTState'

export const AppHeader = ({ chatTitle }) => {
	const [ speechLanguage, setSpeechLanguage ] = useRecoilState(speechLanguageState);
	const [ translatedLanguage, setTranslatedLanguage ] = useRecoilState(translateLanguageState);
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [ originalText, setOriginalText ] = useState({ role: "user", content: "" });
	const [ translatedText, setTranslatedText ] = useState({ role: "assistant", content: "" });
	const [ isWaitChatGPT, setIsWaitChatGPT ] = useRecoilState(isWaitChatGPTState);

	const handleInputChange = (value) => {
		setOriginalText({
			role: "user",
			content: value
		});
	}

	const onClickTranslate = async (e) => {
		try {
			e.preventDefault()
			if (originalText.content === "") return;

			setIsWaitChatGPT(true);
			// ChatGPT APIと通信
			const response = await fetch("/api/messages", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					message: [
					{
						role: "system",
						content: "system_prompt",
					},
					{
						role: "user",
						content: "命令 \n あなたは高性能な翻訳アプリです。\"" + originalText.content + "\"を" + translatedLanguage + "に翻訳した結果を出力してください。\n 条件 \n 出力には「翻訳された単語」(\"\"は含まない), 「品詞」, 「意味」, 「例文と" + translatedLanguage + "語訳」, 「説明(簡潔に)」を含めてください。それぞれは改行が必要ですが、箇条書きや太字は使用しないでください。意味などが複数ある場合はすべて出力してください。",
					},]
				}),
			});

			const data = await response.json();
			if (response.status !== 200) {
				throw (
					data.error ||
					new Error(`Request failed with status ${response.status}`)
				);
			}
			setIsWaitChatGPT(false);
			setTranslatedText(data.result);
		} catch (error) {
			console.log(error);
		};
	};

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
											<AutoResizeTextarea mt='1rem' mb='1rem' placeholder="Original text..." value={originalText.content} onChange={(e) => handleInputChange(e.target.value)} />
											<Flex>
												<Text mr='0.5rem' ml='0.5rem' fontSize='lg' fontWeight={600}>&rarr;</Text>
												<Select value={translatedLanguage} placeholder='Language' variant='filled' size='sm' onChange={(e) => setTranslatedLanguage(e.target.value)}>
													<option value='en-US'>English(US)</option>
													<option value='ja'>日本語</option>
													<option value='th-TH'>ภาษาไทย(タイ語)</option>
												</Select>
											</Flex>
											{isWaitChatGPT ? 
												<Button mt='1rem' w='100%' variant='outline' colorScheme='gray'>Wait...</Button>
											:
												<Button mt='1rem' w='100%' variant='outline' colorScheme='gray' onClick={onClickTranslate}>Translate</Button>
											}
											<Text mt='1rem' w='100%' css={{whiteSpace: 'pre-wrap',}}>{translatedText.content}</Text>
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