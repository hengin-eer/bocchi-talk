import { AppHeader } from '@/components/app-header'
import { ChatArea } from '@/components/chat-area'
import { db } from '@/lib/firebase'
import { currentUserState } from '@/states/currentUserState'
import { collection, getDocs } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'

export default function chat() {
	const [messages, setMessages] = useState([])
	const [isFetched, setIsFetched] = useState(false)
	const currentUser = useRecoilValue(currentUserState)

	const router = useRouter()
	useEffect(() => {
		if (router.isReady && !isFetched && currentUser) {
			; (async () => {
				const id = router.query.chatsId
				const colRef = collection(db, 'users', currentUser.email, 'chats', id, 'messages');
				const snapShots = await getDocs(colRef)

				const docs = snapShots.docs.map((doc) => {
					const data = doc.data()
					return data
				})
				setMessages(docs.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds))
			})()
			setIsFetched(true)
			console.log(currentUser)
		}
	}, [router, currentUser])
	const chatsId = router.query.chatsId

	return (
		<div>
			<AppHeader/>
			<ChatArea firestoreMessages={messages} chatsId={chatsId} currentUser={currentUser && currentUser} />
		</div>
	)
}
