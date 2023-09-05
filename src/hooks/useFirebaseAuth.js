import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

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
					};
					setDoc(docRef, newUser).then(() => {
						setUser(newUser);
					});
				}
			}
			else {
				setUser(null);
			}

			return unsubscribe;
		});
	}, []);

	return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);