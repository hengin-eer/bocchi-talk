import { currentUserState } from "@/states/currentUserState"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"

export const GetCurrentUser = () => {
    const [currentUser, setCurrentUser] = useRecoilState(currentUserState)
    const [isFetched, setIsFetched] = useState(false)
    const { data: session } = useSession({ required: true })

    useEffect(() => {
        if (!isFetched && session && !currentUser) {
            setCurrentUser({
                name: session.user.name,
                email: session.user.email,
                image: session.user.image,
            })
            setIsFetched(true)
        }
    }, [session])

    return;
}