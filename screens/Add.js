import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native'

import AddCard from '../components/Add/AddCard'
import Colors from '../constants/Colors'

const Add = ({navigation}) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <AddCard/>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGray,
    },
})

export default Add