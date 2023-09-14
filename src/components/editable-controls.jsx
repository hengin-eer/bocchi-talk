import { useFirestore } from '@/hooks/useFirestore';
import { ButtonGroup, Flex, IconButton, useEditableContext } from '@chakra-ui/react'
import { PiCheck, PiPencilSimpleLine, PiTrash, PiTrashSimple, PiX } from 'react-icons/pi';

export const EditableControls = ({ userId, chatsId, chatTitle }) => {
	const { isEditing, getEditButtonProps, getCancelButtonProps, getSubmitButtonProps, on } = useEditableContext()
	const { addChatTitle } = useFirestore()
	return isEditing ? (
		<ButtonGroup alignItems='center' justifyContent='center' size='xs' ml='1rem'>
			<IconButton as={PiCheck} variant='ghost' {...getSubmitButtonProps()} onSubmit={addChatTitle(userId, chatsId, chatTitle)} />
			<IconButton as={PiX} variant='ghost' {...getCancelButtonProps()} />
		</ButtonGroup>
	) : (
		<ButtonGroup alignItems='center' justifyContent='center' size='xs'>
			<IconButton as={PiPencilSimpleLine} variant='ghost' {...getEditButtonProps()} />
			<IconButton as={PiTrashSimple} variant='ghost' {...getCancelButtonProps()} />
		</ButtonGroup>
	)
}