import React, { useContext, useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function Profile() {

    const { handleLogout, userName, accessToken } = useContext(AuthContext)
    const [margin, setMargin] = useState(0)
    const [user, setUser] = useState({})
    const [updatedUser, setUpdatedUser] = useState({
        firstname: '',
        lastname: ''
    })

    const img = 'https://cdn.pixabay.com/photo/2023/04/21/15/04/pop-art-7942061_1280.jpg'

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

    return (
        //sending margin to Stylesheet as a variable to avoid keyboard hiding input
        <View style={styles.container(margin)}>
            <Text style={styles.username}>{userName}</Text>
            <Image style={styles.profileImg} src={img} />
            <TextInput
                style={styles.input}
                placeholder={user.firstname ? user.firstname : 'First name'}
                onPressIn={() => setMargin(-40)}
                onEndEditing={() => setMargin(0)}
                onChangeText={(value) => handleFirstName(value)} />
            <TextInput
                style={styles.input}
                placeholder={user.lastname ? user.lastname : 'Last name'}
                onPressIn={() => setMargin(-100)}
                onEndEditing={() => setMargin(0)}
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
                    onPress={() => deleteUser()}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    container: margin => ({
        flex: 1,
        backgroundColor: '#FFE9D8',
        alignItems: 'center',
        paddingTop: 30,
        marginTop: margin
    }),
    username: {
        fontFamily: 'Bangers',
        fontSize: 35
    },
    profileImg: {
        margin: 20,
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 3
    },
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

    }
});
