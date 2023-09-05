import React, { useState, useEffect, useRef } from 'react'
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { View, StyleSheet, TouchableOpacity, Text, Image, ImageBackground } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import ImagePreview from './ImagePreview';

export default function CameraApp() {

    const [hasCameraPermission, setHasCameraPermission] = useState(null)
    const [hasMediaPermission, setHasMediaPermission] = useState(null)

    const [type, setType] = useState(CameraType.back)

    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }

    const [flash, setFlash] = useState(FlashMode.off)

    function toggleFlash() {
        setFlash(current => (current === FlashMode.off ? FlashMode.on : FlashMode.off));
    }

    const cameraRef = useRef(null)

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const picture = await cameraRef.current.takePictureAsync()
                setPicture(picture.uri)
            } catch (error) {
                console.log(error)
            }
        }
    }

    const [picture, setPicture] = useState(null)

    useEffect(() => {
        (async () => {
            const CameraPermissions = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(CameraPermissions.status == 'granted')
            const MediaPermissions = await MediaLibrary.requestPermissionsAsync();
            setHasMediaPermission(MediaPermissions.status == 'granted')
        })();
    });

    if (hasCameraPermission == null || hasMediaPermission == null) {
        return (<View><Text>Waiting for permissions...</Text></View>)
    }

    if (hasCameraPermission == false || hasMediaPermission == false) {
        return (<View><Text>Permissions denied</Text></View>)
    }

    return (
        <>
            {picture
                ? <ImagePreview picture={picture} setPicture={setPicture} />
                : <View style={styles.container}>
                    <Camera
                        style={styles.cameraContainer}
                        type={type}
                        flashMode={flash}
                        ref={cameraRef}>
                        <View style={styles.buttonTopContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => toggleCameraType()}>
                                <FontAwesome name='refresh' size={24} color='white' />
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => toggleFlash()}>
                                {flash == FlashMode.on
                                    ? <MaterialIcons name="flash-on" size={24} color="white" />
                                    : <MaterialIcons name="flash-off" size={24} color="white" />
                                }
                            </TouchableOpacity>
                        </View>
                        <View style={styles.buttonBottomContainer}>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => takePicture()}>
                                <MaterialCommunityIcons name="camera-iris" size={40} color="white" />
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>}
        </>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center'
    },
    cameraContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    buttonTopContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 20,
        paddingHorizontal: 20
    },
    buttonBottomContainer: {
        alignItems: 'center',
    }
})
