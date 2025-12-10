import {  useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.init';

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            setLoading(false);
            setErrorMessage('')
        });
        return () => unsubscribe();
    }, [user]);

    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password, isGoogle) => {
        if (!isGoogle) {
            return signInWithEmailAndPassword(auth, email, password)
        }
        else {
            return signInWithPopup(auth, provider)
        }
    }

    const signOutUser = () => {
        return signOut(auth)
    }


    const authData = {
        auth,
        user,
        setUser,
        loading,
        createUser,
        signInUser,
        signOutUser,
        setErrorMessage,
        errorMessage
    }
    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;