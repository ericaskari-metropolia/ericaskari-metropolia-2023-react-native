import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Avatar, ListItem as RNEListItem } from '@rneui/themed';

export const ListItem = ({ item, navigation }) => {
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate('Single', {
                    item,
                });
            }}
        >
            <RNEListItem bottomDivider>
                <Avatar
                    style={{ width: '50%' }}
                    source={{
                        uri: item.thumbnails.w160,
                    }}
                />
                <RNEListItem.Content>
                    <RNEListItem.Title>{item.title}</RNEListItem.Title>
                    <RNEListItem.Subtitle>
                        {item.description}
                    </RNEListItem.Subtitle>
                </RNEListItem.Content>
            </RNEListItem>

            {/*<View*/}
            {/*    style={[*/}
            {/*        {*/}
            {/*            flexDirection: 'row',*/}
            {/*            backgroundColor: '#242834',*/}
            {/*            padding: 10,*/}
            {/*            marginVertical: 5,*/}
            {/*            display: 'flex',*/}
            {/*        },*/}
            {/*    ]}*/}
            {/*>*/}
            {/*    <View style={[{ flex: 1, padding: 10 }]}>*/}
            {/*        <Image source={{ uri: item.thumbnails.w160 }} />*/}
            {/*    </View>*/}
            {/*    <View*/}
            {/*        style={[*/}
            {/*            {*/}
            {/*                flexDirection: 'column',*/}
            {/*                flex: 1,*/}
            {/*                paddingVertical: 20,*/}
            {/*            },*/}
            {/*        ]}*/}
            {/*    >*/}
            {/*        <Text>{item.title}</Text>*/}
            {/*        <Text>{item.description}</Text>*/}
            {/*    </View>*/}
            {/*</View>*/}
        </TouchableOpacity>
    );
};

ListItem.propTypes = {
    item: PropTypes.object,
};
