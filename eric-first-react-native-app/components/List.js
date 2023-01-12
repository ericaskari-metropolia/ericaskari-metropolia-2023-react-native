import {mediaArray} from '../datasource';
import {FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {ListItem} from './ListItem';
import {useAssets} from 'expo-asset';

export const List = ({items, navigation}) => {
  const [assets, error] = useAssets([
    require('../assets/kitten.jpg'),
    require('../assets/settings.png'),
  ]);
  console.log({error, assets});
  return (
    <View>
      <FlatList
        style={{backgroundColor: '#202028'}}
        data={[true, ...items]}
        renderItem={({item, index}) =>
          index === 0 ? (
            <View
              style={{
                width: '100%',
                borderRadius: '30px',
              }}
            >
              {assets ? (
                <>
                  <Image
                    source={assets[0]}
                    style={{
                      resizeMode: 'cover',
                      width: '100%',
                    }}
                  />
                  <Image
                    source={assets[1]}
                    style={{
                      position: 'absolute',
                      top: 30,
                      resizeMode: 'contain',
                      right: 30,
                      height: 30,
                      width: 30,
                      fontSize: 30,
                      color: 'white',
                      fill: 'white',
                    }}
                  />
                </>
              ) : (
                <></>
              )}
              <Text
                style={{
                  position: 'absolute',
                  bottom: 20,
                  fontSize: 30,
                  backgroundColor: '#2669FD',
                  color: 'white',
                  padding: 10,
                }}
              >
                Homeless Kittens
              </Text>
            </View>
          ) : (
            <ListItem navigation={navigation} item={item} />
          )
        }
      />
    </View>
  );
};
