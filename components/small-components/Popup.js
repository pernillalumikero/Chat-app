import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

export default function Popup({ messageId, setModalVisible, handleDelete }) {

    return (
        <View style={styles.bottomView}>
            <View style={styles.modalView}>
                <TouchableOpacity
                    onPress={() => handleDelete(messageId)}>
                    <MaterialCommunityIcons name="trash-can" size={30} color="orange" />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => setModalVisible(false)}>
                    <MaterialCommunityIcons name="close-box" size={30} color="white" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
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
    }
})