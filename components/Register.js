import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ImageBackground } from 'react-native'
import Banner from './Banner';

export default function Register() {
  return (
    <>
    <Banner />
    <ImageBackground source={require('../assets/img/register.jpg')} resizeMode="cover" style={styles.background}>
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
      <TextInput style={styles.input} placeholder='Password'></TextInput>
      <TouchableOpacity style={styles.button}>
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
    marginBottom: 15,
    fontFamily: 'ComicNeue',
    fontSize: 15
  },
  button: {
    backgroundColor: 'orange',
    borderWidth: 3,
    width: '60%',
    alignItems: 'center',
    padding: 10,
    marginLeft: '20%'
  },
  registerLetters: {
    fontFamily: 'Bangers',
    fontSize: 30,
    marginLeft: 310
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
});