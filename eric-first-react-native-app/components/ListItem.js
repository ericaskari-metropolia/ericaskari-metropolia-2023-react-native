import {Image, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';

export const ListItem = ({item}) => {
  return (
    <TouchableOpacity style={{display: 'flex'}}>
      <View
        style={[
          {
            flexDirection: 'row',
            backgroundColor: 'gray',
            padding: 10,
            marginVertical: 5,
          },
        ]}
      >
        <View style={[{flexDirection: 'row', padding: 10}]}>
          <Image
            style={{width: 100, height: 100}}
            source={{uri: item.thumbnails.w160}}
          />
        </View>
        <View style={[{flexDirection: 'column'}]}>
          <Text style={[{fontSize: '22px'}]}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
ListItem.propTypes = {
  item: PropTypes.object,
};
