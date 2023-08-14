import { AppHeader } from '@/components/app-header'
import { ChatArea } from '@/components/chat-area'
import Link from 'next/link'
import React from 'react'

export default function chat() {
	return (
		<div overflowY='hidden'>
			<AppHeader />
			<ChatArea />
		</div>
	)
}
