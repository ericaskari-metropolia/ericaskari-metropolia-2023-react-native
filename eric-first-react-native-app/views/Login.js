import React, { useCallback } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { useMainContext } from '../contexts/MainContext';
import { useAuthentication } from '../hooks/ApiHooks';
import { Controller, useForm } from 'react-hook-form';
import { TextInputError } from '../components/TextInputError';
import { Button, Input } from '@rneui/themed';
import { showToast } from '../util/Toast';

export const Login = ({ navigation }) => {
    const { setUserProfile, setAccessToken, setExpirationDate } =
        useMainContext();
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
            showToast(error.message, 'postLogin');
            return;
        }

        setAccessToken(body.token);
        setUserProfile(body.user);
        setExpirationDate(Date.now() + 1000 * 60 * 10);
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
