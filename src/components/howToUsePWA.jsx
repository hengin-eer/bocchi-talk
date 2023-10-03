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

export default function HowToUsePWA() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ PolicyContent, setPolicyContent ] = useState('');

    const fetchPolicyFile = async () => {
        try {
            const response = await fetch('/HowToUsePWA.md');
            if (response.ok) {
                const markdownText = await response.text();
                setPolicyContent(markdownText);
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
            <Text onClick={onOpen}>インストール方法</Text>
    
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent maxW="90vw">
                <ModalHeader>デバイスへのアプリのインストール方法</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <ReactMarkdown components={MarkdownComponents}>
                        {PolicyContent}
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