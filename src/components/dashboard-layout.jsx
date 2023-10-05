import { DashboardNav } from '@/components/dashboard-nav'
import { currentUserState } from '@/states/currentUserState'
import { Box, Flex } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'

export const DashboardLayout = ({ children }) => {
    const currentUser = useRecoilValue(currentUserState)

    return (
        <Flex h='100dvh' direction={{ base: 'column-reverse', lg: 'row' }} justify='space-between'>
            <DashboardNav user={currentUser} />
            <Box w='full' p='20px' overflowY='auto'>
                {children}
            </Box>
        </Flex>
    )
}