import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux'

import Colors from '../../constants/Colors';
import { getSpotFromId } from '../../utils/getSpotFromId'
import { addToRoute, removeFromRoute, changeCityFilter } from '../../store/actions/routes';

const CardsList = ({navigation}) => {

    const spot = useSelector(state => state.spots.filteredSpots) // TODO concat with state.spots.locationFilteredSpots
    const city_filter = useSelector(state => state.spots.cityFilter)
    const [spotArray, setSpotArray] = useState()

    useEffect(() => {
        const shown_spots = spot.filter((item) => item.location.toLowerCase().includes(city_filter.toLowerCase()))
        setSpotArray(shown_spots)
    }, [spot, city_filter])

    return (
        <View style={styles.cardListContainer}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={spotArray}
                renderItem={({item}) => (
                    <Card
                        onPress={() => navigation.navigate('Spot', item)}
                        image={{uri: item.image}}
                        title={item.title}
                        distance={`${item.distance} - ${item.distance+5} • min`}
                        rating={item.rating}
                        id={item.id}
                    />
                )}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
}

const Card = ({ image, title, distance, rating, onPress, id }) => {

    const routes = useSelector(state => state.routes.routes)
    const [routesState, setRoutesState] = useState(routes)

    const [heartStatus, setHeartStatus] = useState(0)
    const [routeStatus, setRouteStatus] = useState(0)    

    const dispatch = useDispatch()

    const routeHandler = (spot_id) => {
        const isSelected = Math.abs(routeStatus-1)
        if (isSelected) dispatch(addToRoute(spot_id))
        else dispatch(removeFromRoute(spot_id))
    }

    useEffect(() => {
        setRoutesState(routes)

        if (routes.includes(id))
            setRouteStatus(1)
        else if (!routes.includes(id))
            setRouteStatus(0)
    },[routes])

    const heart = heartStatus
        ? <AntDesign name="heart" size={24} color={Colors.white} />
        : <AntDesign name="hearto" size={24} color={Colors.white} />

    const route = routeStatus
        ? <AntDesign name="pushpin" size={24} color={Colors.white} />
        : <AntDesign name="pushpino" size={24} color={Colors.white} />

    return (
        <>
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={styles.card}>
                    <Image
                        source={image}
                        resizeMode='cover'
                        style={styles.cardImage}
                    />
                    <View style={styles.cardTextContainer}>
                        <View>
                            <Text style={styles.cardTitle}>{title}</Text>
                            <Text style={styles.cardSubtitle}>{distance}</Text>
                        </View>
                        <View style={styles.cardRatingContainer}>
                            <Text>{rating}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setHeartStatus(Math.abs(heartStatus-1))}>
                <View style={styles.overlayRight}>
                    {heart}
                </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => routeHandler(id)}>
                <View style={styles.overlayLeft}>
                    {route}
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}

const styles = StyleSheet.create({
    cardListContainer: {
        flex: 1,
    },
    overlayRight: {
        position: 'absolute',
        top: 30,
        right: 20,
        height: 30,
        width: 30,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    overlayLeft: {
        position: 'absolute',
        top: 30,
        left: 20,
        height: 30,
        width: 30,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        backgroundColor: Colors.white,
        height: 220,
        alignItems:'center',
        padding: 15,
        marginTop: 10,
    },
    cardImage: {
        width: '100%',
        height: '80%',
    },
    cardTextContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,
    },
    cardSubtitle: {
        color: Colors.darkGray
    },
    cardRatingContainer: {
        height: 30,
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightGray,
        borderRadius: 20,
    },
})

export default CardsList;