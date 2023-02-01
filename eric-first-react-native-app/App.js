import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Navigator } from './navigators/Navigator';
import { MainContextProvider } from './contexts/MainContext';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
    const [loadedStorageData, setLoadedStorageData] = useState({
        loaded: false,
        data: null,
    });

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem('userToken');
            const profile = await AsyncStorage.getItem('userProfile');
            setLoadedStorageData({
                loaded: true,
                data:
                    token && profile
                        ? { token, profile: JSON.parse(profile) }
                        : null,
            });
        })();
    }, []);

    return (
        <>
            <SafeAreaView style={styles.container}>
                {loadedStorageData.loaded && (
                    <MainContextProvider
                        localStorageData={loadedStorageData.data}
                    >
                        <Navigator />
                    </MainContextProvider>
                )}
            </SafeAreaView>
            <StatusBar style="auto" />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default App;
