import { atom } from "recoil";

const localStorageEffect = key => ({ setSelf, onSet }) => {
    if (typeof window === 'undefined') return;
    const savedValue = localStorage.getItem(key);
    if (savedValue !== null) {
        setSelf(JSON.parse(savedValue));
    }

    onSet(newValue => {
        localStorage.setItem(key, JSON.stringify(newValue));
    });
};

const isProofOnState = atom({
    key: 'isProofOn',
    default: false,
    effects: [
        localStorageEffect('isProofOn'),
    ]
});

export default isProofOnState;
