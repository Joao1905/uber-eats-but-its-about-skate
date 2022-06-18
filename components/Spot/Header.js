import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, TouchableWithoutFeedback } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';

import { addToRoute, removeFromRoute } from '../../store/actions/routes';
import Colors from '../../constants/Colors';

const spot = {
    image: 'https://cdn.bandnewsfmcuritiba.com/band/wp-content/uploads/2017/05/PRACA-29-DE-MARCO.jpg',
    title: 'Praça 29 de Março',
    distance: 10,
    rating: '3.0',
    tags: ['Flatground', 'Hills'],
    likes: 361,
    autor: 'Joao'
}

const spacing = '  •  '

const Header = ({ spot }) => {

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

        if (routes.includes(spot.id))
            setRouteStatus(1)
        else if (!routes.includes(spot.id))
            setRouteStatus(0)
    },[routes])

    const heart = heartStatus
        ? <AntDesign name="heart" size={24} color={Colors.white} />
        : <AntDesign name="hearto" size={24} color={Colors.white} />

    const route = routeStatus
        ? <AntDesign name="pushpin" size={24} color={Colors.white} />
        : <AntDesign name="pushpino" size={24} color={Colors.white} />

    return (<>
        <View style={styles.headerContainer}>
            <Image source={{uri: spot.image}} style={styles.headerImage} resizeMode='cover'/>
            <View style={styles.headerTitle}>
                <Text style={styles.headerTitleText}>{spot.title}</Text>
                <View style={styles.headerSubtitle}>
                    <Text>
                        {spot.tags.map((item, index) => {
                            return item+spacing
                        })}

                        {spot.distance} - {spot.distance+5} min <AntDesign name="clockcircle" size={14} color={Colors.black} />{spacing}
                        {spot.rating} <AntDesign name="star" size={14} color={Colors.black} />{spacing}
                        {spot.likes} <AntDesign name="heart" size={14} color={Colors.black} />
                    </Text>
                </View>
                <View style={styles.headerAutor}>
                    <Text>
                        Spot added by <Text style={styles.headerAutorText}>{spot.autor}</Text>
                    </Text>
                </View>
            </View>
        </View>
        <TouchableWithoutFeedback onPress={() => setHeartStatus(Math.abs(heartStatus-1))}>
            <View style={styles.overlayRight}>
                {heart}
            </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => routeHandler(spot.id)}>
            <View style={styles.overlayLeft}>
                {route}
            </View>
        </TouchableWithoutFeedback>
    </>)
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: Colors.white
    },
    headerImage: {
        width: '100%',
        height: 200,
        backgroundColor: 'red'
    },
    headerTitleText: {
        fontWeight: 'bold',
        fontSize: 26,
    },
    headerTitle: {
        padding: 10
    },
    headerSubtitle: {
        flexDirection: 'row',
        marginTop: 5,
    },
    headerAutor: {
        marginTop: 0,
    },
    headerAutorText: {
        fontWeight: 'bold'
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
        top: 70,
        right: 20,
        height: 30,
        width: 30,
        zIndex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default Header