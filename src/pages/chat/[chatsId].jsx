import { AppHeader } from '@/components/app-header'
import { ChatArea } from '@/components/chat-area'
import { db } from '@/lib/firebase'
import { chatTitleState, chatsDataState } from '@/states/chatsDataState'
import { currentUserState } from '@/states/currentUserState'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

export default function chat() {
	const [messages, setMessages] = useState([])
	const currentUser = useRecoilValue(currentUserState)
	const chatsData = useRecoilValue(chatsDataState)
	const [chatTitle, setChatTitle] = useRecoilState(chatTitleState)
	const [isMessagesFetched, setIsMessagesFetched] = useState(false)

	const router = useRouter()
	if (router.isReady && currentUser) {
		const id = router.query.chatsId
		if (chatsData.length !== 0) setChatTitle(chatsData.filter((chat) => chat.id === id).map((chat) => chat.title)[0])


		if (!isMessagesFetched && (messages.length === 0)) {
			; (async () => {
				const colRef = collection(db, 'users', currentUser.email, 'chats', id, 'messages');
				const snapShots = await getDocs(colRef)

				const docs = snapShots.docs.map((doc) => {
					const data = doc.data()
					return data
				})
				setMessages(docs.sort((a, b) => a.createdAt.seconds - b.createdAt.seconds))
			})()
			console.log("2.メッセージを追加！")
			setIsMessagesFetched(true)
		}

		if ((chatsData.length === 0) && (messages.length !== 0)) {
			; (async () => {
				const snapshot = await getDoc(doc(db, 'users', currentUser.email, 'chats', id))
				const data = snapshot.data()
				setChatTitle(data.title)
			})()
		}
	}
	const chatsId = router.query.chatsId

	return (
		<div>
			<AppHeader chatTitle={chatTitle} />
			<ChatArea firestoreMessages={messages} chatsId={chatsId} currentUser={currentUser && currentUser} />
		</div>
	)
}
