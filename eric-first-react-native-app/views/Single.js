import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { AsyncImage } from '../components/AsyncImage';
import { useAuthentication } from '../hooks/ApiHooks';

export const Single = ({ route, navigation }) => {
    const { getMediaUrlByFileName } = useAuthentication();
    const { item } = route.params;

    return (
        <SafeAreaView>
            <View>
                <AsyncImage
                    style={{
                        height: 200,
                        width: 200,
                    }}
                    source={{
                        uri: getMediaUrlByFileName(item.thumbnails.w160),
                    }}
                    placeholderColor="#b3e5fc"
                />
            </View>
        </SafeAreaView>
    );
};
