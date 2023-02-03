import React from 'react';
import * as ImagePicker from 'expo-image-picker';
import { View } from 'react-native';
import { Button, Image } from '@rneui/themed';

export const AppImagePicker = ({ onImageSelect, previewImage }) => {
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            onImageSelect(result.assets[0]);
        }
    };

    return (
        <View>
            <Button
                title="Pick an image from camera roll"
                onPress={pickImage}
            />
            {!!previewImage && (
                <Image
                    source={{ uri: previewImage.uri }}
                    style={{ width: 200, height: 200 }}
                />
            )}
        </View>
    );
};
