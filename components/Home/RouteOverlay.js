import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text, Modal, TouchableOpacity, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import { Ionicons, Entypo } from '@expo/vector-icons';

import { getSpotFromId, getSpotListFromIdList } from '../../utils/getSpotFromId'
import Colors from '../../constants/Colors'

const RouteOverlay = ({ navigation }) => {

    const [buttonVisible, setButtonVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const [routeSpots, setRouteSpots] = useState([])

    const added_spots = useSelector(state => state.routes.routes)
    useEffect(() => {
        if (added_spots.length) setButtonVisible(true)
        else setButtonVisible(false)
    },[added_spots])

    const all_spots = useSelector(state => state.spots.spots)
    useEffect(() => {
        const route_items = getSpotListFromIdList(added_spots, all_spots)
        setRouteSpots(route_items)
    },[added_spots])

    const redirectHandler = () => {
        navigation.navigate('Routes')
        setModalVisible(false)
    }

    const button = buttonVisible
        ? <TouchableOpacity style={styles.overlayButton} onPress={() => setModalVisible(true)}>
            <View style={styles.textContainer}>
                <Text style={styles.overlayButtonText}>View Spots</Text>
            </View>
            <View style={styles.itemsContainer}>
                <Text style={styles.overlayButtonItems}>{added_spots.length}</Text>
            </View>
        </TouchableOpacity>
        : <></>

    return (<>
        {button}
        <Modal animationType='slide' visible={modalVisible} transparent={true} onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
                <View style={styles.modalBox}>
                    <Text style={styles.modalTitle}>Routes</Text>
                    <View style={styles.modalItemsContainer}>
                    {
                        routeSpots.map((item, index) => {
                            const three_dots = index === routeSpots.length-1
                                ? <View key={index}>
                                    <ListOfRoutes item={item}/>
                                </View>
                                : <View key={index}>
                                    <ListOfRoutes item={item}/>
                                    <View key={index} style={styles.modalTextContainer}>
                                        <Entypo name="dots-three-vertical" color={Colors.almostBlack} size={16} />
                                    </View> 
                                </View>
                            return three_dots
                        })
                    }
                    </View>
                    <TouchableOpacity style={styles.overlayButton} onPress={redirectHandler}>
                        <View style={styles.textContainer}>
                            <Text style={styles.overlayButtonText}>Routes</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </>)
}

const ListOfRoutes = ({ item }) => {
    return(
        <View  style={styles.modalTextContainer}>
            <Ionicons name="location-sharp" color={Colors.almostBlack} size={16} />
            <Text style={styles.modalText}>{item.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    overlayButton: {
        position: 'absolute',
        width: '70%',
        height: 40,
        backgroundColor: Colors.blackAlpha,
        bottom: 20,
        left: '15%',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemsContainer: {
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 1,
        alignItems: 'center'
    },
    overlayButtonItems: {
        color: Colors.white,
    },
    overlayButtonText: {
        color: Colors.white
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: Colors.blackAlpha2
    },
    modalBox: {
        height: '50%',
        backgroundColor: Colors.white,
        alignItems: 'center'
    },
    modalTitle: {
        marginVertical: 15,
        fontSize: 16,
        fontWeight: 'bold'
    },
    modalItemsContainer: {
        width: '90%',
    },
    modalTextContainer: {
        flexDirection: 'row',
    },
    modalText: {
        marginLeft: 5
    }
})

export default RouteOverlay