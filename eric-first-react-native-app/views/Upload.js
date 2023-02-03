import React, { useCallback, useContext, useState } from 'react';
import { Platform, ToastAndroid, View } from 'react-native';
import { MainContext } from '../contexts/MainContext';
import { useAuthentication } from '../hooks/ApiHooks';
import { Controller, useForm } from 'react-hook-form';
import { TextInputError } from '../components/TextInputError';
import AlertIOS from 'react-native/Libraries/Alert/Alert';
import { Button, Image, Input } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';

const fakeWait = (time = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
};
const AppImagePicker = ({ onImageSelect }) => {
    const [previewImageUri, setPreviewImageUri] = useState(null);

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setPreviewImageUri(result.assets[0].uri);
            onImageSelect(result.assets[0]);
        }
    };

    return (
        <View>
            <Button
                title="Pick an image from camera roll"
                onPress={pickImage}
            />
            {!!previewImageUri && (
                <Image
                    source={{ uri: previewImageUri }}
                    style={{ width: 200, height: 200 }}
                />
            )}
        </View>
    );
};

export const Upload = ({ navigation }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [
        userProfile,
        accessToken,
        setUserProfile,
        setAccessToken,
        needsUpdate,
        setNeedsUpdate,
    ] = useContext(MainContext);
    const { uploadMedia } = useAuthentication();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            title: 'Media',
            description: 'Some Test Media',
        },
    });

    const onSubmit = useCallback(
        async ({ title, description }) => {
            if (!selectedImage) {
                return;
            }
            setIsLoading(true);
            const [body, error] = await uploadMedia({
                accessToken,
                title,
                description,
                file: {
                    name: selectedImage.fileName ?? 'file.jpeg',
                    type: selectedImage.type,
                    uri: selectedImage.uri,
                },
            });
            // Waiting for thumbnails to generate
            await fakeWait();
            setIsLoading(false);
            if (error) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show(error.message, ToastAndroid.SHORT);
                } else {
                    AlertIOS.alert(error.message);
                }
            } else {
                if (Platform.OS === 'android') {
                    ToastAndroid.show(
                        'Successfully uploaded!',
                        ToastAndroid.SHORT
                    );
                } else {
                    AlertIOS.alert('Successfully uploaded!');
                }
                setNeedsUpdate(true);
                navigation.navigate('Home');
            }
        },
        [selectedImage]
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
            />
            <Button
                title="Upload"
                onPress={handleSubmit(onSubmit)}
                loading={isLoading}
            />
        </View>
    );
};
