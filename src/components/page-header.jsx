import { Button, ButtonGroup, Flex, Image } from '@chakra-ui/react'
import React from 'react'
import { GradientText } from './custom-chakra-ui'
import { signIn } from 'next-auth/react'

export const PageHeader = () => {
    return (
        <Flex align='center' justify='space-between' h='80px' w='100%' px={30} bg={'blackAlpha.50'}>
            <Flex align='center'>
                <Image src={'/512x512_Bocchi-Talk.png'} alt='Bocchi Talk' boxSize='80px' />
                <GradientText fontSize='4xl' fontWeight='bold'>Bocchi Talk</GradientText>
            </Flex>
            <ButtonGroup gap={2}>
                <Button colorScheme='green' onClick={() => signIn('google')}>Login</Button>
            </ButtonGroup>
        </Flex>
    )
}
