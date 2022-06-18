import React, { useState, useRef, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import { AntDesign, FontAwesome } from '@expo/vector-icons';

import Colors from '../../constants/Colors'
import Values from '../../constants/Values';

const Review = () => {

    const [starArray, setStarArray] = useState(Array(Values.NUMBER_OF_STARS).fill(0))
    const [isSendButtonActive, setIsSendButtonActive] = useState(0)
    const [isRatingSent, setIsRatingSent] = useState(0) // TODO change for backend info

    const starArrayHandler = (index) => {
        const new_array = Array(Values.NUMBER_OF_STARS).fill(0)
        if (starArray[index]) {
            setStarArray(new_array)
            setIsSendButtonActive(0)
            
            const lastStarWasSelected = index === Values.NUMBER_OF_STARS-1
            const starToTheRightIsEmpty = starArray[index+1] === 0
            if (lastStarWasSelected || starToTheRightIsEmpty) return
        }

        for (let i = 0; i <= index; i++) {
            new_array[i] = 1
        }
        setIsSendButtonActive(1)
        setStarArray(new_array)
    }

    const sendHandler = () => {
        setIsRatingSent(1)
        setIsSendButtonActive(0)
    }

    const sendText = isRatingSent ? 'Update' : 'Send'
    const sendButton = isSendButtonActive
    ? <>
        <TouchableOpacity
            activeOpacity={0.6}
            style={styles.reviewSendButton}
            onPress={sendHandler}
        >
            <FontAwesome style={styles.star} name='send' size={14} color={Colors.black} />
            <Text style={styles.reviewSendButtonText}>{sendText}</Text>
        </TouchableOpacity>
    </>
    : null

    return (
        <View style={styles.reviewContainer}>
            <View style={styles.reviewCard}>
                {
                    starArray.map((item, index) => {
                        const icon = item ? 'star' : 'staro'
                        const color = item ? Colors.yellow : Colors.black
                        
                        return (
                            <TouchableWithoutFeedback key={index} onPress={() => starArrayHandler(index)}>
                                <AntDesign name={icon} size={30} color={color} />
                            </TouchableWithoutFeedback>
                        )
                    })
                }
            </View>
            {sendButton}
        </View>
    )
}

const styles = StyleSheet.create({
    reviewContainer: {
        height: 75,
        marginBottom: 20,
        justifyContent: 'center',
    },
    reviewCard: {
        height: '75%',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-around',
        backgroundColor: Colors.white,
    },
    reviewSendButton: {
        backgroundColor: Colors.white,
        position: 'absolute',
        flexDirection: 'row',
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 0,
        right: 30,
        height: 20,
        width: 80,
        borderRadius: 9,
        elevation: 5,
    },
    reviewSendButtonText: {
        marginLeft: 5
    },
})

export default Review