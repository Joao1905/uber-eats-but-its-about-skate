import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

import Colors from '../../constants/Colors'
import Values from '../../constants/Values'

const AddMap = ({ parentReplication }) => {

    const [marker, setMarker] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied')
                return;
            }

            let api_location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
            setLocation({
                latitude: api_location.coords.latitude,
                longitude: api_location.coords.longitude
            })
            if (!marker)
                parentReplication(location)
        })()
    }, [])

    /*useEffect(() => {
        
    },[location])*/

    const updateMarker = (item) => {
        const coord = item.nativeEvent.coordinate
        parentReplication(coord)

        setMarker(<Marker
            coordinate={{
                latitude: coord.latitude,
                longitude: coord.longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.05,
            }}
            title={'Selected Location'}
        />)
    }

    return (location
        ? <View style={styles.AddMapContainer}>
            <MapView
                style={styles.AddMap}
                onPress={(item) => updateMarker(item)}
                showsUserLocation={true}
                followsUserLocation={true}
                initialRegion={{
                    ...location,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.05,
                }}
            >
                {marker || <Marker
                    coordinate={{
                        ...location,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.05,
                    }}
                    title={'Default Location'}
                />}
            </MapView>
        </View>
        : <View style={styles.AddMapContainer}>
            <Text>Location is not enabled</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    AddMapContainer: {
        marginHorizontal: 20,
        backgroundColor: Colors.lightGray,
        borderRadius: 10,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    AddMap: {
        //margin: 10,
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    loadingText: {

    },
})

export default AddMap;