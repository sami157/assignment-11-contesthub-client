import {  useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, signInWithPopup, updateProfile, GoogleAuthProvider } from "firebase/auth";
import { AuthContext } from './AuthContext.jsx';
import { auth } from '../firebase/firebase.init';
import { useAxiosSecure } from '../hooks/useAxiosSecure.js';

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const axiosSecure = useAxiosSecure()
    const fetchRole = async (email) => {
        const response = await axiosSecure.get(`/users/get-role/${email}`);
        return response.data.role;
    };
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')
    const [role, setRole] = useState('');
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser?.email) {
                try {
                    const userRole = await fetchRole(currentUser.email);
                    setRole(userRole);
                } catch (error) {
                    console.error("Error fetching role:", error);
                }
            }
            setLoading(false);
            setErrorMessage('');
        });

        return () => unsubscribe();
    }, []);


    const createUser = async (email, password) => {
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

    const updateUserProfile = (name, image) => {
        if (name || image) {
            return updateProfile(authData.auth.currentUser, {
                displayName: name && name,
                photoURL: image && image
            })
        }
        else return Promise.reject()
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
        errorMessage,
        updateUserProfile,
        role
    }
    return (
        <AuthContext value={authData}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;