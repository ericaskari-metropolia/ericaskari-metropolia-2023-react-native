import React, { useCallback, useState } from 'react';
import { View } from 'react-native';
import { useMainContext } from '../contexts/MainContext';
import { appId, useAuthentication } from '../hooks/ApiHooks';
import { Controller, useForm } from 'react-hook-form';
import { TextInputError } from '../components/TextInputError';
import { Button, Input } from '@rneui/themed';
import { AppImagePicker } from '../components/AppImagePicker';
import { promiseWait } from '../util/PromiseWait';
import { useFocusEffect } from '@react-navigation/native';
import { showToast } from '../util/Toast';

export const Upload = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { accessToken, setNeedsUpdate } = useMainContext();
    const { uploadMedia, postTag } = useAuthentication(accessToken);
    const {
        control,
        handleSubmit,
        formState: { isValid },
        reset,
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const onSubmit = useCallback(
        async ({ title, description }) => {
            if (!selectedImage) {
                return;
            }

            setIsLoading(true);

            const [uploadMediaResponseBody, uploadMediaResponseError] =
                await uploadMedia({
                    title,
                    description,
                    file: {
                        name: selectedImage.fileName ?? 'file.jpeg',
                        type: selectedImage.type,
                        uri: selectedImage.uri,
                    },
                });
            if (uploadMediaResponseError) {
                showToast(uploadMediaResponseError.message, 'uploadMedia');
                return;
            }

            const [postTagResponseBody, postTagResponseError] = await postTag({
                fileId: uploadMediaResponseBody.file_id,
                tag: appId,
            });
            if (postTagResponseError) {
                showToast(postTagResponseError.message, 'postTag');
                return;
            }

            // Waiting for thumbnails to generate
            await promiseWait();
            setIsLoading(false);
            onReset();
            setNeedsUpdate(true);
            navigation.navigate('Home');
        },
        [selectedImage]
    );

    const onReset = useCallback(() => {
        reset();
        setSelectedImage(null);
    }, []);

    useFocusEffect(() => {
        // onReset().then();
    });
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
            <AppImagePicker
                onImageSelect={(image) => {
                    setSelectedImage(image);
                }}
                previewImage={selectedImage}
            />
            <Button
                title="Upload"
                onPress={handleSubmit(onSubmit)}
                loading={isLoading}
                disabled={!isValid || !selectedImage}
            />
            <Button title="Reset" onPress={onReset} loading={isLoading} />
        </View>
    );
};
