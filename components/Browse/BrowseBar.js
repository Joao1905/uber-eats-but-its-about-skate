import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import Colors from '../../constants/Colors'
import Values from '../../constants/Values'
import { spots } from '../../mocks/Spots'
import { FlatList } from 'react-native-gesture-handler'

const SearchBar = ({ onPress, navigation }) => {

    const [textInput, setTextInput] = useState('')
    const [suggestedSpots, setSuggestedSpots] = useState(spots)

    const textInputHandler = (text) => {
        setTextInput(text)
        if (text.length >= Values.AUTOSUGESTION_MIN) {
            const newData = spots.filter((item) => {
                const lowerText = text.toLowerCase()
                return item.title.toLowerCase().includes(lowerText)
                    || item.autor.toLowerCase().includes(lowerText)
                    || item.location.toLowerCase().includes(lowerText)
            })
            setSuggestedSpots(newData)
        }
    }

    return (
        <>
            <View style={styles.searchbarContainer}>
                <View style={styles.textInputContainer}>
                    <Ionicons name="ios-search-sharp" size={24} color={Colors.almostBlack} />
                    <TextInput
                        autoComplete={false}
                        placeholder='Search for a Spot'
                        onChangeText={textInputHandler}
                        style={styles.searchbarTextInput}
                        value={textInput}
                    />
                </View>
            </View>
            <View style={styles.flatlistContainer}>
                <FlatList
                    data={suggestedSpots}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.flatlistItem} onPress={() => navigation.navigate('Spot', item)}>
                            <Ionicons name="location-sharp" size={16} color={Colors.almostBlack} />
                            <Text style={styles.flatlistItemText}>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    extraData={suggestedSpots}
                    keyboardShouldPersistTaps='handled'
                />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    searchbarContainer: {
        width: '100%',
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingTop: 40,
    },
    textInputContainer: {
        backgroundColor: Colors.lightGray,
        height: 50,
        width: '90%',
        borderRadius: 40,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchbarTextInput: {
        width: '70%',
        height: '100%',
    },
    flatlistContainer: {
        paddingLeft: 10,
        backgroundColor: Colors.white,
    },
    flatlistItem: {
        flexDirection: 'row',
        paddingVertical: 5,
        alignItems: 'center'
    },
    flatlistItemText: {
        marginLeft: 5,
    }
})

export default SearchBar