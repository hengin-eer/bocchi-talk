import { useEffect, useState } from "react"
import { db } from "../lib/firebase"
import { collection, addDoc, getDocs, Timestamp, setDoc, doc } from "firebase/firestore"

export const useFirestore = () => {
    // const addFirestoreChat = async (newChat)

    const addChatsData = async (userId, chatsId) => {
        const cRef = doc(db, 'users', userId, 'chats', chatsId)
        await setDoc(cRef, {
            id: chatsId,
            updatedAt: Timestamp.now(),
        })
    }

    const addFirestoreDoc = async (newMessage, userId, chatsId) => {
        const mRef = collection(db, 'users', userId, 'chats', chatsId, 'messages')
        await addDoc(mRef, {
            content: newMessage.content,
            role: newMessage.role,
            createdAt: Timestamp.now(),
        })
    }

    const getMessages = async (userId, chatsId) => {
        const snapshot = await getDocs(collection(db, 'users', userId, 'chats', chatsId, 'messages'))
        const getData = snapshot.docs.map((doc) => {
            const data = doc.data()
            data.strId = doc.id
            return data
        })
        return getData
    }

    const useMessages = async (userId, chatsId) => {
        const [messages, setMessages] = useState([])
        useEffect(() => {
            ; (async () => {
                const data = await getMessages(userId, chatsId)
                setMessages(data)
            })()
        }, [])
        return messages
    }

    const getChatsId = async (userId) => {
        const snapshot = await getDocs(collection(db,'users', userId, 'chats'))
        const getData = snapshot.docs.map((doc) => {
            const data = doc.data()
            data.id = doc.id
            return data
        })
        return getData
    }

    const useChatsIds = (userId) => {
        const [chatsId, setChatsId] = useState([])
        useEffect(() => {
            ; (async () => {
                const data = await getChatsId(userId)
                setChatsId(data.sort((a, b) => b.updatedAt.seconds - a.updatedAt.seconds))
            })()
        }, [])

        return chatsId
    }

    return { addChatsData, addFirestoreDoc, useMessages, useChatsIds }
}