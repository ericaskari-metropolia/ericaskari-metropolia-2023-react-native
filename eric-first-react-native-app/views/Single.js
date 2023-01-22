import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { AsyncImage } from '../components/AsyncImage';

export const Single = ({ route, navigation }) => {
    const { item } = route.params;

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
