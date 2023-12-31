import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Chat from '../pages/Chat';
import Profile from '../pages/Profile';
import { Image, KeyboardAvoidingView, StyleSheet } from 'react-native';
import BottomNavigation from './BottomNavigation';
import { ProfileProvider } from '../context/ProfileContext';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {

    function LogoTitle() {
        return (
            <Image
                style={{ width: 70, height: 30 }}
                source={require('../../assets/img/pow-158867_640.png')}
            />
        );
    }

    return (
        <ProfileProvider>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}>
                <Drawer.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: '#323232',
                        },
                        headerTintColor: '#fff',
                        drawerStyle: {
                            backgroundColor: '#323232',
                            width: '40%',
                        },
                        drawerActiveTintColor: 'orange',
                        drawerInactiveTintColor: '#fff',

                    }}>
                    <Drawer.Screen
                        name="Chat"
                        component={Chat}
                        options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
                    <Drawer.Screen
                        name="Settings"
                        component={BottomNavigation}
                        options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
                </Drawer.Navigator>
            </KeyboardAvoidingView>
        </ProfileProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
})