import { atom } from "recoil";

export const systemPromptState = atom({
    key: "systemPrompt",
    default: {
		role: "system",
		content: "You are my friend." // 初期値としてシステムメッセージを入れておく。
	}
})