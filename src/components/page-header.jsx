import { Button, ButtonGroup, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { GradientText } from './custom-chakra-ui'
import { useAuth } from '@/hooks/useFirebaseAuth'
import { login, logout } from '@/lib/auth'

export const PageHeader = () => {
    const user = useAuth();
    return (
        <Flex align='center' justify='space-between' h='80px' w='100%' px={30} bg={'blackAlpha.50'}>
            <Flex align='center'>
                <Image src={'/512x512_Bocchi-Talk.png'} alt='Bocchi Talk' boxSize='80px' />
                <GradientText fontSize='4xl' fontWeight='bold'>Bocchi Talk</GradientText>
            </Flex>
            <ButtonGroup gap={2}>
                {user === null && <Button colorScheme='green' onClick={login}>Login</Button>}
                {user && <Button colorScheme='red' onClick={logout}>Logout</Button>}
            </ButtonGroup>
        </Flex>
    )
}
