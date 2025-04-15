import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase.js'
import { onAuthStateChanged, getRedirectResult } from 'firebase/auth';

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true); // use for song lookup

    useEffect(() => {
        // handleRedirectResult();
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, [])

    async function initializeUser(user) {
        if (user) {
            setCurrentUser({ ...user });
            console.log(user);
            setUserLoggedIn(true);
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    // async function handleRedirectResult() {
    //     try {
    //         const result = await getRedirectResult(auth);
    //         console.log(result);
    //         if (result?.user) {
    //             console.log('Redirect Sign-In Success:', result.user);
    //             setCurrentUser({ ...result.user });
    //             setUserLoggedIn(true);
    //         }
    //     } catch (error) {
    //         console.error('Error handling redirect:', error.message);
    //     }
    // }

    const value = {
        currentUser,
        userLoggedIn,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}