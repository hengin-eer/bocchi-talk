import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
    Text,
} from '@chakra-ui/react'


export default function Policy() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Text textDecoration="underline" onClick={onOpen}>ポリシー</Text>
    
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Box>
                        <Text>Lorem ipsum, doloeriam autem sit reprehenderit possimus repudiandae.</Text>
                    </Box>
                </ModalBody>
    
                <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                </Button>
                <Button variant='ghost'>Secondary Action</Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
        </>
    )
}