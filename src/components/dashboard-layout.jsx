import { DashboardNav } from '@/components/dashboard-nav'
import { currentUserState } from '@/states/currentUserState'
import { Box, Flex } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

export const DashboardLayout = ({ children }) => {
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
    const [isFetched, setIsFetched] = useState(false)
    const { data: session } = useSession({ required: true })

    useEffect(() => {
        if (!isFetched && session) {
            setCurrentUser({
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
            })
            setIsFetched(true)
        }
    }, [session])

    // we can use propaties "session" and "currentUser" in children components

    return (
        <Flex h='100dvh' direction={{ base: 'column-reverse', sm: 'row' }}>
            <DashboardNav user={currentUser} />
            <Box w='full' p='20px'>
                {children}
            </Box>
        </Flex>
    )
}