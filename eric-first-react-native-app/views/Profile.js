import React, { useContext, useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { MainContext } from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthentication } from '../hooks/ApiHooks';
import { Button, Image } from '@rneui/themed';

export const Profile = ({ navigation }) => {
    const [isLoggedIn, setIsLoggedIn] = useContext(MainContext);
    const [media, setMedia] = useState(null);
    const { getFilesByTag, getMediaById, getMediaUrlByFileName } =
        useAuthentication();

    useEffect(() => {
        if (!isLoggedIn) {
            (async () => {
                navigation.navigate('Login');
                await AsyncStorage.clear();
            })();
        }
    }, [isLoggedIn]);

    useEffect(() => {
        (async () => {
            const tag = `avatar_${isLoggedIn?.profile?.user_id ?? ''}`;
            const [data, error, status] = await getFilesByTag({ tag });
            const images = data ?? [];
            const sortedImages = images.sort(
                (a, b) =>
                    new Date(b.time_added).getTime() -
                    new Date(a.time_added).getTime()
            );
            const newestProfile = images.length > 0 ? sortedImages[0] : null;

            {
                if (!newestProfile) {
                    setMedia(null);
                    return;
                }
                const [data, error, status] = await getMediaById({
                    mediaId: newestProfile.file_id,
                });
                const media = data ?? null;
                setMedia(media);
            }
        })();
    }, []);

    const logout = () => {
        setIsLoggedIn(null);
    };

    return (
        <SafeAreaView
            style={{
                width: '100%',
                backgroundColor: 'rgba(0,0,0,0.34)',
            }}
        >
            <Text>Profile</Text>
            <FlatList
                data={[
                    getMediaUrlByFileName({
                        fileName: media?.thumbnails?.w160,
                    }),
                ]}
                style={{}}
                numColumns={1}
                keyExtractor={(e) => e}
                renderItem={({ item }) => {
                    console.log(item);
                    return (
                        <Image
                            containerStyle={{
                                aspectRatio: 1,
                                width: '100%',
                                height: '100%',
                                flex: 1,
                            }}
                            source={{ uri: item }}
                        />
                    );
                }}
            />

            <Text>Username: {isLoggedIn?.profile?.username ?? '-'}</Text>
            <Text>Fullname: {isLoggedIn?.profile?.full_name ?? '-'}</Text>
            <Text>Email: {isLoggedIn?.profile?.email ?? '-'}</Text>
            <Button title={'Logout'} onPress={logout} />
        </SafeAreaView>
    );
};
