import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { Navigator } from './navigators/Navigator';
import { MainContextProvider } from './contexts/MainContext';

const App = () => {
    return (
        <>
            <SafeAreaView style={styles.container}>
                <MainContextProvider>
                    <Navigator />
                </MainContextProvider>
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
