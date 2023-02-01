import React, { useCallback, useContext, useEffect } from 'react';
import { Platform, ToastAndroid, View } from 'react-native';
import PropTypes from 'prop-types';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthentication } from '../hooks/ApiHooks';
import { Controller, useForm } from 'react-hook-form';
import { TextInputError } from '../components/TextInputError';
import AlertIOS from 'react-native/Libraries/Alert/Alert';
import { Button, Input } from '@rneui/themed';

export const Login = ({ navigation }) => {
    const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
    const { postLogin } = useAuthentication();
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitted, isDirty },
    } = useForm({
        defaultValues: {
            username: 'ericaska2',
            password: 'Hashem741',
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
        const [body, error] = await postLogin({
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
        <View>
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
                        <Input
                            placeholder="Username"
                            textContentType="username"
                            autoCapitalize={false}
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
                        <Input
                            placeholder="Password"
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
            <Button
                title="Register"
                onPress={() => navigation.navigate('Register')}
            />
        </View>
    );
};

Login.propTypes = {
    navigation: PropTypes.object,
};
