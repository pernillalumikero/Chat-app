import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { AuthContext } from '../context/AuthContext'
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

export default function Profile() {

    const [margin, setMargin] = useState(0)

    const { handleLogout, userName } = useContext(AuthContext)
    const img = 'https://cdn.pixabay.com/photo/2022/11/20/17/12/dog-7604760_1280.jpg'

    return (
        <View style={styles.container(margin)}>
            <Text style={styles.username}>{userName}</Text>
            <Image style={styles.profileImg} src={img} />
            <TextInput
                style={styles.input}
                placeholder='First name'
                onPressIn={() => setMargin(-40)}
                onEndEditing={() => setMargin(0)} />
            <TextInput
                style={styles.input}
                placeholder='Last name'
                onPressIn={() => setMargin(-100)}
                onEndEditing={() => setMargin(0)} />
            <View style={styles.iconHolder}>
                <TouchableOpacity style={styles.button}>
                    <FontAwesome5 name="edit" size={24} color="black" />
                    <Text>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
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
