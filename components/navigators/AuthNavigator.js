import React from 'react'
import { StyleSheet, Image } from 'react-native';
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

    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#323232',
                },
                headerTintColor: '#fff',
            }}>
            <Stack.Screen
                name="Log in"
                component={Login}
                options={{ title: '', headerShown: false }} />
            <Stack.Screen
                name="Register"
                component={Register}

                options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
            />
        </Stack.Navigator>
    );
}