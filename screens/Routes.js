import React from 'react'
import { StyleSheet, View } from 'react-native'

import RouteList from '../components/Routes/RouteList'
import Map from '../components/Routes/Map'
import Colors from '../constants/Colors'

const Routes = () => {
    return (
        <View style={styles.routeContainer}>
            <Map/>
            <RouteList/>
        </View>
    )
}

const styles = StyleSheet.create({
    routeContainer: {
        flex: 1,
        backgroundColor: Colors.lightGray
    }
})

export default Routes