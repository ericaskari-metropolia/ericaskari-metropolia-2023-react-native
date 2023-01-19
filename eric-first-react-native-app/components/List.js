import {FlatList, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {ListItem} from './ListItem';
import {Settings} from 'react-native-feather';

export const List = ({items, navigation}) => {
  return (
    <View>
      <FlatList
        ListHeaderComponent={
          <>
            <ImageBackground
              source={require('../assets/kitten.jpg')}
              style={styles.bgImage}
              imageStyle={{borderBottomRightRadius: 65}}
            />
            <Text
              style={{
                position: 'absolute',
                top: 220,
                fontSize: 30,
                backgroundColor: '#2669FD',
                color: 'white',
                padding: 10,
              }}
            >
              Homeless Kittens
            </Text>
            <Settings
              width={32}
              height={32}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                color: 'white',
              }}
            />
          </>
        }
        style={{backgroundColor: '#202028'}}
        data={items}
        renderItem={({item, index}) => (
          <ListItem navigation={navigation} item={item} />
        )}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  bgImage: {
    height: 300,
  },
});
