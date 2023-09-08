import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react"

const AuthContext = createContext();

export const useAuth = () => {
	return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(undefined);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const loginUser = auth.currentUser;

	useEffect(() => {
		if (loginUser) setCurrentUser(loginUser);
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			setIsLoading(true);
			if (user) {
				setCurrentUser(user);
				if (router.pathname === '' || router.pathname === '/') router.push('/dashboard');
			}
			else {
				setCurrentUser(null);
			}
			setIsLoading(false);

			return unsubscribe;
		});
		setIsLoading(false);

	}, []);

	return (
		<AuthContext.Provider value={{ currentUser, isLoading }}>
			{isLoading && <p>Loading...</p>}
			{!isLoading && children}
		</AuthContext.Provider>
	);
};

export const getServerSideProps = async (context) => {
	
}

export const useRedirectIsLogout = (user) => {
	const router = useRouter();

	useEffect(() => {
		if (user === null) router.push('/');
	}, [user])
}