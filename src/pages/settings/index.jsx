import { DashboardLayout } from '@/components/dashboard-layout'
import Policy from '@/components/policy'
import Terms from '@/components/terms'
import { speechLanguageState } from '@/states/speechLanguageState'
import { Box, Flex, Heading, Select, Text } from '@chakra-ui/react'
import { useRecoilState } from 'recoil'

export default function Settings() {
	const [speechLanguage, setSpeechLanguage] = useRecoilState(speechLanguageState)

	return (
		<DashboardLayout>
			<Heading as='h1' size='lg'>Settings</Heading>
			<Flex direction='column' align='flex-start' rowGap='20px' py='20px'>
				<Box mb='2rem'>
					<Text mb='1rem' fontSize='lg'>音声入力言語</Text>
					<Select value={speechLanguage} placeholder='Language' variant='filled' size='sm' onChange={(e) => setSpeechLanguage(e.target.value)}>
						<option value='en-US'>English(US)</option>
						<option value='ja'>日本語</option>
						<option value='ko'>한국어(韓国語)</option>
						<option value='zh-CN'>中文(中国語)</option>
						<option value='zh-TW'>中文(台湾語)</option>
						<option value='fr-FR'>French(フランス語)</option>
						<option value='de-DE'>German(ドイツ語)</option>
						<option value='th-TH'>ภาษาไทย(タイ語)</option>
					</Select>
				</Box>
				<Box mb='2rem'>
					<Text mb='1rem' fontSize='lg'>その他の設定</Text>
					<Text>Coming soon...</Text>
				</Box>
				<Box>
					<Text mb='1rem' fontSize='lg'>利用規約・プライバシーポリシー</Text>
					<Terms />
					<Policy />
				</Box>
			</Flex>
		</DashboardLayout>
	)
}