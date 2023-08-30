import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import Chat from '../pages/Chat'
import AppNavigator from './AppNavigator'
import AuthNavigator from './AuthNavigator'

export default function RootNavigator() {

    const { accessToken } = useContext(AuthContext)

    return (
        <>
            {accessToken == null
                ? <AuthNavigator />
                : <AppNavigator />}
        </>
    )
}