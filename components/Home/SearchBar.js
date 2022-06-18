import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeCityFilter } from '../../store/actions/spots';

import Colors from '../../constants/Colors';

const SearchBar = () => {

    const [textInput, setTextInput] = useState(null)

    const city_filter = useSelector(state => state.spots.cityFilter)
    const dispatch = useDispatch()

    const cityFilterHandler = (text_input) => {
        dispatch(changeCityFilter(text_input))
    }

    return (
        <View style={styles.searchbarContainer}>
            <View style={styles.textInputContainer}>
                <Ionicons name="location-sharp" size={24} color={Colors.almostBlack} />
                <TextInput
                    placeholder='Filter by City'
                    style={styles.searchbarTextInput}
                    onChangeText={setTextInput}
                    value={textInput}
                />
                <TouchableOpacity activeOpacity={0.6} onPress={() => cityFilterHandler(textInput)}>
                    <View style={styles.searchbarButtonContainer}>
                        <Ionicons name="location-sharp" size={16} color={Colors.almostBlack} />
                        <Text>Filter</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searchbarContainer: {
        width: '100%',
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
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
    searchbarButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
    },
})

export default SearchBar;