import React, { useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import { AsyncImage } from '../components/AsyncImage';
import { useAuthentication } from '../hooks/ApiHooks';
import { Audio, Video } from 'expo-av';
import { useMainContext } from '../contexts/MainContext';

const triggerAudio = async (ref) => {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    ref.current.playAsync();
};

export const Single = ({ route }) => {
    const { accessToken } = useMainContext();
    const video = React.useRef(null);
    const [status, setStatus] = React.useState({});
    const [ownerProfile, setOwnerProfile] = React.useState(null);
    const { item } = route.params;
    const { getMediaUrlByFileName, getUserById } =
        useAuthentication(accessToken);

    useEffect(() => {
        if (status.isPlaying) {
            triggerAudio(video).then();
        }
    }, [video, status.isPlaying]);

    useEffect(() => {
        (async () => {
            console.log(item.user_id);
            const [data, error] = await getUserById(item.user_id);
            setOwnerProfile(data);
            console.log({ data, error });
        })();
    }, [item]);

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
            </View>
        </SafeAreaView>
    );
};
