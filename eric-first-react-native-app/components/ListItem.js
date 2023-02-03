import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Avatar, ListItem as RNEListItem } from '@rneui/themed';

/** @type {import('../types/types').ListItemComponent} */
export const ListItem = ({ item, navigation, getMediaUrlByFileName }) => {
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
                        uri: getMediaUrlByFileName(item?.thumbnails?.w320),
                    }}
                />
                <RNEListItem.Content>
                    <RNEListItem.Title>{item.title}</RNEListItem.Title>
                    <RNEListItem.Subtitle>
                        {item.description}
                    </RNEListItem.Subtitle>
                </RNEListItem.Content>
            </RNEListItem>
        </TouchableOpacity>
    );
};

ListItem.propTypes = {
    item: PropTypes.object,
};
