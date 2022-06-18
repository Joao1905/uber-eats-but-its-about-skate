import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { Ionicons } from '@expo/vector-icons';

import Colors from '../../constants/Colors'

const mockCoordinates = {
    latitude: -25.4282549,
    longitude: -49.2878912,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
}

const mockTitle = 'Praça 29 de Março'

const Map = ({spot}) => {
    return (
        <View style={styles.mapContainer}>
            <View style={styles.mapTextContainer}>
                <Ionicons name="location-sharp" size={20} color={Colors.almostBlack} />
                <Text style={styles.mapText}>
                    <Text style={styles.mapTextHighlight}>{spot.title}</Text> - Curitiba, PR
                </Text>
            </View>
            <MapView style={styles.map} initialRegion={spot.coordinates}>
                <Marker
                    coordinate={spot.coordinates}
                    title={spot.title}
                />
            </MapView>
            
        </View>
    )
}

const styles = StyleSheet.create({
    mapContainer: {
        height: 190,
        backgroundColor: Colors.white,
        marginVertical: 5,
        padding: 10,
    },
    map: {
        width: '100%',
        height: '80%',
    },
    mapTextContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    mapTextHighlight: {
        fontWeight: 'bold',
    },
    mapText: {
        fontSize: 14,
        marginHorizontal: 3
    },
})

export default Map