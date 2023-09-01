import React, { createContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [accessToken, setAccessToken] = useState(null)
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [loginErrorMessage, setLoginErrorMessage] = useState('')

    useEffect(() => {
        isLoggedIn()
    }, [accessToken])

    const handleLogin = async () => {

        try {
        const response = await fetch('https://chat-api-with-auth.up.railway.app/auth/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            username: userName,
            password: password
          })
        })
        const data = await response.json()

        setLoginErrorMessage(data.message)
        setAccessToken(data.data.accessToken)
        
        await AsyncStorage.setItem('accessToken', data.data.accessToken)
        await AsyncStorage.setItem('userName', userName)

      } catch(error) {
        console.log(error)
      }
      }

    const handleLogout = async () => {
        
        try {
            await AsyncStorage.removeItem('accessToken')
            setAccessToken(null)
            await AsyncStorage.removeItem('userName')
            setUserName('')
        }
        catch(error){
            console.log(error)
        }
    }

    const isLoggedIn = async () => {

        try {
            const token = await AsyncStorage.getItem('accessToken')
            setAccessToken(token)
            const name = await AsyncStorage.getItem('userName')
            setUserName(name)
        }
        catch(error){
            console.log(error)
        }
    }

    return (
        <AuthContext.Provider value={{accessToken, setAccessToken, handleLogin, handleLogout, isLoggedIn, userName, setUserName, password, setPassword, loginErrorMessage}}>
            {children}
        </AuthContext.Provider>
    )
}