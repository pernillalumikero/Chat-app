import React, { useEffect, useState, useContext } from 'react'
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import Popup from '../small-components/Popup';


export default function Chat() {

    const { userName } = useContext(AuthContext)

    const [messages, setMessages] = useState([]);
    const [enteredText, setEnteredText] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [messageId, setMessageId] = useState(undefined)

    const handleLongClick = (item) => {
        setModalVisible(true)
        let clickedMessageId = item
        setMessageId(clickedMessageId)
    }

    const handleSubmit = () => {
        fetch('https://chat-api-with-auth.up.railway.app/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU3MTY3YTk3MzJmNmJiNmI2NTUxNDMiLCJ1c2VybmFtZSI6IkphbmUgRG9lIiwiZGF0ZSI6IjIwMjMtMDgtMjRUMDg6MzY6MTAuOTY0WiIsImlhdCI6MTY5Mjg2NjI4NH0.I7-0nZxihadG4XTeb436ZBNYig0ENJEzwjyNTxT9d9A'
            },
            body: JSON.stringify({
                content: enteredText
            })
        })
        fetchMessages()
        setEnteredText('')
    }

    const handleDelete = async (id) => {
        console.log(id)
        try {
            await fetch('https://chat-api-with-auth.up.railway.app/messages/' + id, {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU3MTY3YTk3MzJmNmJiNmI2NTUxNDMiLCJ1c2VybmFtZSI6IkphbmUgRG9lIiwiZGF0ZSI6IjIwMjMtMDgtMjRUMDg6MzY6MTAuOTY0WiIsImlhdCI6MTY5Mjg2NjI4NH0.I7-0nZxihadG4XTeb436ZBNYig0ENJEzwjyNTxT9d9A'
                },
            })
        } catch (error) {
            console.log(error)
        }
        fetchMessages()
        setModalVisible(!modalVisible)
    }

    useEffect(() => {
        fetchMessages()
    }, [])

    const fetchMessages = async () => {
        try {
            const response = await fetch('https://chat-api-with-auth.up.railway.app/messages/', {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU3MTY3YTk3MzJmNmJiNmI2NTUxNDMiLCJ1c2VybmFtZSI6IkphbmUgRG9lIiwiZGF0ZSI6IjIwMjMtMDgtMjRUMDg6MzY6MTAuOTY0WiIsImlhdCI6MTY5Mjg2NjI4NH0.I7-0nZxihadG4XTeb436ZBNYig0ENJEzwjyNTxT9d9A'
                }
            })
            const data = await response.json();
            setMessages(data.data.reverse())

        } catch (error) {
            console.log(error)
        }
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
                            ? <>
                                <TouchableOpacity
                                    style={styles.usermessage}
                                    activeOpacity={0.6}
                                    onLongPress={() => handleLongClick(item._id)}>
                                    <Text style={styles.content}>{item.content}</Text>
                                    <Text style={styles.id}>{item._id}</Text>
                                </TouchableOpacity>
                            </>
                            : item.user != null
                                ? <>
                                    <View style={styles.message}>
                                        <Text style={styles.user}>{item.user.username}</Text>
                                        <Text style={styles.content}>{item.content}</Text>
                                        <Text style={styles.id}>{item._id}</Text>
                                    </View>
                                </>
                                : null}
                    </>}
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
                    <MaterialCommunityIcons name="send-circle" size={50} color="orange" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFE9D8',
        paddingTop: 10,
        justifyContent: 'center'
    },
    list: {
        flex: 1,
        width: '100%'
    },
    message: {
        backgroundColor: 'white',
        borderWidth: 3,
        padding: 10,
        marginVertical: 2,
        marginLeft: 10,
        marginRight: '30%',
        borderRadius: 10
    },
    usermessage: {
        backgroundColor: '#E0FFFF',
        borderWidth: 3,
        padding: 10,
        marginVertical: 2,
        marginRight: 10,
        marginLeft: '30%',
        borderRadius: 10
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
    },
    user: {
        fontFamily: 'Bangers',
        fontSize: 18
    },
    content: {
        fontFamily: 'ComicNeue',
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
    id: {
        color: 'red'
    },
    button: {
        backgroundColor: 'green'
    }


});