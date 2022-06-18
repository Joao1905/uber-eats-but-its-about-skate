import React from 'react'
import { StyleSheet, TouchableWithoutFeedback, View, Keyboard } from 'react-native'

import BrowseBar from '../components/Browse/BrowseBar'
import Colors from '../constants/Colors'

const Browse = ({navigation}) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <BrowseBar navigation={navigation}/>
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

export default Browse