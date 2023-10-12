import { Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { ButtonLink, GradientText } from './custom-chakra-ui'
import Link from 'next/link'

export const PageHeader = () => {
    return (
        <Flex align='center' justify='space-between' h='70px' w='100%' >
            <Link href='/'>
                <Flex align='center'>
                    <Image src={'/512x512_Bocchi-Talk.png'} alt='Bocchi Talk' boxSize='50px' />
                    <GradientText fontSize='24px' fontWeight='bold'>Bocchi Talk</GradientText>
                </Flex>
            </Link>
            <ButtonLink href='https://forms.gle/NK5GJSAVJzUGDtao7' isBlank={true}>お問い合わせ</ButtonLink>
        </Flex>
    )
}
