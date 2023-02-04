import { List } from '../components/List';
import { SafeAreaView, View } from 'react-native';
import { useMainContext } from '../contexts/MainContext';
import { useAuthentication } from '../hooks/ApiHooks';

export const Home = ({ navigation }) => {
    const { needsUpdate, setNeedsUpdate, accessToken } = useMainContext();
    const { useMedia, getMediaUrlByFileName } = useAuthentication(accessToken);

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
