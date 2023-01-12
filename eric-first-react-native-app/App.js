import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {Navigator} from './navigators/Navigator';

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Navigator />
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
