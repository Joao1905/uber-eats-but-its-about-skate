import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native'

import Colors from '../../constants/Colors'

const Header = () => {

    const [buttonPressed, setButtonPressed] = useState('All Spots')

    return (
        <View style={styles.headerContainer}>
            <TouchableWithoutFeedback onPress={() => setButtonPressed('All Spots')}>
                <Text style={{
                    ...styles.buttonPopular,
                    backgroundColor: buttonPressed === 'All Spots' ? Colors.black : Colors.white,
                    color: buttonPressed === 'All Spots' ? Colors.white : Colors.black
                }}>
                    All Spots
                </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setButtonPressed('Favorite')}>
                <Text style={{
                    ...styles.buttonPopular,
                    backgroundColor: buttonPressed === 'Favorite' ? Colors.black : Colors.white,
                    color: buttonPressed === 'Favorite' ? Colors.white : Colors.black
                }}>
                    Favorite
                </Text>
            </TouchableWithoutFeedback>
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: Colors.white,
    },
    buttonPopular: {
        backgroundColor: Colors.black,
        color: Colors.white,
        fontWeight: 'bold',
        paddingVertical: 4,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginVertical: 10,
    },
    buttonMySpots: {
        backgroundColor: Colors.black,
        color: Colors.white,
        fontWeight: 'bold',
        paddingVertical: 4,
        paddingHorizontal: 15,
        borderRadius: 20,
        marginVertical: 10,
    },
})

export default Header