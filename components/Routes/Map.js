import React, { useState, useEffect }from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MapView, { Marker, Polyline } from 'react-native-maps'
import { useSelector, useDispatch } from 'react-redux'
import { MapViewDirections } from 'react-native-maps-directions'

import { getSpotFromId, getSpotListFromIdList } from '../../utils/getSpotFromId'
import Values from '../../constants/Values'
import Colors from '../../constants/Colors'

const Map = () => {

    const routes = useSelector(state => state.routes.routes)
    const all_spots = useSelector(state => state.spots.spots)
    const route_spots = getSpotListFromIdList(routes, all_spots)
    const routeSpotLocations = route_spots.map(item => item.coordinates)

    const [routeSpots, setRouteSpots] = useState(route_spots)
    const [routeCoords, setRouteCoords] = useState(routeSpotLocations)

    useEffect(() => {
        const route_spots = getSpotListFromIdList(routes, all_spots)
        const routeSpotLocations = route_spots.map(item => item.coordinates)
        setRouteSpots(route_spots)
        setRouteCoords(routeSpotLocations)
    },[routes])

    switch (routeCoords.length) {
        case 0:
            return (
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        initialRegion={{
                            ...Values.MAP_DEFAULT_LOCATION,
                            ...Values.MAP_DEFAULT_ZOOM
                        }}
                        region={routeCoords[0]}
                    />
                </View>
            )
        case 1:
            return (
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        initialRegion={routeCoords[0]}
                        region={routeCoords[0]}
                    >
                        <Marker
                            coordinate={{
                                ...routeCoords[0],
                                ...Values.MAP_DEFAULT_ZOOM
                            }}
                            title={routeSpots[0].title}
                        />
                    </MapView>
                </View>
            )
        default:
            return (
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        showsUserLocation={true}
                        followsUserLocation={true}
                        initialRegion={routeCoords[0]}
                        region={routeCoords[0]}
                    >
                        {
                            routeCoords.map((coordinates, index) => {
                                if (index == 0)
                                    return(
                                        <Marker
                                            key={index}
                                            coordinate={{
                                                ...coordinates,
                                                ...Values.MAP_DEFAULT_ZOOM
                                            }}
                                            title={routeSpots[index].title}
                                        />
                                    )
                                else {
                                    return(<View key={index}>
                                        <Polyline
                                            coordinates={[routeCoords[index-1], routeCoords[index]]}
                                            strokeColor={Colors.markerRed}
                                            strokeWidth={2}
                                        />
                                        <Marker
                                            coordinate={{
                                                ...coordinates,
                                                ...Values.MAP_DEFAULT_ZOOM
                                            }}
                                            title={routeSpots[index].title}
                                        />
                                    </View>)
                                }
                            })
                        }
                    </MapView>
                </View>
            )
    }
}

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: '60%',
    },
    map: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
})

export default Map