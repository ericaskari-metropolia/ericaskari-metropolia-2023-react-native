import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text } from 'react-native';
import { useMainContext } from '../contexts/MainContext';
import { useAuthentication } from '../hooks/ApiHooks';
import { Button, Image } from '@rneui/themed';

export const Profile = ({ navigation }) => {
    const { userProfile, setUserProfile, setAccessToken, accessToken } =
        useMainContext();
    const [media, setMedia] = useState(null);
    const { getFilesByTag, getMediaById, getMediaUrlByFileName } =
        useAuthentication(accessToken);
    useEffect(() => {
        (async () => {
            const tag = `avatar_${userProfile?.user_id ?? ''}`;
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
        setAccessToken(null);
        setUserProfile(null);
        navigation.navigate('Login');
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
                data={[getMediaUrlByFileName(media?.thumbnails?.w160)]}
                style={{}}
                numColumns={1}
                keyExtractor={(e) => e}
                renderItem={({ item }) => {
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

            <Text>Username: {userProfile?.username ?? '-'}</Text>
            <Text>Username: {userProfile?.username ?? '-'}</Text>
            <Text>Fullname: {userProfile?.full_name ?? '-'}</Text>
            <Text>Email: {userProfile?.email ?? '-'}</Text>
            <Button title={'Logout'} onPress={logout} />

            <Button
                title={'View My Files'}
                onPress={() => {
                    navigation.navigate('MyFiles');
                }}
            />
        </SafeAreaView>
    );
};
