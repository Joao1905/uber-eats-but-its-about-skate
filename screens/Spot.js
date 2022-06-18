import React from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native'

import Header from '../components/Spot/Header'
import Review from '../components/Spot/Review'
import Map from '../components/Spot/Map'
import Images from '../components/Spot/Images'
import Colors from '../constants/Colors'

const Spot = ({ route }) => {

    // TODO only render <Images> if there are available images

    const spot = route.params

    const images = spot.secondary_images.length > 0
        ? <Images spot={spot}/>
        : null

    return (
        <>
            <ScrollView style={styles.container}>
                <Header spot={spot}/>
                {images}
                <Map spot={spot}/>
                <Review/>
            </ScrollView>            
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGray,
    },
})

export default Spot