import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

import AccountHeader from '../components/Account/AccountHeader'
import AccountPhotos from '../components/Account/AccountPhotos'
import Colors from '../constants/Colors'

const Account = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <AccountHeader navigation={navigation}/>
            <AccountPhotos/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGray
    }
})

export default Account