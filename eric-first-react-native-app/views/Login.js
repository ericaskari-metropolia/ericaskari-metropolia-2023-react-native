import React, { useCallback, useContext, useEffect } from 'react';
import {
    Button,
    Dimensions,
    Platform,
    StyleSheet,
    TextInput,
    ToastAndroid,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthentication } from '../hooks/ApiHooks';
import { Controller, useForm } from 'react-hook-form';
import { TextInputError } from '../components/TextInputError';
import AlertIOS from 'react-native/Libraries/Alert/Alert';

export const Login = ({ navigation }) => {
    const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
    const { postLogin } = useAuthentication();
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitted, isDirty },
    } = useForm({
        defaultValues: {
            username: 'ericaska',
            password: 'ericaskaa',
        },
    });

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }
        const { token, user } = isLoggedIn;
        navigation.navigate('Tabs');
        (async () => {
            await AsyncStorage.setItem('userToken', token);
            await AsyncStorage.setItem('userProfile', JSON.stringify(user));
        })();
    }, [isLoggedIn]);

    const onSubmit = useCallback(async ({ username, password }) => {
        const { body, error } = await postLogin({
            username,
            password,
        });
        console.log(body);
        if (error) {
            if (Platform.OS === 'android') {
                ToastAndroid.show(error.message, ToastAndroid.SHORT);
            } else {
                AlertIOS.alert(error.message);
            }
            return;
        }

        setIsLoggedIn({
            token: body.token,
            user: body.user,
        });
    }, []);

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'This field is required.',
                    },
                }}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { invalid, error },
                }) => (
                    <>
                        <TextInput
                            placeholder="Username"
                            textContentType="username"
                            autoCapitalize={false}
                            style={styles.input}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        <TextInputError fieldState={{ error, invalid }} />
                    </>
                )}
                name="username"
            />

            <Controller
                control={control}
                rules={{
                    maxLength: {
                        value: 100,
                        message: 'Maximum 100 characters are allowed.',
                    },
                    required: {
                        value: true,
                        message: 'This field is required.',
                    },
                }}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { invalid, error },
                }) => (
                    <>
                        <TextInput
                            placeholder="Password"
                            style={styles.input}
                            textContentType="password"
                            autoCapitalize={false}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        <TextInputError fieldState={{ error, invalid }} />
                    </>
                )}
                name="password"
            />

            <Button title="Login" onPress={handleSubmit(onSubmit)} />
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Dimensions.get('window').height / 4,
        display: 'flex',
        paddingHorizontal: 20,
    },
    input: {
        padding: 20,
        marginTop: 15,
        marginBottom: 5,
        backgroundColor: 'whitesmoke',
        borderRadius: 10,
    },
});

Login.propTypes = {
    navigation: PropTypes.object,
};
