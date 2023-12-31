import { useFirestore } from '@/hooks/useFirestore';
import { chatsDataState, hoveredChatState } from '@/states/chatsDataState';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ButtonGroup, EditableInput, EditablePreview, Flex, IconButton, Text, useDisclosure, useEditableContext } from '@chakra-ui/react'
import Link from 'next/link';
import { useRef } from 'react';
import { PiCheckBold, PiPencilSimpleLineFill, PiTrashFill, PiXBold } from 'react-icons/pi';
import { useRecoilState, useSetRecoilState } from 'recoil';

export const EditableChatList = ({ currentChatTitle, setCurrentChatTitle, chatData, userId }) => {
	const { isEditing, getEditButtonProps, getCancelButtonProps, getSubmitButtonProps } = useEditableContext()
	const { addChatTitle } = useFirestore()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = useRef()
	const [chatsData, setChatsData] = useRecoilState(chatsDataState)
	const setHoveredChat = useSetRecoilState(hoveredChatState)

	const handleDelete = () => {
		const { deleteChatsData } = useFirestore()

		setChatsData(chatsData.filter((chat) => chat.id !== chatData.id))
		deleteChatsData(userId, chatData.id)
		onClose()
	}

	const EditableControls = () => isEditing ? (
		<ButtonGroup alignItems='center' justifyContent='center' size='xs' ml='1rem'>
			<IconButton as={PiCheckBold} variant='ghost' {...getSubmitButtonProps()} onSubmit={addChatTitle(userId, chatData.id, currentChatTitle)} />
			<IconButton as={PiXBold} variant='ghost' {...getCancelButtonProps()} />
		</ButtonGroup>
	) : (
		<>
			<ButtonGroup alignItems='center' justifyContent='center' size='xs'>
				<IconButton as={PiPencilSimpleLineFill} variant='ghost' {...getEditButtonProps()} />
				<IconButton as={PiTrashFill} variant='ghost' {...getCancelButtonProps()} onClick={onOpen} />
			</ButtonGroup>
			<AlertDialog
				motionPreset='slideInBottom'
				leastDestructiveRef={cancelRef}
				onClose={onClose}
				isOpen={isOpen}
				isCentered
			>
				<AlertDialogOverlay />

				<AlertDialogContent>
					<AlertDialogHeader>⚠️ Warning</AlertDialogHeader>

					<AlertDialogBody>チャットデータを削除しても構いませんか？ チャットデータは完全に削除され、2度と復元できません!!<br />Can I delete my chat data? The chat data is completely deleted and can never be recovered again!</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>Close</Button>
						<Button colorScheme='red' ml='20px' onClick={() => handleDelete()}>Delete</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)

	return (
		<Flex align='center' justify='space-between'>
			<Link href={`/chat/${chatData.id}`}>
				<>
					<Flex direction='column' align='flex-start' onMouseEnter={() => setHoveredChat(chatData.id)} onMouseLeave={() => setHoveredChat('')}>
						<EditablePreview cursor='pointer' />
						{!isEditing && <Text fontSize='sm' color='gray.400'>{new Date(chatData.updatedAt.seconds * 1000).toLocaleString()}</Text>}
					</Flex>
				</>
			</Link>
			<EditableInput onChange={(e) => setCurrentChatTitle(e.target.value)} />
			<EditableControls />
		</Flex>
	)
}