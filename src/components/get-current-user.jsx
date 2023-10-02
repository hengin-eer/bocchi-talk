import { currentUserState } from "@/states/currentUserState"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"

export const GetCurrentUser = () => {
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
    const [isFetched, setIsFetched] = useState(false)
    const [isSession, setIsSession] = useState(false)
    useEffect(() => {
        if (window.location.pathname === '/') setIsSession(false)
        else if ((window.location.pathname !== '/') && !isSession) setIsSession(true)
        else return
        // console.log('isSession is changed!!')
    }, [])
    const { data: session } = useSession({ required: isSession })
    if (!isFetched && session && !currentUser) {
        setCurrentUser({
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
        })
        setIsFetched(true)
    }

    return;
}