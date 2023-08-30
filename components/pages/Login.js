import React, { useState, useContext } from 'react'
import { ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import Banner from '../small-components/Banner';

export default function Login({ navigation }) {

  const { userName, setUserName } = useContext(AuthContext)
  const { password, setPassword } = useContext(AuthContext)
  const { setAccessToken } = useContext(AuthContext)

  const fetchToken = async () => {

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

    setAccessToken(data.data.accessToken)

  } catch(error) {
    console.log(error)
  }
  }


  return (
    <>
      <ImageBackground source={require('../../assets/img/background.png')} resizeMode="cover" style={styles.background} />
      <View style={styles.login}>
        <View style={styles.signinField}>
          <Text style={styles.signin}>Sign In</Text>
          <TextInput
            style={styles.input}
            placeholder="UserName"
            onChangeText={(value) => setUserName(value)}>
          </TextInput>
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(value) => setPassword(value)}>
          </TextInput>
          <TouchableOpacity style={styles.button}
            onPress={() => fetchToken()}>
            <Text style={styles.loginText}>Log in</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.signinField2}>
          <TouchableOpacity style={styles.speechbubble} onPress={() => navigation.navigate('Register')}>
            <ImageBackground source={require('../../assets/img/speech-bubble.png')} resizeMode="cover" style={styles.speechbubbleImage}>
              <Text style={styles.speechBubbleText}>New here?</Text>
              <Text style={styles.registerText}>Register!</Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  background: {
    flex: 0.5,
    width: '100%'
  },
  signin: {
    color: 'white',
    fontFamily: 'Bangers',
    fontSize: 30,
    paddingBottom: 10,
  },
  login: {
    flex: 0.5,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#323232',
    justifyContent: 'space-around'
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderWidth: 3,
    borderColor: 'black',
    marginBottom: 15,
  },
  signinField: {
    width: '50%',
    justifyContent: 'center',
    marginLeft: 20
  },
  signinField2: {
    width: '50%',
  },
  button: {
    backgroundColor: 'orange',
    borderWidth: 3,
    width: '60%',
    alignItems: 'center',
    marginLeft: 30

  },
  loginText: {
    fontFamily: 'Bangers',
    fontSize: 25,
  },
  speechbubble: {
    top: '50%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  speechbubbleImage: {
    width: 170,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center'
  },
  speechBubbleText: {
    fontFamily: 'Bangers',
    fontSize: 25,
    paddingRight: 10
  },
  registerText: {
    fontFamily: 'Bangers',
    color: 'orange',
    fontSize: 25,
    paddingRight: 10,
    paddingBottom: 25
  }

});
