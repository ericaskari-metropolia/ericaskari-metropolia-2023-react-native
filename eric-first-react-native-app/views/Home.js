import { List } from '../components/List';
import { SafeAreaView, View } from 'react-native';
import { useContext } from 'react';
import { MainContext } from '../contexts/MainContext';
import { useAuthentication } from '../hooks/ApiHooks';

export const Home = ({ navigation }) => {
    const [
        userProfile,
        accessToken,
        setUserProfile,
        setAccessToken,
        needsUpdate,
        setNeedsUpdate,
    ] = useContext(MainContext);
    const { useMedia, getMediaUrlByFileName } = useAuthentication();

    const { mediaArray } = useMedia({
        needsUpdate,
        setNeedsUpdate,
    });
    return (
        <SafeAreaView>
            <View
                style={{
                    width: '100%',
                    backgroundColor: '#202028',
                }}
            >
                <List
                    navigation={navigation}
                    items={mediaArray}
                    getMediaUrlByFileName={getMediaUrlByFileName}
                />
            </View>
        </SafeAreaView>
    );
};
