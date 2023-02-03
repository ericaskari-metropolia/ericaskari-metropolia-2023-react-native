import React, { useCallback } from 'react';
import { Platform, ToastAndroid, View } from 'react-native';
import PropTypes from 'prop-types';
import { useMainContext } from '../contexts/MainContext';
import { useAuthentication } from '../hooks/ApiHooks';
import { Controller, useForm } from 'react-hook-form';
import { TextInputError } from '../components/TextInputError';
import AlertIOS from 'react-native/Libraries/Alert/Alert';
import { Button, Input } from '@rneui/themed';

export const Login = ({ navigation }) => {
    const { setUserProfile, setAccessToken } = useMainContext();
    const { postLogin } = useAuthentication();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            username: 'ericaska2',
            password: 'Hashem741',
        },
    });

    const onSubmit = useCallback(async ({ username, password }) => {
        const [body, error] = await postLogin({
            username,
            password,
        });
        if (error) {
            if (Platform.OS === 'android') {
                ToastAndroid.show(error.message, ToastAndroid.SHORT);
            } else {
                AlertIOS.alert(error.message);
            }
            return;
        }

        setAccessToken(body.token);
        setUserProfile(body.user);
        navigation.navigate('Tabs');
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
