import React, { useContext, useEffect } from 'react';
import { Button, SafeAreaView, StyleSheet, Text } from 'react-native';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Profile = ({ navigation }) => {
    const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);

    useEffect(() => {
        if (!isLoggedIn) {
            navigation.navigate('Login');
            (async () => {
                await AsyncStorage.clear();
            })();
        }
    }, [isLoggedIn]);

    const logout = () => {
        setIsLoggedIn(null);
    };
    return (
        <SafeAreaView style={styles.container}>
            <Text>Profile</Text>
            <Text>{JSON.stringify(isLoggedIn, undefined, 2)}</Text>
            <Button title={'Logout'} onPress={logout} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
});
