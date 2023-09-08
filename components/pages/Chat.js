import React, { useEffect, useState, useContext } from 'react'
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Modal, Image } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import Popup from '../small-components/Popup';
import ChatMessage from '../small-components/ChatMessage';
import { ProfileContext } from '../context/ProfileContext';
import * as FileSystem from 'expo-file-system';


export default function Chat() {

    const { userName, accessToken } = useContext(AuthContext)
    const { picture, img } = useContext(ProfileContext)

    const [messages, setMessages] = useState([]);
    const [enteredText, setEnteredText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [messageId, setMessageId] = useState(undefined)

    const anonymousImage = 'https://cdn.pixabay.com/photo/2022/11/20/17/12/dog-7604760_1280.jpg'

    //fetch all messages from API 
    const fetchMessages = async () => {
        try {
            const response = await fetch('https://chat-api-with-auth.up.railway.app/messages/', {
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            })
            const data = await response.json();
            console.log(data.data[2].user.image)
            setMessages(data.data.reverse())


        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [])

    const handleLongClick = (item) => {
        setModalVisible(true)
        setMessageId(item)
    }

    //When user sends message - post to API and update messages, empthy input
    const handleSubmit = () => {
        fetch('https://chat-api-with-auth.up.railway.app/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken
            },
            body: JSON.stringify({
                content: enteredText
            })
        })
        fetchMessages()
        setEnteredText('')
    }

    //delete choosen message by ID, update messages and hide modal
    const handleDelete = async (id) => {

        try {
            await fetch('https://chat-api-with-auth.up.railway.app/messages/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                },
            })
        } catch (error) {
            console.log(error)
        }
        fetchMessages()
        setModalVisible(!modalVisible)
    }

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.list}
                inverted={true}
                data={messages}
                renderItem={({ item }) =>
                    <>
                        {item.user != null && item.user.username == userName
                            ? <View style={styles.userContainer}>
                                <TouchableOpacity
                                    style={styles.usermessage}
                                    activeOpacity={0.6}
                                    onLongPress={() => handleLongClick(item._id)}>
                                    <ChatMessage content={item.content} date={item.date} />
                                </TouchableOpacity>
                            </View>
                            : item.user != null
                                ? <View style={styles.messageContainer}>

                                    {item.user.image != undefined
                                        ? <>
                                            <Image style={styles.img} source={{ uri: item.user.image }}></Image>
                                        </>
                                        : <Image style={styles.img} source={{ uri: img }}></Image>}
                                    <View style={styles.message}>
                                        <Text style={styles.user}>{item.user.username}</Text>
                                        <ChatMessage content={item.content} date={item.date} />
                                    </View>
                                </View>
                                : <View style={styles.messageContainer}>
                                    <Image style={styles.img} source={{ uri: anonymousImage }}></Image>
                                    <View style={styles.message}>
                                        <Text style={styles.user}>Anonymous</Text>
                                        <ChatMessage content={item.content} date={item.date} />
                                    </View>
                                </View>}
                    </>
                }
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <Popup setModalVisible={setModalVisible} messageId={messageId} handleDelete={handleDelete} />
            </Modal>
            <View style={styles.inputview}>
                <TextInput
                    style={styles.input}
                    multiline={true}
                    value={enteredText}
                    onChangeText={(value) => setEnteredText(value)} />
                <TouchableOpacity onPress={() => handleSubmit()}>
                    <MaterialCommunityIcons name="send-circle" size={40} color="orange" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFE9D8',
    },
    list: {
        flex: 1,
        width: '100%',
    },
    usersView: {
        height: 100,
        backgroundColor: 'black',
        borderBottomColor: 'black',
        borderBottomWidth: 1
    },
    message: {
        backgroundColor: 'white',
        borderWidth: 3,
        maxWidth: '65%',
        padding: 10,
        borderRadius: 10,
        marginVertical: 3
    },
    usermessage: {
        backgroundColor: '#E0FFFF',
        borderWidth: 3,
        maxWidth: '65%',
        padding: 10,
        borderRadius: 10,
        marginVertical: 3,
        marginRight: 10
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        width: '80%',
        borderWidth: 3,
        borderColor: 'black',
        marginVertical: 10,
        marginLeft: 10,
        fontFamily: 'ComicNeue',
        fontSize: 18,
        justifyContent: 'center'
    },
    inputview: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#323232',
        width: '100%'
    },
    user: {
        fontFamily: 'Bangers',
        fontSize: 18
    },
    bottomView: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    modalView: {
        flexDirection: 'row',
        backgroundColor: '#323232',
        padding: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    modalText: {
        color: 'red'
    },
    button: {
        backgroundColor: 'green'
    },
    img: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'black',
        alignSelf: 'flex-end',
        marginBottom: 10,
        marginHorizontal: 3,
        resizeMode: 'cover'
    },
    userContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
    },
    messageContainer: {
        flexDirection: 'row',
    }
});
