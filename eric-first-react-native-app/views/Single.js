import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Image,
  View,
  ActivityIndicator,
} from 'react-native';
import {AsyncImage} from '../components/AsyncImage';

export const Single = ({route, navigation}) => {
  const {item} = route.params;
  console.log({item});
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <AsyncImage
          style={{
            height: 200,
            width: 200,
          }}
          source={{
            uri: item.thumbnails.w160,
          }}
          placeholderColor="#b3e5fc"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});
