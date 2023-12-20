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

export default function HowToUsePWA() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ wayInstallContent, setWayInstallContent ] = useState('');
    const [ wayInstallContentEng, setWayInstallContentEng ] = useState('');

    const fetchWayInstallFile = async () => {
        try {
            const response = await fetch('/HowToUsePWA.md');
            if (response.ok) {
                const markdownText = await response.text();
                setWayInstallContent(markdownText);
            } else {
                throw new Error('Failed to fetch policy file. Please reload.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const fetchWayInstallEngFile = async () => {
        try {
            const response = await fetch('/HowToUsePWAEng.md');
            if (response.ok) {
                const markdownText = await response.text();
                setWayInstallContentEng(markdownText);
            } else {
                throw new Error('Failed to fetch policy file. Please reload.');
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchWayInstallFile();
        fetchWayInstallEngFile();
    }, []);

    return (
        <>
            <Text onClick={onOpen}>How to Install</Text>
    
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
            <ModalOverlay />
            <ModalContent maxW="90vw">
                <ModalHeader>デバイスへのアプリのインストール方法<br />How to Install the Application on Your Device</ModalHeader>
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
                                    {wayInstallContent}
                                </ReactMarkdown>
                            </TabPanel>
                            <TabPanel>
                                <ReactMarkdown components={MarkdownComponents}>
                                    {wayInstallContentEng}
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