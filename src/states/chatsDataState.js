import { atom } from "recoil";

export const chatsDataState = atom({
    key: "chatsDataState",
    default: []
})

export const hoveredChatState = atom({
    key: "hoveredChatState",
    default: ''
})