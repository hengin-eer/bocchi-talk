import { Button, ButtonGroup, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'

export const PageHeader = () => {
    return (
        <Flex align='center' justify='space-between' h='80px' w='100%' px={30} bg={'blackAlpha.50'}>
            <Flex align='center'>
                <Image src={'/512x512_Bocchi-Talk.png'} alt='Bocchi Talk' boxSize='80px' />
                <Text fontSize='4xl' fontWeight='bold' bgClip='text' bgGradient='linear(to-br, #1DBEE1, #487EE7, #884FE4)'>Bocchi Talk</Text>
            </Flex>
            <ButtonGroup gap={2}>
                <Button variant='outline' colorScheme='teal'>Sign Up</Button>
                <Button colorScheme='teal'>Login</Button>
            </ButtonGroup>
        </Flex>
    )
}
