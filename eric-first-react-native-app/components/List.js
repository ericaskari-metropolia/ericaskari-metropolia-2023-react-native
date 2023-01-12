import {FlatList} from 'react-native';
import {ListItem} from './ListItem';
import {BASE_URL, uriBuilder, useMedia} from '../hooks/ApiHooks';

export const List = () => {
  const {mediaDetailsList} = useMedia();

  return (
    <FlatList
      data={mediaDetailsList}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem item={item} uriBuilder={uriBuilder} />}
    />
  );
};
