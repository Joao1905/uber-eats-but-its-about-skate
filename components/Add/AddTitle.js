import React from 'react'
import { StyleSheet, View, Text, TextInput } from 'react-native'

import Colors from '../../constants/Colors'

const AddTitle = ({ parentReplication }) => {
    return (
        <View style={styles.AddTitleContainer}>
            <TextInput
                style={styles.AddTitleText}
                placeholder='Spot Name'
                onChangeText={parentReplication}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    AddTitleContainer: {
        marginHorizontal: 20,
        backgroundColor: Colors.lightGray,
        borderRadius: 10
    },
    AddTitleText: {
        marginLeft: 10,
    }
})

export default AddTitle;