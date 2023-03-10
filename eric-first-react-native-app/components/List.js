import { FlatList, ImageBackground, Text, View } from 'react-native';
import { ListItem } from './ListItem';
import { Settings } from 'react-native-feather';

/** @type {import('../types/types').ListComponent} */
export const List = ({
    items,
    navigation,
    getMediaUrlByFileName,
    canDelete,
    canEdit,
}) => {
    return (
        <View>
            <FlatList
                ListHeaderComponent={
                    <>
                        <ImageBackground
                            source={require('../assets/kitten.jpg')}
                            imageStyle={{
                                borderBottomRightRadius: 65,
                                height: '50%',
                            }}
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
                style={{ backgroundColor: '#202028' }}
                data={items}
                renderItem={({ item, index }) => (
                    <ListItem
                        navigation={navigation}
                        item={item}
                        canDelete={canDelete(item)}
                        canEdit={canEdit(item)}
                        getMediaUrlByFileName={getMediaUrlByFileName}
                    />
                )}
            />
        </View>
    );
};
