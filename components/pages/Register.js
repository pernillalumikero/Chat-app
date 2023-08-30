import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native'

export default function Register() {
  return (
    <>
    <ImageBackground source={require('../../assets/img/register.jpg')} resizeMode="cover" style={styles.background}>
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
      <TextInput style={styles.input} placeholder='UserName'></TextInput>
      <Text style={styles.error}></Text>
      <TextInput style={styles.input} placeholder='Password'></TextInput>
      <TouchableOpacity style={styles.button} onPress={() => console.log('Registered')}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
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
    padding: 10,
    marginLeft: '20%',
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
  background: {
    flex: 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
  },
  error: {
    color: 'red',
    marginBottom: 15,
    marginLeft: 10
  }
});