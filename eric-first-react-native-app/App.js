import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {List} from './components/List';

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <List />
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
