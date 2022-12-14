import { createContext, useEffect, useState } from "react";
import { auth } from '../services/firebase';
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export const AuthContext = createContext({});

export function AuthContextProvider(props) {

    const [user, setUser] = useState({});

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                const { displayName, photoURL, uid } = user;
                if (!displayName || !photoURL) {
                    throw new Error('Missing information from Google Account.');
                }
                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                })
            }
        })

        return () => {
            unsubscribe();
        }

    }, []);

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, provider);
        if (result.user) {
            const { displayName, photoURL, uid } = result.user;
            if (!displayName || !photoURL) {
                throw new Error('Missing information from Google Account.');
            }
            setUser({
                id: uid,
                name: displayName,
                avatar: photoURL
            })
        }
    }

    async function signOutGoogle() {
        await signOut(auth);
        setUser({});
    }


    return (
        <AuthContext.Provider value={{ user, signInWithGoogle, signOutGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}