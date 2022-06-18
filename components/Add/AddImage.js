import React, { useState } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker'

import Colors from '../../constants/Colors'

const AddImage = ({ parentReplication }) => {

    const [imagesArray, setImagesArray] = useState(Array(6).fill(false))

    const pickImage = async (index) => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
    
        if (!result.cancelled) {
            const newImages = [...imagesArray]
            newImages[index] = result.uri
            setImagesArray(newImages)
            parentReplication(newImages)
        }
    }

    const unpickImage = (index) => {
        const newImages = [...imagesArray]
        newImages[index] = false
        setImagesArray(newImages)
        parentReplication(newImages)
    }

    return (
        <View style={styles.imageContainer}>
            <FlatList 
                numColumns={3}
                keyExtractor={(item, index) => index.toString()}
                data={imagesArray}
                renderItem={({item, index}) => {
                    return <ImageBox
                        onPress={() => {pickImage(index)}}
                        onPressCancel={() => {unpickImage(index)}}
                        image={item}
                        extraData={item}
                    />
                }}
                contentContainerStyle={styles.flatlistContent}
            />
        </View>
    )
}

const ImageBox = ({image, onPress, onPressCancel}) => {

    const imageElement = image
        ? <ImageBackground source={{uri: image}} style={styles.imageBoxImage} resizeMode='cover'>
            <TouchableOpacity style={{...styles.imageBoxButton, backgroundColor: 'rgba(255,255,255,0.7)'}} onPress={onPressCancel}>
            <Entypo name="cross" color={Colors.almostBlack} size={20} />
        </TouchableOpacity>
        </ImageBackground>
        : <TouchableOpacity style={styles.imageBoxButton} onPress={onPress}>
            <Entypo name="plus" color={Colors.almostBlack} size={20} />
        </TouchableOpacity>


    return (
        <View style={styles.imageBox}>
            {imageElement}
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        width: '100%',
        height: 250,
        paddingTop: 10,
    },
    imageBox: {
        width: 100,
        height: 100,
        borderRadius: 10,
        margin: 5,
        backgroundColor: Colors.lightGray
    },
    flatlistContent: {
        alignItems: 'center',
        margin: 5
    },
    imageBoxButton: {
        width: '25%',
        height: '25%',
        margin: 8,
        borderRadius: 10,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageBoxImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    }
})

export default AddImage