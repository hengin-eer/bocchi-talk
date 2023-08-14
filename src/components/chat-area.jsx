import { Box, Button, Fade, Flex, Input, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'

export const ChatArea = () => {
	const [text, setText] = useState('')
	const [messages, setMessage] = useState([{ role : "", content: ""}])
	const { isOpen, onOpen, onClose } = useDisclosure()
	const [menuIndex, setMenuIndex] = useState(null) // 右クリックされたときのメニューのindexを保持する

	const sendMessage = (e) => {
		e.preventDefault()
		if (isTextEmpty) {
		} else {
			setMessage([...messages, {role: "user", content: text}])
			setText('')
		}
	}

	const isTextEmpty = text === ''

	const handleRightClick = (e, index) => {
		e.preventDefault()
		setMenuIndex(index) // 右クリックされたときのメニューのindexを保持する
		onOpen() // 右クリック時にメニューを開く
	}

	return (
		<Box onClick={() => onClose()}> {/* クリックしたときにメニューを閉じる */}
			<Flex direction='column' align='flex-end' rowGap={3} h="80vh" px={4} py={4} bg={'blue.200'} overflowY='auto'>
				{messages.map((message, index) => (
					<Box pos='relative' key={index} onContextMenu={(e) => handleRightClick(e, index)}>
						<Text w='max-content' maxW='70vw' px={5} py={3} bg={'white'} borderRadius='100px 0px 100px 100px'>{message.content}</Text>
						{index === menuIndex && (
							<Box pos='absolute' zIndex={999} top='40px' right={0}>
								<Fade in={isOpen} key={index}>
									<Flex direction='column' align='flex-start' rowGap={2} px={5} py={3} bg='teal' borderRadius={5}>
										<Button variant='link' color='white'>保存する</Button>
										<Button variant='link' color='white'>コピー</Button>
										<Button variant='link' color='white'>翻訳する</Button>
										<Button variant='link' color='white'>返信する</Button>
										<Button variant='link' color='white'>辞書を引く</Button>
									</Flex>
								</Fade>
							</Box>
						)}
					</Box>
				))}
			</Flex>
			<form onSubmit={(e) => sendMessage(e)} >
				<Flex w='100%' maxW={800} px={5} mx='auto' mt={5}>
					<Input mr={4} variant='filled' placeholder='Start Chat!!' type='text' value={text} onChange={(e) => setText(e.target.value)} />
					<Button colorScheme='teal' type='submit'>send</Button>
				</Flex>
			</form>
		</Box>
	)
}
