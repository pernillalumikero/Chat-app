import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Chat from '../pages/Chat';
import Profile from '../pages/Profile';
import { Image, KeyboardAvoidingView, StyleSheet } from 'react-native';

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
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <Drawer.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#323232',
                    },
                    headerTintColor: '#fff',
                }}>
                <Drawer.Screen
                    name="Chat"
                    component={Chat}
                    options={{ headerTitle: (props) => <LogoTitle {...props} /> }} />
                <Drawer.Screen 
                    name="Settings" 
                    component={Profile} 
                    options={{ headerTitle: (props) => <LogoTitle {...props} /> }}/>
            </Drawer.Navigator>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
    },
  })