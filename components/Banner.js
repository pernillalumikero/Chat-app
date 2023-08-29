import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default function Banner() {
    return (
        <View style={styles.banner}>
            <Text style={styles.slogan}>
                <Text style={styles.orange}>P</Text>ower
                <Text style={styles.orange}> o</Text>f
                <Text style={styles.orange}> w</Text>ords
                <Text style={styles.orange}> chat</Text>-app
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    banner: {
        backgroundColor: '#323232',
        paddingVertical: 25,
        width: '100%',
        alignItems: 'center'
    },
    slogan: {
        color: 'white',
        fontSize: 30,
        fontFamily: 'Bangers'
    },
    orange: {
        color: 'orange'
    },
})
