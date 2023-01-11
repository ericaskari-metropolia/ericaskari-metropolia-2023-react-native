import {mediaArray} from '../datasource';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {ListItem} from './ListItem';

export const List = ({items}) => {
  return (
    <FlatList data={items} renderItem={({item}) => <ListItem item={item} />} />
  );
};
