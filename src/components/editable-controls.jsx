import { useFirestore } from '@/hooks/useFirestore';
import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, ButtonGroup, Flex, IconButton, useDisclosure, useEditableContext } from '@chakra-ui/react'
import { useRef } from 'react';
import { PiCheck, PiCheckBold, PiPencilSimpleLine, PiPencilSimpleLineFill, PiTrash, PiTrashFill, PiX, PiXBold } from 'react-icons/pi';

export const EditableControls = ({ chatsData, setChatsData, userId, chatsId, chatTitle }) => {
	const { isEditing, getEditButtonProps, getCancelButtonProps, getSubmitButtonProps } = useEditableContext()
	const { addChatTitle } = useFirestore()
	const { isOpen, onOpen, onClose } = useDisclosure()
	const cancelRef = useRef()

	const handleDelete = () => {
		const { deleteChatsData } = useFirestore()
		
		setChatsData(chatsData.filter((chat) => chat.id !== chatsId))
		deleteChatsData(userId, chatsId)
		onClose()
	}

	return isEditing ? (
		<ButtonGroup alignItems='center' justifyContent='center' size='xs' ml='1rem'>
			<IconButton as={PiCheckBold} variant='ghost' {...getSubmitButtonProps()} onSubmit={addChatTitle(userId, chatsId, chatTitle)} />
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
					<AlertDialogHeader>⚠️警告</AlertDialogHeader>

					<AlertDialogBody>チャットデータを削除しても構いませんか？ チャットデータは完全に削除され、2度と復元できません!!</AlertDialogBody>
					<AlertDialogFooter>
						<Button ref={cancelRef} onClick={onClose}>閉じる</Button>
						<Button colorScheme='red' ml='20px' onClick={() => handleDelete()}>削除する</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	)
}