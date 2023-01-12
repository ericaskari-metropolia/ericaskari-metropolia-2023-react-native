import {List} from '../components/List';
import {mediaArray} from '../datasource';
import {SafeAreaView, StyleSheet} from 'react-native';

export const Home = ({navigation}) => {
  return (
    <SafeAreaView>
      <List navigation={navigation} items={mediaArray} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});
