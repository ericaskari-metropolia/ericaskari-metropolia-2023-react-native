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
            const accessToken = await AsyncStorage.getItem('accessToken');
            const userProfile = await AsyncStorage.getItem('userProfile');
            const expirationDate = await AsyncStorage.getItem('expirationDate');
            setLoadedStorageData({
                loaded: true,
                data:
                    accessToken && userProfile && expirationDate
                        ? {
                              accessToken: accessToken,
                              userProfile: JSON.parse(userProfile),
                              expirationDate: Number.isNaN(
                                  parseInt(expirationDate)
                              )
                                  ? Date.now()
                                  : parseInt(expirationDate),
                          }
                        : {
                              accessToken: null,
                              userProfile: null,
                              expirationDate: null,
                          },
            });
        })();
    }, []);

    return (
        <>
            <SafeAreaProvider>
                {loadedStorageData.loaded && (
                    <MainContextProvider
                        defaultUserProfile={loadedStorageData.data.userProfile}
                        defaultAccessToken={loadedStorageData.data.accessToken}
                        defaultExpirationDate={
                            loadedStorageData.data.expirationDate
                        }
                        onAccessTokenSet={(accessToken) => {
                            (async () => {
                                await AsyncStorage.setItem(
                                    'accessToken',
                                    JSON.stringify(accessToken)
                                );
                            })();
                        }}
                        onUserProfileSet={(userProfile) => {
                            (async () => {
                                await AsyncStorage.setItem(
                                    'userProfile',
                                    JSON.stringify(userProfile)
                                );
                            })();
                        }}
                        onExpirationDateSet={(expirationDate) => {
                            (async () => {
                                await AsyncStorage.setItem(
                                    'expirationDate',
                                    String(expirationDate)
                                );
                            })();
                        }}
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
