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

export default function Terms() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ TermsContent, setTermsContent ] = useState('');
    const [ TermsContentEng, setTermsContentEng ] = useState('');

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

    const fetchPolicyFileEng = async () => {
        try {
            const response = await fetch('/TermsOfServiceEng.md');
            if (response.ok) {
                const markdownText = await response.text();
                setTermsContentEng(markdownText);
            } else {
                throw new Error('Failed to fetch policy file. Please reload.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPolicyFile();
        fetchPolicyFileEng();
    }, []);

    return (
        <>
            <Text textDecoration="underline" onClick={onOpen}>利用規約</Text>
    
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent maxW="90vw">
                <ModalHeader>利用規約 / Terms</ModalHeader>
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
                                    {TermsContent}
                                </ReactMarkdown>
                            </TabPanel>
                            <TabPanel>
                                <ReactMarkdown components={MarkdownComponents}>
                                    {TermsContentEng}
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