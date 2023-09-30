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
    Box,
    Text,
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown';

export default function Policy() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ PolicyContent, setPolicyContent ] = useState('');

    const fetchPolicyFile = async () => {
        try {
            const response = await fetch('/PrivacyPolicy.md');
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
            <Text textDecoration="underline" onClick={onOpen}>ポリシー</Text>
    
            <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>プライバシーポリシーとCookieポリシー</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <ReactMarkdown>{PolicyContent}</ReactMarkdown>
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