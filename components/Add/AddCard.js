import React, { useEffect, useReducer } from 'react'
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native'
import { Entypo } from '@expo/vector-icons';

import Values from '../../constants/Values'
import Colors from '../../constants/Colors'
import { 
    imageChangeValidator,
    titleChangeValidator,
    tagsChangeValidator,
    locationChangeValidator,
 } from '../../validation/addCard'

import AddImage from './AddImage'
import AddTags from './AddTags'
import AddTitle from './AddTitle'
import AddMap from './AddMap'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    switch (action.type) {
        case FORM_INPUT_UPDATE: {
            const new_state = {...state}
            new_state.inputValues[action.inputName] = action.value
            new_state.inputValidities[action.inputName] = action.isValid
            new_state.errorMessages[action.inputName] = action.errorMessage

            let form_is_valid = true
            for (const key in new_state.inputValidities)
                if (new_state.inputValidities[key] === false) form_is_valid = false

            new_state.formIsValid = form_is_valid
            return new_state
        }
        default:
            return state
    }
}

const initial_state = {
    inputValues: {
        images: Array(6).fill(false),
        title: '',
        tags: Values.TAGS.reduce((previous, current) => {
            return ({...previous, [current]: false})
        }, {}),
        location: {}
    },
    inputValidities: {
        images: true,
        title: false,
        tags: true,
        location: false
    },
    errorMessages: {
        images: false,
        title: false,
        tags: false,
        location: false
    },
    formIsValid: false
}

const AddCard = () => {

    const [formState, dispatch] = useReducer(formReducer, initial_state)

    const addSpotHandler = () => {
        console.log(formState.formIsValid)
        // TODO POST to backend
        // TODO Whenever add, remove or edit spot, restart "routes" redux state and repopulate "spots" redux state via API
    }

    return (
        <>
            <View style={styles.imageContainer}>
                <AddImage parentReplication={(childImages) => imageChangeValidator(
                    childImages,
                    dispatch,
                    FORM_INPUT_UPDATE
                )}/>
            </View>
            <View style={styles.titleContainer}>
                <AddTitle parentReplication={(childTitle) => titleChangeValidator(
                    childTitle,
                    dispatch,
                    FORM_INPUT_UPDATE
                )}/>
                <AddTags parentReplication={(childTags) => tagsChangeValidator(
                    childTags,
                    dispatch,
                    FORM_INPUT_UPDATE
                )}/>
            </View>
            <View style={styles.mapContainer}>
                <AddMap parentReplication={(childLocation) => locationChangeValidator(
                    childLocation,
                    dispatch,
                    FORM_INPUT_UPDATE
                )}/>
            </View>
            <View style={styles.cardContainer}>
                <TouchableOpacity onPress={addSpotHandler} activeOpacity={0.5} style={styles.sendButtonContainer}>
                    <Entypo style={styles.sendButtonIcon} name="circle-with-plus" color={Colors.almostBlack} size={26} />
                    <View style={styles.sendButtonTextContainer}>
                        <Text style={styles.sendButtonText}>Add Spot</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        alignItems: 'center'
    },
    imageContainer: {
        backgroundColor: Colors.white,
        height: 250,
        marginTop: 40,
    },
    titleContainer: {
        backgroundColor: Colors.white,
        marginTop: 10,
        paddingVertical: 15,
    },
    mapContainer: {
        backgroundColor: Colors.white,
        marginTop: 10,
        paddingVertical: 15,
        flex: 3
    },
    sendButtonContainer: {
        backgroundColor: Colors.white,
        marginVertical: 10,
        width: '75%',
        borderRadius: 10,
        elevation:10,
        height: 50,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    sendButtonTextContainer: {
        width: '80%',
        alignItems: 'center'
    },
    sendButtonText: {
        fontWeight: 'bold',
        marginLeft: 8
    },
    sendButtonIcon: {
        marginLeft: 10
    }
})

export default AddCard