import { DashboardLayout } from "@/components/dashboard-layout";
import { newsDataState, isNewsUpdatedState } from "@/states/newsDataState";
import { Box, Flex, Heading, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PiArrowSquareOutFill, PiClockClockwiseFill } from "react-icons/pi";
import { useRecoilValue, useSetRecoilState } from "recoil";

export default function notification() {
    const newsData = useRecoilValue(newsDataState);
    const setIsNewsUpdated = useSetRecoilState(isNewsUpdatedState)
    const [isNewsFetched, setIsNewsFetched] = useState(false);
    useEffect(() => {
        if (!isNewsFetched) setIsNewsFetched(true);
        setIsNewsUpdated(false);
    }, [])

    return (
        <DashboardLayout>
            <Heading as='h1' size='lg' mb='20px'>News</Heading>
            {isNewsFetched && newsData.slice()
                .sort((b, a) => a.date.seconds - b.date.seconds)
                .map((news) => (
                    <Flex direction='column' align='flex-start' key={news.strId} mb='20px' p='20px' bg='gray.100' borderRadius='10px'>
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
                ))
            }
        </DashboardLayout>
    )
}