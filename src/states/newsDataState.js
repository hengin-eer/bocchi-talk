const { atom } = require("recoil");

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

const newsDataState = atom({
    key: 'newsData',
    default: [],
    effects: [
        localStorageEffect('newsData'),
    ]
});

const isNewsUpdatedState = atom({
    key: 'isNewsUpdated',
    default: false,
    effects: [
        localStorageEffect('isNewsUpdated'),
    ]
});

export { newsDataState, isNewsUpdatedState };