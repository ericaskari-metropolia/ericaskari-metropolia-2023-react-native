import { List } from '../components/List';
import { mediaArray } from '../datasource';
import { SafeAreaView, View } from 'react-native';

export const Home = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View
                style={{
                    width: '100%',
                    backgroundColor: '#202028',
                }}
            >
                <List navigation={navigation} items={mediaArray} />
            </View>
        </SafeAreaView>
    );
};
