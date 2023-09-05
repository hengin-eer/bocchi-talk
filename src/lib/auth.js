import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import { auth } from "./firebase";

export const login = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
};

export const logout = () => {
    return signOut(auth);
};