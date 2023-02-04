import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useMainContext } from '../contexts/MainContext';
import { useAuthentication } from '../hooks/ApiHooks';
import { Controller, useForm } from 'react-hook-form';
import { TextInputError } from '../components/TextInputError';
import { Button, Input } from '@rneui/themed';
import { showToast } from '../util/Toast';

export const Modify = ({ route, navigation }) => {
    const { accessToken, setNeedsUpdate } = useMainContext();
    const [isLoading, setIsLoading] = useState(false);
    const { item, canDelete, canEdit } = route.params;

    const { modifyMedia } = useAuthentication(accessToken);
    const {
        control,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm({
        defaultValues: {
            title: item?.title ?? '',
            description: item?.description ?? '',
        },
    });

    const onSubmit = useCallback(
        async ({ title, description }) => {
            setIsLoading(true);

            const [data, error] = await modifyMedia({
                fileId: item.file_id,
                title,
                description,
            });
            setIsLoading(false);
            console.log({ error, data });
            if (error) {
                showToast(error.message, 'modifyMedia');
                return;
            }

            onReset();
            setNeedsUpdate(true);
            navigation.navigate('Home');
        },
        [item]
    );

    const onReset = useCallback(() => {
        reset();
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
                            placeholder="Title"
                            textContentType="text"
                            autoCapitalize={false}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        <TextInputError fieldState={{ error, invalid }} />
                    </>
                )}
                name="title"
            />
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
                            placeholder="Description"
                            textContentType="text"
                            autoCapitalize={false}
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                        <TextInputError fieldState={{ error, invalid }} />
                    </>
                )}
                name="description"
            />
            <Button
                title="Update"
                onPress={handleSubmit(onSubmit)}
                loading={isLoading}
                disabled={!isValid}
            />
            <Button title="Reset" onPress={onReset} loading={isLoading} />
        </View>
    );
};
