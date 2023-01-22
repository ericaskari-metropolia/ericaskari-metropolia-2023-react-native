import React, { useContext, useEffect } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Login = ({ navigation }) => {
    const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);

    useEffect(() => {
        if (isLoggedIn) {
            navigation.navigate('Tabs');
            (async () => {
                await AsyncStorage.setItem('userToken', 'abc');
            })();
        }
    }, [isLoggedIn]);

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <Button
                title="Sign in!"
                onPress={() => {
                    setIsLoggedIn(true);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

Login.propTypes = {
    navigation: PropTypes.object,
};
