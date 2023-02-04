import { List } from '../components/List';
import { SafeAreaView, View } from 'react-native';
import { useMainContext } from '../contexts/MainContext';
import { useAuthentication } from '../hooks/ApiHooks';

export const MyFiles = ({ navigation }) => {
    const { needsUpdate, setNeedsUpdate, accessToken, userProfile } =
        useMainContext();
    const { useMedia, getMediaUrlByFileName } = useAuthentication(accessToken);

    const { mediaArray } = useMedia({
        needsUpdate,
        setNeedsUpdate,
        userId: userProfile.user_id,
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
                    canEdit={(item) => item.user_id === userProfile.user_id}
                    canDelete={(item) => item.user_id === userProfile.user_id}
                />
            </View>
        </SafeAreaView>
    );
};
