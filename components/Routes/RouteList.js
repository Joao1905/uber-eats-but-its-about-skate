import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { Ionicons, Entypo } from '@expo/vector-icons';

import { removeFromRoute } from '../../store/actions/routes';
import { getSpotListFromIdList } from '../../utils/getSpotFromId'
import Colors from '../../constants/Colors'

const RouteList = () => {

    const routes = useSelector(state => state.routes.routes)
    const all_spots = useSelector(state => state.spots.spots)
    const route_spots = getSpotListFromIdList(routes, all_spots)

    const [routeSpots, setRouteSpots] = useState(route_spots)

    useEffect(() => {
        const route_spots = getSpotListFromIdList(routes, all_spots)
        setRouteSpots(route_spots)
    },[routes])

    const dispatch = useDispatch()
    const removeHandler = (spot_id) => {
        dispatch(removeFromRoute(spot_id))
    }

    const RouteWarning = routeSpots.length
        ? null
        : <Text style={styles.routeListText}>No routes added yet</Text>

    return (
        <View style={styles.routeListContainer}>
                <Text style={styles.routeListTitle}>Routes</Text>
                {RouteWarning}
                <View style={styles.routeListItemsContainer}>
                {
                    routeSpots.map((item, index) => {
                        const three_dots = index === routeSpots.length-1
                            ? <View key={index}>
                                <ListOfRoutes item={item} onPress={() => removeHandler(item.id)}/>
                            </View>
                            : <View key={index}>
                                <ListOfRoutes item={item}  onPress={() => removeHandler(item.id)}/>
                                <View key={index} style={styles.routeListTextContainer}>
                                    <Entypo name="dots-three-vertical" color={Colors.almostBlack} size={16} />
                                </View> 
                            </View>
                        return three_dots
                    })
                }
                </View>
        </View>
    )
}

const ListOfRoutes = ({ item, onPress }) => {
    return(
        <View  style={styles.routeListTextContainer}>
            <Ionicons name="location-sharp" color={Colors.almostBlack} size={16} />
            <Text style={styles.routeListText}>{item.title}</Text>
            <TouchableOpacity onPress={onPress}>
                <Entypo name="circle-with-cross" color={Colors.almostBlack} size={16} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    routeListContainer: {
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center'
    },
    routeListTitle: {
        marginVertical: 15,
        fontSize: 16,
        fontWeight: 'bold'
    },
    routeListItemsContainer: {
        width: '90%',
    },
    routeListTextContainer: {
        flexDirection: 'row',
    },
    routeListText: {
        marginLeft: 5,
        flex: 1,
    }
})

export default RouteList