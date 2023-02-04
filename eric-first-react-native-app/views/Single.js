import React, { useCallback, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { AsyncImage } from '../components/AsyncImage';
import { useAuthentication } from '../hooks/ApiHooks';
import { Audio, Video } from 'expo-av';
import { useMainContext } from '../contexts/MainContext';
import { Button } from '@rneui/themed';
import { showToast } from '../util/Toast';

const triggerAudio = async (ref) => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    ref.current.playAsync();
};

export const Single = ({ route, navigation }) => {
    const { accessToken, userProfile, setNeedsUpdate } = useMainContext();
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [ownerProfile, setOwnerProfile] = React.useState(null);
    const { item, canDelete, canEdit } = route.params;
    const { getMediaUrlByFileName, getUserById, deleteMedia } =
        useAuthentication(accessToken);
    useEffect(() => {
        if (status.isPlaying) {
            triggerAudio(video).then();
        }
    }, [video, status.isPlaying]);

    useEffect(() => {
        (async () => {
            const [data, error] = await getUserById(item.user_id);
            if (error) {
                showToast(error.message, 'getUserById');
            }
            setOwnerProfile(data);
        })();
    }, [item]);

    const onDelete = useCallback(async (mediaId) => {
        const [data, error] = await deleteMedia(mediaId);
        if (error) {
            showToast(error.message, 'deleteMedia');
        }
        setNeedsUpdate(true);
        navigation.goBack();
    }, []);

    const onEdit = useCallback(async (item) => {
        navigation.navigate('Modify', {
            item,
        });
    }, []);

    return (
        <SafeAreaView>
            <View>
                <Text style={{ fontSize: 25, fontWeight: 'bold' }}>
                    {item.title}
                </Text>
                <Text style={{ fontSize: 20 }}>{item.description}</Text>
                <Text>Owner: {ownerProfile?.full_name}</Text>

                {item.mime_type.startsWith('image') ? (
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
                ) : (
                    <>
                        <Video
                            ref={video}
                            source={{
                                uri: getMediaUrlByFileName(item.filename),
                            }}
                            style={{
                                height: 200,
                            }}
                            useNativeControls
                            resizeMode="contain"
                            isLooping
                            onPlaybackStatusUpdate={(status) =>
                                setStatus(() => status)
                            }
                        />
                    </>
                )}
                {!!canDelete && (
                    <Button onPress={() => onDelete(item.file_id)}>
                        Delete
                    </Button>
                )}
                {!!canEdit && (
                    <Button onPress={() => onEdit(item)}>Edit</Button>
                )}
            </View>
        </SafeAreaView>
    );
};
