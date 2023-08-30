import React, { createContext, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [accessToken, setAccessToken] = useState(null)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')

    return (
        <AuthContext.Provider value={{accessToken, setAccessToken, userName, setUserName, password, setPassword}}>
            {children}
        </AuthContext.Provider>
    )
}