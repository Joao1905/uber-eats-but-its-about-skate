import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity, TouchableHighlight, Dimensions, StatusBar, TouchableWithoutFeedback } from 'react-native'
import { AntDesign, Ionicons, Entypo } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'

import Colors from '../../constants/Colors'
import { profile } from '../../mocks/Profile'

const AccountHeader = ({ navigation }) => {

    const [profileImage, setProfileImage] = useState(profile.picture)

    const statusBar = useIsFocused()
        ? <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
        : <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

    const changeImageHandler = (localUri) => {
        setProfileImage(localUri)
        // TODO request to backend to change picture
    }

    const pickProfileImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
    
        if (!result.cancelled) {
            changeImageHandler(result.uri)
        }
    }

    return (<>
        <View style={styles.headerBackground}>
            {statusBar}
            <View style={styles.iconContainer}>
                <TouchableOpacity activeOpacity={0.6} onPress={navigation.goBack}>
                    <AntDesign name="back" size={30} color={Colors.white} />
                </TouchableOpacity>
            </View>
            <View style={styles.profilePictureContainer}>
                <TouchableWithoutFeedback onPress={pickProfileImage}>
                    <Image
                        source={{uri: profileImage}}
                        resizeMode='cover'
                        style={styles.profilePicture}
                    />
                </TouchableWithoutFeedback>
            </View>
            <Text style={styles.usernameOuterText}><Text style={styles.usernameText}>{profile.name.toUpperCase()}</Text> {profile.surname.toUpperCase()}</Text>
        </View>
        <TouchableHighlight underlayColor={Colors.lightGreen} style={styles.configButton} onPress={() => navigation.navigate('Settings', profile)}>      
            <Ionicons name="settings-sharp" size={30} color={Colors.white} />                
        </TouchableHighlight>
    </>)
}

const styles = StyleSheet.create({
    headerContainer: {
        height: '50%',
        alignItems: 'center',
        paddingBottom: '10%',
    },
    headerBackground: {
        height: '45%',
        width: '100%',
        alignItems: 'center',
        paddingBottom: '10%',
        backgroundColor: Colors.almostBlack,
    },
    iconContainer: {
        marginTop: 30,
        marginLeft: 30,
        width: '100%'
    },
    profilePictureContainer: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginTop: '0%',
        overflow: 'hidden',
        elevation: 10,
    },
    profilePicture: {
        width: 120,
        height: 120
    },
    usernameOuterText: {
        marginTop: 25,
        color: Colors.white,
        fontSize: 18,
        fontWeight: '100',
        letterSpacing: 2.5,
    },
    usernameText: {
        fontWeight: 'bold',
    },
    configButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: Colors.green,
        position: 'absolute',
        top: '40%',
        left: (Dimensions.get('window').width / 2)-40,
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex : 1
    },
})

export default AccountHeader