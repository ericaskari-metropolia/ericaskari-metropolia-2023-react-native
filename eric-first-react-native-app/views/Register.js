import React, { useCallback } from 'react';
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
import { useAuthentication } from '../hooks/ApiHooks';
import { Controller, useForm } from 'react-hook-form';
import { TextInputError } from '../components/TextInputError';
import AlertIOS from 'react-native/Libraries/Alert/Alert';

export const Register = ({ navigation }) => {
    const { postRegister } = useAuthentication();
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitted, isDirty },
    } = useForm({
        defaultValues: {
            username: 'ericaska',
            password: 'ericaskaa',
            fullName: 'Eric Askari',
            email: 'ericsomething@gmail.com',
        },
    });

    const onSubmit = useCallback(
        async ({ username, password, fullName, email }) => {
            const { body, error } = await postRegister({
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
                            placeholder="Email"
                            style={styles.input}
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
                            placeholder="Full Name"
                            style={styles.input}
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

Register.propTypes = {
    navigation: PropTypes.object,
};
