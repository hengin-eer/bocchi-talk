import { useEffect, useState } from "react"
import db from "../lib/firebase"
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore"

export const useFirestore = () => {
    // const addFirestoreChat = async (newChat)

    const addFirestoreDoc = async (newMessage, chatsId) => {
        const mRef = collection(db, 'chats', chatsId, 'messages')
        await addDoc(mRef, {
            content: newMessage.content,
            role: newMessage.role,
            createdAt: Timestamp.now(),
        })
    }

    const getMessages = async (chatsId) => {
        const snapshot = await getDocs(collection(db, 'chats', chatsId, 'messages'))
        const getData = snapshot.docs.map((doc) => {
            const data = doc.data()
            data.strId = doc.id
            return data
        })
        return getData
    }

    const useMessages = async (chatsId) => {
        const [messages, setMessages] = useState([])
        useEffect(() => {
            ; (async () => {
                const data = await getMessages(chatsId)
                setMessages(data)
            })()
        }, [])
        return messages
    }

    const getUser = async () => {
        const snapshot = await getDocs(collection(db, 'users'))
        const getData = snapshot.docs.map((doc) => {
            const data = doc.data()
            data.id = doc.id
            return data
        })
        return getData
    }

    const useUser = () => {
        const [users, setUsers] = useState([])
        useEffect(() => {
            ; (async () => {
                const data = await getUser()
                setUsers(data)
            })()
        }, [])

        return users
    }

    return { addFirestoreDoc, useMessages, useUser }
}