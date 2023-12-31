import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../pages/Profile';
import { FontAwesome5 } from '@expo/vector-icons';
import { KeyboardAvoidingView, StyleSheet } from 'react-native';
import CameraApp from '../pages/CameraApp';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior='height'>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: 'orange',
                    tabBarInactiveTintColor: 'white',
                    tabBarStyle: {
                        backgroundColor: '#323232'
                    },
                    tabBarShowLabel: false
                }}>
                <Tab.Screen
                    name="Profile"
                    component={Profile}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="user-astronaut" size={30} color={color} />
                        ),
                    }} />
                <Tab.Screen
                    name="Camera"
                    component={CameraApp}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <FontAwesome5 name="camera-retro" size={30} color={color} />
                        ),
                    }} />
            </Tab.Navigator>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
    },
})