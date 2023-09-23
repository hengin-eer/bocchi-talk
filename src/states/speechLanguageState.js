import { atom } from "recoil";

export const speechLanguageState = atom({
    key: "speechLanguageState",
    default: "en-US",
})