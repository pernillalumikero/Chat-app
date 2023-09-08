import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Modal } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { ProfileContext } from '../context/ProfileContext';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function Profile() {

    const { handleLogout, userName, accessToken } = useContext(AuthContext)
    const { setPicture, img, profilePic } = useContext(ProfileContext)
    const [display, setDisplay] = useState('flex')
    const [user, setUser] = useState({})
    const [modalVisible, setModalVisible] = useState(false);
    const [deleteModalVisible, setdeleteModalVisible] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        firstname: '',
        lastname: ''
    })


    //fetching userInfo at componentdidmount with useEffect
    const fetchUser = async () => {
        try {
            const response = await fetch('https://chat-api-with-auth.up.railway.app/users', {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            const data = await response.json();
            setUser(data.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    const handleFirstName = (value) => {

        let newObject = {
            ...updatedUser,
            firstname: value
        }
        setUpdatedUser(newObject)
    }

    const handleLastName = (value) => {

        let newObject = {
            ...updatedUser,
            lastname: value
        }
        setUpdatedUser(newObject)
    }

    const updateUser = async () => {
        try {
            await fetch('https://chat-api-with-auth.up.railway.app/users', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + accessToken
                },
                body: JSON.stringify(updatedUser)
            })
            setDisplay('block')
            setModalVisible(true)

        } catch (error) {
            console.log(error)
        }
    }

    const deleteUser = async () => {
        try {
            await fetch('https://chat-api-with-auth.up.railway.app/users', {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
        } catch (error) {
            console.log(error)
        }
        handleLogout()
    }

    //Function to choose image from phone image library and upload to API
    // const pickImage = async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.Images
    //     })

    //     if (!result.canceled) {
    //         setPicture(result.assets[0])
    //         try {
    //             const response = await FileSystem.uploadAsync('https://chat-api-with-auth.up.railway.app/users', result.assets[0].uri, {
    //                 httpMethod: 'PATCH',
    //                 uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    //                 fieldName: 'ProfileImage',
    //                 headers: {
    //                     'Authorization': 'Bearer ' + accessToken
    //                 },
    //             })
    //             console.log(JSON.stringify(response, null, 4));
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }
    // }

    return (
        //sending display to Stylesheet as a variable to avoid keyboard hiding input
        <View style={styles.container}>
            <Text style={styles.username}>{userName}</Text>
            <Image
                style={styles.profileImg(display)}
                source={profilePic
                    ? { uri: profilePic.uri }
                    : { uri: img }} />
            <TextInput
                style={styles.input}
                placeholder={user.firstname 
                    ? user.firstname 
                    : 'First name'}
                onPressIn={() => setDisplay('none')}
                onChangeText={(value) => handleFirstName(value)} />
            <TextInput
                style={styles.input}
                placeholder={user.lastname ? user.lastname : 'Last name'}
                onPressIn={() => setDisplay('none')}
                onEndEditing={() => setDisplay('flex')}
                onChangeText={(value) => handleLastName(value)} />
            <View style={styles.iconHolder}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => updateUser()}>
                    <FontAwesome5 name="edit" size={24} color="black" />
                    <Text>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => setdeleteModalVisible(true)}>
                    <FontAwesome5 name="trash-alt" size={24} color="black" />
                    <Text>Delete</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleLogout()}>
                    <Feather name="log-out" size={24} color="black" />
                    <Text>Log out</Text>
                </TouchableOpacity>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Good job!</Text>
                        <Text style={styles.modalText}>Your profile has been updated.</Text>
                        <TouchableOpacity
                            style={styles.okButton}
                            onPress={() => setModalVisible(false)}>
                            <Text style={styles.text}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="slide"
                transparent={true}
                visible={deleteModalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Delete profile?</Text>
                        <Text style={styles.modalText}>Are you sure you want to delete your profile?</Text>
                        <TouchableOpacity
                            style={styles.okButton}
                            onPress={() => setdeleteModalVisible(false)}>
                            <Text style={styles.text}>No!</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.yesButton}
                            onPress={() => deleteUser()}>
                            <Text style={styles.text}>Yes...</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE9D8',
        alignItems: 'center',
        paddingTop: 30,
    },
    username: {
        fontFamily: 'Bangers',
        fontSize: 35
    },
    profileImg: display => ({
        display: display,
        margin: 20,
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 3
    }),
    input: {
        backgroundColor: 'white',
        padding: 15,
        borderWidth: 3,
        borderColor: 'black',
        width: '50%',
        marginBottom: 20
    },
    iconHolder: {
        flexDirection: 'row',
        gap: 30
    },
    button: {
        alignItems: 'center',

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
    },
    text: {
        fontFamily: 'Bangers',
        fontSize: 25,
    },
    yesButton: {
        backgroundColor: '#FFCD91',
        borderWidth: 3,
        width: '60%',
        alignItems: 'center',
        padding: 10,
        marginTop: 15,
        paddingHorizontal: 30
    }
});
