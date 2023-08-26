import { AppHeader } from '@/components/app-header'
import { ChatArea } from '@/components/chat-area'
import Link from 'next/link'
import React, { useState } from 'react'

export default function chat() {
	const [speechLanguage, setSpeechLanguage] = useState('en-US')
	return (
		<div>
			<AppHeader speechLanguage={speechLanguage} setSpeechLanguage={setSpeechLanguage} />
			<ChatArea speechLanguage={speechLanguage} />
		</div>
	)
}
