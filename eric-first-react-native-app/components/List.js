import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {ListItem} from './ListItem';
import {useEffect, useState} from 'react';

export const List = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    (async () => {
      try {
        const url =
          'https://raw.githubusercontent.com/mattpe/wbma/master/docs/assets/test.json';

        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setMediaArray(json);
        setIsLoading(false);
        setHasError(false);
      } catch (e) {
        setMediaArray([]);
        setIsLoading(false);
        setHasError(true);
        console.log(e);
      }
    })();
  }, []);
  return (
    <FlatList
      data={mediaArray}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => <ListItem item={item} />}
    />
  );
};
