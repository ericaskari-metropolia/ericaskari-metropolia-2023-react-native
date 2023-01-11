import {StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import {List} from './components/List';
import {mediaArray} from './datasource';

const App = () => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <List items={mediaArray} />
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
