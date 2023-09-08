import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground, Alert, Modal, Touchable } from 'react-native'
import { AuthContext } from '../context/AuthContext'

export default function Register({ navigation }) {

  const [newUser, setNewUser] = useState({
    username: '',
    password: ''
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [flex, setFlex] = useState('block')
  const [modalVisible, setModalVisible] = useState(false);

  const registerUser = async () => {
    try {
      const response = await fetch('https://chat-api-with-auth.up.railway.app/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      })
      const data = await response.json()
      setErrorMessage(data.message)

      if (data.message == 'Successfully registered') {
        setErrorMessage('')
        setModalVisible(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const redirectToLogin = () => {
    setModalVisible(false)
    navigation.navigate('Log in')
  }

  const handleName = (value) => {

    let newObject = {
      ...newUser,
      username: value
    }
    setNewUser(newObject)
  }

  const handlePassword = (value) => {

    let newObject = {
      ...newUser,
      password: value
    }
    setNewUser(newObject)
  }

  return (
    <>
      <ImageBackground source={require('../../assets/img/register.jpg')} resizeMode="cover" style={styles.background(flex)}>
        <Text style={styles.registerLetters}>R</Text>
        <Text style={styles.registerLetters}>E</Text>
        <Text style={styles.registerLetters}>G</Text>
        <Text style={styles.registerLetters}>I</Text>
        <Text style={styles.registerLetters}>S</Text>
        <Text style={styles.registerLetters}>T</Text>
        <Text style={styles.registerLetters}>E</Text>
        <Text style={styles.registerLetters}>R</Text>
      </ImageBackground>
      <View style={styles.container}>
        <Text style={styles.text}>Register here</Text>
        <TextInput
          style={styles.input}
          placeholder='UserName'
          onPressIn={() => setFlex('none')}
          onEndEditing={() => setFlex('block')}
          onChangeText={(value) => handleName(value)}>
        </TextInput>
        <Text style={styles.error}>{errorMessage}</Text>
        <TextInput
          style={styles.input}
          placeholder='Password'
          onPressIn={() => setFlex('none')}
          onEndEditing={() => setFlex('block')}
          secureTextEntry={true}
          onChangeText={(value) => handlePassword(value)}>
        </TextInput>
        <TouchableOpacity style={styles.button} onPress={() => registerUser()}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Congratulations!</Text>
              <Text style={styles.modalText}>You have successfully registered.</Text>
              <TouchableOpacity
                style={styles.okButton}
                onPress={() => redirectToLogin()}>
                <Text style={styles.registerText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: '20%',
    justifyContent: 'center',
    backgroundColor: '#323232'
  },
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderWidth: 3,
    borderColor: 'black',
    fontFamily: 'ComicNeue',
    fontSize: 15
  },
  button: {
    backgroundColor: 'orange',
    borderWidth: 3,
    width: '60%',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    marginTop: 15
  },
  registerLetters: {
    fontFamily: 'Bangers',
    fontSize: 30,
    marginLeft: '85%'
  },
  registerText: {
    fontFamily: 'Bangers',
    fontSize: 25,
  },
  text: {
    color: 'white',
    fontFamily: 'Bangers',
    fontSize: 35,
    paddingBottom: 15
  },
  background: flex => ({
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    display: flex
  }),
  error: {
    color: 'red',
    marginBottom: 15,
    marginLeft: 10
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    borderWidth: 3,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'ComicNeue',
    fontSize: 20
  },
  okButton: {
    backgroundColor: 'orange',
    borderWidth: 3,
    width: '60%',
    alignItems: 'center',
    padding: 10,
    marginTop: 15,
    paddingHorizontal: 30
  }
});