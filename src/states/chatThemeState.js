import { atom } from "recoil";

export const systemPromptState = atom({
    key: "systemPrompt",
    default: {
		role: "system",
		content: "You are my best friend. Always return in one to three brief sentences. You don't always have to answer the question, but please respond with words that will keep the conversation going." // 初期値としてシステムメッセージを入れておく。
	}
})