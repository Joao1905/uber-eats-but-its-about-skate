import React, { useState } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'

import Colors from '../../constants/Colors'
import Values from '../../constants/Values'

const AddTags = ({ parentReplication }) => {

    const [tags, setTags] = useState(Values.TAGS.reduce((previous='Test', current) => {
        return ({...previous, [current]: false})
    }, {}))

    const onPressHandler = (isChecked, item) => {
        const newTags = {...tags, [item]: isChecked}
        setTags(newTags)
        parentReplication(newTags)
    }

    return (
        <View style={styles.AddTagsContainer}>
            <FlatList
                data={Values.TAGS}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => {
                    return <BouncyCheckbox
                        onPress={(isChecked) => onPressHandler(isChecked, item)}
                        style={styles.checkboxContainer}
                        iconStyle={styles.checkbox}
                        textStyle={{
                            textDecorationLine: "none",
                        }}
                        size={20}
                        fillColor="green"
                        unfillColor="#FFFFFF"
                        text={item}
                    />
                }}
                numColumns={2}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    AddTagsContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    checkboxContainer: {
        width: '50%',
        marginVertical: 3

    },
    checkbox: {
        borderRadius: 5,
        borderColor: Colors.gray,
    }
})

export default AddTags;