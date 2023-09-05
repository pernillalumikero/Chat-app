import React, {useContext} from 'react'
import { View, ImageBackground, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import { AuthContext } from '../context/AuthContext';

export default function ImagePreview({ picture, setPicture }) {

    const { accessToken } = useContext(AuthContext)

    // const savePicture = async () => {
    //     try {
    //         const asset = await MediaLibrary.createAssetAsync(picture.uri)
    //         const album = await MediaLibrary.getAlbumAsync('Expo')
    //         if (album == null) {
    //             await MediaLibrary.createAlbumAsync('Expo', asset, false)
    //         } else {
    //             await MediaLibrary.addAssetsToAlbumAsync(asset, album.id, false)
    //         }
    //         setPicture(null)

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: picture }} style={styles.imageContainer}>
                <View style={styles.buttonBottomContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setPicture(null)}>
                        <MaterialCommunityIcons name="trash-can" size={40} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => console.log(picture)}>
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