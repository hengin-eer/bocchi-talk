import { DashboardLayout } from '@/components/dashboard-layout'
import { Flex, Text } from '@chakra-ui/react'

export default function Settings() {
	return (
		<DashboardLayout>
			<Flex direction='column' align='center' justify='center' h='100%'>
				<Text fontSize='xl'>Settings</Text>
				<Text fontSize='xl'>Coming Soon...</Text>
			</Flex>
		</DashboardLayout>
	)
}