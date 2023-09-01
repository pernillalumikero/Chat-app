import React from 'react'
import { StyleSheet, Image, Text, KeyboardAvoidingView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Login';
import Register from '../pages/Register';

const Stack = createStackNavigator()

export default function AuthNavigator() {

    function LogoTitle() {
        return (
            <Image
                style={{ width: 70, height: 30 }}
                source={require('../../assets/img/pow-158867_640.png')}
            />
        );
    }

    function MainTitle() {
        return (
            <Text style={styles.slogan}>
                <Text style={styles.orange}>P</Text>ower
                <Text style={styles.orange}> o</Text>f
                <Text style={styles.orange}> w</Text>ords
                <Text style={styles.orange}> chat</Text>-app
            </Text>
        )
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#323232',
                    },
                    headerTintColor: '#fff',
                    headerBackTitleVisible: false,
                    headerTitleStyle: { fontFamily: 'Bangers', fontSize: 30 }
                }}>
                <Stack.Screen
                    name="Log in"
                    component={Login}
                    options={{ headerTitle: (props) => <MainTitle {...props} /> }} />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
                />
            </Stack.Navigator>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
      },
    slogan: {
        color: 'white',
        fontFamily: 'Bangers',
        fontSize: 30
    },
    orange: {
        color: 'orange'
    }
})