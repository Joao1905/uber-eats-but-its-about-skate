import React from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { FontAwesome5, AntDesign } from '@expo/vector-icons';

import Divider from './Divider';
import Colors from '../../constants/Colors';

const SettingsList = ({ id, username, navigation }) => {

    const options = [
        {text: 'Change password', icon: 'key', handler: changePasswordHandler},
        {text: 'About', icon: 'archive', handler: aboutHandler},
        {text: 'Logout', icon: 'running', handler: logoutHandler}
    ]

    const changePasswordHandler = () => {

    }

    const aboutHandler = () => {

    }

    const logoutHandler = () => {

    }

    return (
        <View style={styles.settingsListContainer}>
            <TouchableOpacity style={styles.backIcon} activeOpacity={0.6} onPress={navigation.goBack}>
                <AntDesign name="back" size={30} color={Colors.almostBlack} />
            </TouchableOpacity>
            <View style={styles.titleContainer}>
                <Text style={styles.settingsListTitle}>{username}</Text>
            </View>
            <FlatList
                data={options}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (<>
                    <TouchableOpacity style={styles.settingsListButton} onPress={item.handler}>
                        <FontAwesome5 style={styles.settingsListIcon} name={item.icon} color={Colors.almostBlack} size={20} />
                        <Text style={styles.settingsListText}>{item.text}</Text>
                    </TouchableOpacity>
                    <Divider style={styles.settingsListDivider}/>
                </>)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    settingsListContainer: {
        marginTop: 30,
    },
    backIcon: {
        position: 'absolute',
        left: 10,
    },
    titleContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    settingsListTitle: {
        marginVertical: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
    settingsListButton: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    settingsListIcon: {
        marginLeft: 20
    },
    settingsListText: {
        marginLeft: 10,
        marginVertical: 10
    },
    settingsListDivider: {
        marginHorizontal: 10,
        borderBottomColor: Colors.almostLightGray,
    }
})

export default SettingsList