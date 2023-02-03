import React, { useCallback } from 'react';
import { Platform, ToastAndroid, View } from 'react-native';
import PropTypes from 'prop-types';
import { useAuthentication } from '../hooks/ApiHooks';
import { Controller, useForm } from 'react-hook-form';
import { TextInputError } from '../components/TextInputError';
import AlertIOS from 'react-native/Libraries/Alert/Alert';
import { Button, Input } from '@rneui/themed';

export const Register = ({ navigation }) => {
    const { postRegister, checkUsername } = useAuthentication();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            username: '',
            password: '',
            repeatPassword: '',
            fullName: '',
            email: '',
        },
    });

    const onSubmit = useCallback(
        async ({ username, password, fullName, email }) => {
            const [body, error] = await postRegister({
                username,
                password,
                fullName,
                email,
            });

            if (error) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show(error.message, ToastAndroid.SHORT);
                } else {
                    AlertIOS.alert(error.message);
                }
                return;
            }

            if (Platform.OS === 'android') {
                ToastAndroid.show(
                    'User created successfully! You can login now.',
                    ToastAndroid.SHORT
                );
            } else {
                AlertIOS.alert(
                    'User created successfully! You can login now.',
                    ''
                );
            }
            navigation.navigate('Login');
        },
        []
    );

    return (
        <View>
            <Controller
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'This field is required.',
                    },
                    minLength: {
                        value: 4,
                        message: 'Minimum 4 characters are required.',
                    },
                    maxLength: {
                        value: 100,
                        message: 'Maximum 100 characters are allowed.',
                    },
                    validate: async (username) => {
                        const [data, error] = await checkUsername({
                            username,
                        });
                        if (error) {
                            return true;
                        }
                        return data?.available
                            ? true
                            : 'Username is already taken';
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
                    required: {
                        value: true,
                        message: 'This field is required.',
                    },
                    minLength: {
                        value: 4,
                        message: 'Minimum 4 characters are required.',
                    },
                    maxLength: {
                        value: 100,
                        message: 'Maximum 100 characters are allowed.',
                    },
                    pattern: {
                        value: /^(?=.*[a-z])(?=.*[A-Z])/,
                        message:
                            'At least one uppercase and one lowercase is required.',
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

            <Controller
                control={control}
                rules={{
                    validate: async (repeatedPassword, { password }) => {
                        return password === repeatedPassword
                            ? true
                            : 'Repeated password does not match.';
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
                name="repeatPassword"
            />

            <Controller
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'This field is required.',
                    },
                    minLength: {
                        value: 4,
                        message: 'Minimum 4 characters are required.',
                    },
                    maxLength: {
                        value: 100,
                        message: 'Maximum 100 characters are allowed.',
                    },
                    pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: 'Not a valid email',
                    },
                }}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { invalid, error },
                }) => (
                    <>
                        <Input
                            placeholder="Email"
                            textContentType="emailAddress"
                            autoCapitalize={false}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        <TextInputError fieldState={{ error, invalid }} />
                    </>
                )}
                name="email"
            />

            <Controller
                control={control}
                rules={{
                    required: {
                        value: true,
                        message: 'This field is required.',
                    },
                    minLength: {
                        value: 3,
                        message: 'Minimum 3 characters are required.',
                    },
                    maxLength: {
                        value: 100,
                        message: 'Maximum 100 characters are allowed.',
                    },
                }}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { invalid, error },
                }) => (
                    <>
                        <Input
                            placeholder="Full Name"
                            textContentType="name"
                            autoCapitalize={false}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        <TextInputError fieldState={{ error, invalid }} />
                    </>
                )}
                name="fullName"
            />

            <Button title="Register" onPress={handleSubmit(onSubmit)} />
            <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    );
};

Register.propTypes = {
    navigation: PropTypes.object,
};
