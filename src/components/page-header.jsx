import { Box, Flex, Icon, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'
import { ButtonLink, GradientText, ResponsiveButtonLink } from './custom-chakra-ui'
import Link from 'next/link'
import { PiArrowSquareOutFill, PiBellRingingFill, PiClockClockwiseFill, PiEnvelopeSimpleFill } from 'react-icons/pi'

export const PageHeader = ({ newsData }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex align='center' justify='space-between' h='70px' w='100%' >
            <Link href='/'>
                <Flex align='center'>
                    <Image src={'/512x512_Bocchi-Talk.png'} alt='Bocchi Talk' boxSize='50px' />
                    <GradientText fontSize='24px' fontWeight='bold'>Bocchi Talk</GradientText>
                </Flex>
            </Link>
            <Flex align='center' justify='center' gap='10px'>
                <ResponsiveButtonLink icon={PiBellRingingFill} onClick={onOpen}>お知らせ</ResponsiveButtonLink>
                <ResponsiveButtonLink icon={PiEnvelopeSimpleFill} href='https://forms.gle/NK5GJSAVJzUGDtao7' isBlank={true}>お問い合わせ</ResponsiveButtonLink>
            </Flex>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                motionPreset='slideInBottom'
            >
                <ModalOverlay />
                <ModalContent maxW='80vw'>
                    <ModalHeader>お知らせ</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody h='auto' maxH='70vh' overflowY='auto'>
                        {newsData.slice()
                            .sort((b, a) => a.date.seconds - b.date.seconds)
                            .map((news) => (
                                <Flex direction='column' align='flex-start' key={news.strId} mb='30px'>
                                    <Flex direction={{ base: 'column', md: 'row' }} justify='flex-start' gap={{ base: '5px', md: '10px' }} w='100%' mb='10px'>
                                        <Flex align='center' columnGap='5px'>
                                            <Icon as={PiClockClockwiseFill} fontSize='16px' />
                                            <Text fontSize='14px'>
                                                {new Date(news.date.seconds * 1000).toLocaleDateString('ja-JP')}
                                            </Text>
                                        </Flex>
                                        <Link
                                            href={(news.linkURL === '#') ? '' : news.linkURL}
                                            target={news.isInNewTab ? '_blank' : '_self'}
                                            rel="noopener noreferrer"
                                        >
                                            <Text color={(news.linkURL === '#') ? 'black' : '#884FE4'} fontSize='20px' fontWeight='bold'>
                                                {news.isInNewTab && <Icon as={PiArrowSquareOutFill} mr='2px' fontSize='24px' color='#884FE4' verticalAlign='text-bottom' />}
                                                {news.titleJA}
                                            </Text>
                                        </Link>
                                    </Flex>

                                    <Text fontSize='16px'>{news.contentJA}</Text>
                                </Flex>
                            ))}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Flex>
    )
}
