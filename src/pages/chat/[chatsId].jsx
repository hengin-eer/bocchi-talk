import { AppHeader } from '@/components/app-header'
import { ChatArea } from '@/components/chat-area'
import { useAuth } from '@/hooks/useFirebaseAuth'
import { db } from '@/lib/firebase'
import { Timestamp, collection, getDocs } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

export default function chat() {
	const [speechLanguage, setSpeechLanguage] = useState('en-US')
	const [messages, setMessages] = useState([])
	const user = useAuth()

	const router = useRouter()
	useEffect(() => {
		if (router.isReady && user) {
			; (async () => {
				const id = router.query.chatsId
				const colRef = collection(db, 'users', user.id, 'chats', id, 'messages');
				const snapShots = await getDocs(colRef)

				const docs = snapShots.docs.map((doc) => {
					const data = doc.data()
					return data
				})
				setMessages(docs.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds))
			})()
		}
	}, [router, user])
	const chatsId = router.query.chatsId

	return (
		<div>
			<AppHeader speechLanguage={speechLanguage} setSpeechLanguage={setSpeechLanguage} />
			<ChatArea speechLanguage={speechLanguage} firestoreMessages={messages} chatsId={chatsId} />
		</div>
	)
}
