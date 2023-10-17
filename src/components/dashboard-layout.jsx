import { DashboardNav } from '@/components/dashboard-nav'
import { useFirestore } from '@/hooks/useFirestore'
import { currentUserState } from '@/states/currentUserState'
import { newsDataState, isNewsUpdatedState } from '@/states/newsDataState'
import { Box, Flex } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

export const DashboardLayout = ({ children }) => {
    const currentUser = useRecoilValue(currentUserState)
    const [newsData, setNewsData] = useRecoilState(newsDataState);
    const [isNewsUpdated, setIsNewsUpdated] = useRecoilState(isNewsUpdatedState);
    const [isNewsFetched, setIsNewsFetched] = useState(false);
    const { getNewsData } = useFirestore();

    useEffect(() => {
        if (!isNewsFetched) {
            ; (async () => {
                const data = await getNewsData();
                if (data.length !== newsData.length) setIsNewsUpdated(true);
                setNewsData(data);
                setIsNewsFetched(true);
            })()
        }
    }, [])

    return (
        <Flex h='100dvh' direction={{ base: 'column-reverse', lg: 'row' }} justify='space-between'>
            <DashboardNav user={currentUser} isNewsUpdated={isNewsUpdated} />
            <Box w='full' p='20px' overflowY='auto'>
                {children}
            </Box>
        </Flex>
    )
}