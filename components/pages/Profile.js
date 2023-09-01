import React, { useContext } from 'react'
import { View, Button } from 'react-native'
import { AuthContext } from '../context/AuthContext'

export default function Profile() {

    const { handleLogout } = useContext(AuthContext)

  return (
    <View>
      <Button title='Log out' onPress={() => handleLogout()} />
    </View>
  )
}
