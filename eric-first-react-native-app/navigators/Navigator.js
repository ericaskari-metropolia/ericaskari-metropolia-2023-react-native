import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../views/Home';
import { Profile } from '../views/Profile';
import { Single } from '../views/Single';
import { Login } from '../views/Login';
import { useMainContext } from '../contexts/MainContext';
import { Register } from '../views/Register';
import { Upload } from '../views/Upload';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabScreen = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Upload" component={Upload} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};

const StackScreen = () => {
    const { userProfile } = useMainContext();
    return (
        <Stack.Navigator>
            {userProfile && (
                <>
                    <Stack.Screen
                        name="Tabs"
                        component={TabScreen}
                    ></Stack.Screen>
                    <Stack.Screen
                        name="Single"
                        component={Single}
                    ></Stack.Screen>
                </>
            )}
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
    );
};

export const Navigator = () => {
    return (
        <NavigationContainer>
            <StackScreen />
        </NavigationContainer>
    );
};
