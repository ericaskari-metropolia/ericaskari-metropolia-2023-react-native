import { StatusBar } from 'react-native';
import { Navigator } from './navigators/Navigator';
import { MainContextProvider } from './contexts/MainContext';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
            <SafeAreaProvider>
                {loadedStorageData.loaded && (
                    <MainContextProvider
                        localStorageData={loadedStorageData.data}
                    >
                        <Navigator />
                    </MainContextProvider>
                )}
            </SafeAreaProvider>
            <StatusBar style="auto" />
        </>
    );
};

export default App;
