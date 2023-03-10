import { List } from '../components/List';
import { SafeAreaView, View } from 'react-native';
import { useMainContext } from '../contexts/MainContext';
import { useAuthentication } from '../hooks/ApiHooks';

export const Home = ({ navigation }) => {
    const { needsUpdate, setNeedsUpdate, accessToken, userProfile } =
        useMainContext();
    const { useMedia, getMediaUrlByFileName } = useAuthentication(accessToken);
    console.log(userProfile);
    const { mediaArray } = useMedia({
        needsUpdate,
        setNeedsUpdate,
    });
    console.log(mediaArray);

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
                    canEdit={(item) => item.user_id === userProfile.user_id}
                    canDelete={(item) => item.user_id === userProfile.user_id}
                />
            </View>
        </SafeAreaView>
    );
};
