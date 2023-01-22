import { StyleSheet, Text } from 'react-native';
import React from 'react';

export const TextInputError = ({ fieldState: { invalid, error } }) => {
    return (
        <Text
            style={{
                opacity: invalid ? 1 : 0,
            }}
        >
            {error?.message ?? ''}.
        </Text>
    );
};
const styles = StyleSheet.create({
    bgImage: {
        height: 300,
    },
});
