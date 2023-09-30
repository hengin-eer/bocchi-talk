import { Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { ButtonLink, GradientText, Text100 } from './custom-chakra-ui'

export const PageHeader = () => {
    return (
        <Flex align='center' justify='space-between' h='70px' w='100%' >
            <Flex align='center'>
                <Image src={'/512x512_Bocchi-Talk.png'} alt='Bocchi Talk' boxSize='50px' />
                <GradientText fontSize='24px' fontWeight='bold'>Bocchi Talk</GradientText>
            </Flex>
            <ButtonLink href='/'>お問い合わせ</ButtonLink>
        </Flex>
    )
}
