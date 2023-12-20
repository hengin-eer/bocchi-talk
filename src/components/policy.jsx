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
    Tab,
    Tabs,
    TabList,
    TabPanels,
    TabPanel
} from '@chakra-ui/react'
import ReactMarkdown from 'react-markdown';
import MarkdownComponents from '@/components/markdownComponents';

export default function Policy() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ PolicyContent, setPolicyContent ] = useState('');
    const [ PolicyContentEng, setPolicyContentEng ] = useState('');

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

    const fetchPolicyEngFile = async () => {
        try {
            const response = await fetch('/PrivacyPolicyEng.md');
            if (response.ok) {
                const markdownText = await response.text();
                setPolicyContentEng(markdownText);
            } else {
                throw new Error('Failed to fetch policy file. Please reload.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPolicyFile();
        fetchPolicyEngFile();
    }, []);

    return (
        <>
            <Text textDecoration="underline" onClick={onOpen}>ポリシー</Text>
    
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent maxW="90vw">
                <ModalHeader>プライバシーポリシーとCookieポリシー<br />PrivacyPolicy & CookiePolicy</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Tabs>
                        <TabList>
                            <Tab>日本語</Tab>
                            <Tab>English</Tab>
                        </TabList>

                        <TabPanels>
                            <TabPanel>
                                <ReactMarkdown components={MarkdownComponents}>
                                    {PolicyContent}
                                </ReactMarkdown>
                            </TabPanel>
                            <TabPanel>
                                <ReactMarkdown components={MarkdownComponents}>
                                    {PolicyContentEng}
                                </ReactMarkdown>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
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