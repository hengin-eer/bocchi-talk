import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(undefined);
	const router = useRouter();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				const docRef = doc(db, 'users', user.uid);
				const snapshot = await getDoc(docRef);

				if (snapshot.exists()) {
					const userData = snapshot.data();
					setUser(userData);
				}
				else {
					const newUser = {
						id: user.uid,
						name: user.displayName,
						pic: user.photoURL,
					};
					setDoc(docRef, newUser).then(() => {
						setUser(newUser);
					});
				}
				if (router.pathname === '' || router.pathname === '/') router.push('/dashboard');
			}
			else {
				setUser(null);
				if (router.pathname === '/dashboard') router.push('/');
			}

			return unsubscribe;
		});
	}, []);

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);

export const useRedirectIsLogin = (user) => {
	const router = useRouter();

	useEffect(() => {
		if (user) router.push('/dashboard');
	}, [user])
}

export const useRedirectIsLogout = (user) => {
	const router = useRouter();

	useEffect(() => {
		if (user === null) router.push('/');
	}, [user])
}