import React, { useContext } from 'react'
import { View, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { ProfileContext } from '../context/ProfileContext';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePreview() {

    const { picture, setPicture, setProfilePic } = useContext(ProfileContext)
    const navigation = useNavigation();

    // const { accessToken } = useContext(AuthContext)
    
    // const uploadImage = async () => {
    //     try {
    //         const response = await FileSystem.uploadAsync('https://chat-api-with-auth.up.railway.app/users', picture.uri, {
    //             httpMethod: 'PATCH',
    //             uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    //             fieldName: 'ProfileImage',
    //             headers: {
    //                 'Authorization': 'Bearer ' + accessToken
    //             },
    //         })
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const savePicture = async () => {
        setProfilePic(picture)
        try {
            const asset = await MediaLibrary.createAssetAsync(picture.uri)
            const album = await MediaLibrary.getAlbumAsync('Expo')
            if (album == null) {
                await MediaLibrary.createAlbumAsync('Expo', asset, false)
            } else {
                await MediaLibrary.addAssetsToAlbumAsync(asset, album.id, false)
            }
            setPicture(null)
            navigation.navigate('Profile')
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: picture.uri }} style={styles.imageContainer}>
                <View style={styles.buttonBottomContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setPicture(null)}>
                        <MaterialCommunityIcons name="trash-can" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => savePicture()}>
                        <MaterialCommunityIcons name="check-bold" size={40} color="white" />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center'
    },
    imageContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'flex-end',
        paddingVertical: 20,
    },
    buttonBottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
})