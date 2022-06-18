import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { useDispatch } from 'react-redux'

import Colors from '../../constants/Colors'
import { addFilter, removeFilter } from '../../store/actions/spots'; 

const ScrollBar = () => {

    const dispatch = useDispatch()

    const addFilterHandler = (filter_name) => {
        const new_state = Math.abs(selectedArray[filter_name]-1)
        setSelectedArary({...selectedArray, [filter_name]: new_state})

        if (new_state) dispatch(addFilter(filter_name))
        else dispatch(removeFilter(filter_name))
    }

    const [selectedArray, setSelectedArary] = useState({
        Flatground: 1,
        Stairs: 1,
        Handrails: 1,
        Ramps: 1,
        Hills: 1,
        Bowls: 1
    })

    return (
        <View>
            <ScrollView
                contentContainerStyle={styles.scrollbarItems}
                style={styles.scrollbarContainer}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                <TouchableOpacity activeOpacity={0.6} style={styles.scrollbarItemsContainer} onPress={() => addFilterHandler('Flatground')}>
                    <Entypo name="drive" size={30} color={selectedArray.Flatground ? Colors.black : Colors.gray} />
                    <Text style={styles.scrollbarText}>Flatground</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={styles.scrollbarItemsContainer} onPress={() => addFilterHandler('Stairs')}>
                    <MaterialIcons name="stairs" size={30} color={selectedArray.Stairs ? Colors.black : Colors.gray} />
                    <Text style={styles.scrollbarText}>Stairs</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={styles.scrollbarItemsContainer} onPress={() => addFilterHandler('Handrails')}>
                    <MaterialCommunityIcons name="pier" size={30} color={selectedArray.Handrails ? Colors.black : Colors.gray} />
                    <Text style={styles.scrollbarText}>Handrails</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={styles.scrollbarItemsContainer} onPress={() => addFilterHandler('Ramps')}>
                    <MaterialCommunityIcons name="arrow-up-bold-box" size={30} color={selectedArray.Ramps ? Colors.black : Colors.gray} />
                    <Text style={styles.scrollbarText}>Ramps</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={styles.scrollbarItemsContainer} onPress={() => addFilterHandler('Hills')}>
                    <MaterialCommunityIcons name="slope-downhill" size={30} color={selectedArray.Hills ? Colors.black : Colors.gray} />
                    <Text style={styles.scrollbarText}>Hills</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} style={styles.scrollbarItemsContainer} onPress={() => addFilterHandler('Bowls')}>
                    <Entypo name="bowl" size={30} color={selectedArray.Bowls ? Colors.black : Colors.gray} />
                    <Text style={styles.scrollbarText}>Bowls</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    scrollbarContainer: {
        backgroundColor: Colors.white,
        marginTop: 5,
        height: 65,
    },
    scrollbarItems: {
        alignItems: 'center',
        paddingHorizontal: 15,
    },
    scrollbarItemsContainer: {
        alignItems: 'center',
        marginHorizontal: 12,
    },
    scrollbarText: {
        fontWeight: 'bold',
        color: Colors.almostBlack,
    },
})

export default ScrollBar