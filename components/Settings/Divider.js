import React from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from '../../constants/Colors';

const Divider = ({ style }) => {
    return (
        <View style={{...styles.divider, ...style}} />
    )
}

const styles = StyleSheet.create({
    divider: {
        borderBottomColor: Colors.gray,
        borderBottomWidth: 1,
    }
})

export default Divider;