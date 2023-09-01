import { AppHeader } from '@/components/app-header'
import { ChatArea } from '@/components/chat-area'
import db from '@/lib/firebase'
import { collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function chat() {
	const [speechLanguage, setSpeechLanguage] = useState('en-US')
	const [messages, setMessages] = useState([])

	let chatsId = 'chat1'
	useEffect(() => {
		; (async () => {
			const colRef = collection(db, 'chats', chatsId, 'messages');
			const snapShots = await getDocs(colRef)

			const docs = snapShots.docs.map((doc) => {
				const data = doc.data()
				return data
			})
			setMessages(docs.sort((a, b) => a.id - b.id))
		})()
	}, [])
	console.log(messages)

	return (
		<div>
			<AppHeader speechLanguage={speechLanguage} setSpeechLanguage={setSpeechLanguage} />
			<ChatArea speechLanguage={speechLanguage} firestoreMessages={messages} />
		</div>
	)
}
