import { useEffect, useState } from "react"
import { db } from "../lib/firebase"
import { collection, addDoc, getDocs, Timestamp, doc, updateDoc, deleteDoc, setDoc } from "firebase/firestore"

export const useFirestore = () => {
    const addChatsData = async (userId, chatsId) => {
        const cRef = doc(db, 'users', userId, 'chats', chatsId)
        await setDoc(cRef, {
            id: chatsId,
            updatedAt: Timestamp.now(),
        })
    }

    const updateChatsData = async (userId, chatsId) => {
        const cRef = doc(db, 'users', userId, 'chats', chatsId)
        await updateDoc(cRef, {
            updatedAt: Timestamp.now(),
        })
    }

    const deleteChatsData = async (userId, chatsId) => {
        const cRef = doc(db, 'users', userId, 'chats', chatsId)
        await deleteDoc(cRef)
    } // Firestoreからチャットデータを削除する

    const addChatTitle = async (userId, chatsId, chatTitle) => {
        const cRef = doc(db, 'users', userId, 'chats', chatsId)
        await updateDoc(cRef, {
            title: chatTitle,
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
            if (userId) {
                ; (async () => {
                    const data = await getMessages(userId, chatsId)
                    setMessages(data)
                })()
            }
        }, [userId])
        return messages
    }

    return { addChatsData, updateChatsData, deleteChatsData, addChatTitle, addFirestoreDoc, useMessages }
}