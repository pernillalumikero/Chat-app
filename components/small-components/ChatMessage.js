import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function ChatMessage({content, date}) {
    return (
        <View>
            <Text style={styles.content}>{content}</Text>
            <Text style={styles.date}>
                {new Date(date).toLocaleDateString([], { dateStyle: 'medium' })}
                &nbsp;
                {new Date(date).toLocaleTimeString([], { timeStyle: 'short' })}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
content: {
    fontFamily: 'ComicNeue',
    fontSize: 18
},
date: {
    fontFamily: 'ComicNeue',
    alignSelf: 'flex-end'
}
})
