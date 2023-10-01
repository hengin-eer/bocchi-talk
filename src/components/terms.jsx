import React, { useEffect, useState } from 'react';
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
    Text,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown';
import MarkdownComponents from '@/components/markdownComponents';

export default function Terms() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ TermsContent, setTermsContent ] = useState('');

    const fetchPolicyFile = async () => {
        try {
            const response = await fetch('/TermsOfService.md');
            if (response.ok) {
                const markdownText = await response.text();
                setTermsContent(markdownText);
            } else {
                throw new Error('Failed to fetch policy file. Please reload.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPolicyFile();
    }, []);

    return (
        <>
            <Text textDecoration="underline" onClick={onOpen}>利用規約</Text>
    
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent maxW="90vw">
                <ModalHeader>利用規約</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <ReactMarkdown components={MarkdownComponents}>
                        {TermsContent}
                    </ReactMarkdown>
                </ModalBody>
    
                <ModalFooter>
                <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                </Button>
                </ModalFooter>
            </ModalContent>
            </Modal>
        </>
    )
}