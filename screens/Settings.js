import React from 'react'
import { StyleSheet, View } from 'react-native'

import SettingsList from '../components/Settings/SettingsList'
import Colors from '../constants/Colors'

const Settings = ({ navigation, route }) => {
    return (
        <View style={styles.settingsContainer}>
            <SettingsList navigation={navigation} id={route.params.id} username={route.params.username}/>
        </View>
    )
}

const styles = StyleSheet.create({
    settingsContainer: {
        flex: 1,
        backgroundColor: Colors.lightGray
    }
})

export default Settings;