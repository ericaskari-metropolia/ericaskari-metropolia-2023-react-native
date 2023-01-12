import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';

export const ListItem = ({item}) => {
  return (
    <TouchableOpacity style={{display: 'flex', padding: 10}}>
      <View
        style={[
          {
            flexDirection: 'row',
            backgroundColor: '#242834',
            padding: 10,
            marginVertical: 5,
            display: 'flex',
          },
        ]}
      >
        <View style={[{flex: 1, padding: 10}]}>
          <Image
            style={styles.cardImage}
            source={{uri: item.thumbnails.w160}}
          />
        </View>
        <View style={[{flexDirection: 'column', flex: 1, paddingVertical: 20}]}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardImage: {
    flex: 1,
    fontSize: '22px',
    color: 'rgb(255,255,255)',
    borderRadius: '10px',
    borderBottomLeftRadius: '60px',
  },
  titleText: {
    fontSize: '22px',
    color: 'rgb(255,255,255)',
  },
  descriptionText: {
    color: 'rgb(134,134,134)',
  },
});

ListItem.propTypes = {
  item: PropTypes.object,
};
