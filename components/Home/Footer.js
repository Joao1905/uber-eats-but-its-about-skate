import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons';

import Colors from '../../constants/Colors'

const Footer = ({
    onPressHome,
    onPressBrowse,
    onPressAdd,
    onPressRoutes,
    onPressAccount
}) => {
    return (
        <View style={styles.footerContainer}>
            <TouchableOpacity activeOpacity={0.6} onPress={onPressHome}>
                <View style={styles.iconContainer}>
                    <Entypo name="home" size={32} color="black" />
                    <Text style={styles.footerText}>Home</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={onPressBrowse}>
                <View style={styles.iconContainer}>
                    <Ionicons name="ios-search-sharp" size={32} color="black" />
                    <Text style={styles.footerText}>Browse</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={onPressAdd}>
                <View style={styles.iconContainer}>
                    <Entypo name="plus" size={32} color="black" />
                    <Text style={styles.footerText}>Add</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={onPressRoutes}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="map-marker-distance" size={32} color="black" />
                    <Text style={styles.footerText}>Routes</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.6} onPress={onPressAccount}>
                <View style={styles.iconContainer}>
                    <MaterialCommunityIcons name="account" size={32} color="black" />
                    <Text style={styles.footerText}>Account</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    footerContainer: {
        backgroundColor: Colors.lightGray,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingHorizontal: 15,
    },
    footerText: {
        fontSize: 12,
    },
    iconContainer: {
        marginHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Footer