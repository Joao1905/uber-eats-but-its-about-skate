import React, { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList, Image, Dimensions, TouchableHighlight, TouchableOpacity } from 'react-native'
import ImageView from "react-native-image-viewing"
import { Entypo } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

import Colors from '../../constants/Colors'
import { profile } from '../../mocks/Profile'

const AccountPhotos = () => {

    const [listOfImages, setListOfImages] = useState(profile.images)
    const [imageVisible, setImageVisible] = useState(false)
    const [imageIndex, setImageIndex] = useState(0)

    const addImageHandler = (localUri) => {
        setListOfImages([...listOfImages, localUri])
        // TODO add to user backend image list
    }

    const deleteImageHandler = (index) => {
        const test = [...listOfImages]
        test.splice(index,1)
        setListOfImages(test)
        // TODO remove from user backend image list
    }

    const addImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
    
        if (!result.cancelled) {
            addImageHandler(result.uri)
        }
    }
    
    return (<>
        <View style={styles.flatlisContainer}>
            <FlatList
                data={listOfImages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) =>
                    <TouchableOpacity onPress={() => {setImageVisible(true);setImageIndex(index)}}>
                        <View style={styles.flatlistImages}>
                            <Image
                                source={{uri: item}}
                                resizeMode='cover'
                                style={styles.flatlistImages}
                            />
                            <TouchableHighlight underlayColor={Colors.gray} style={styles.deletePhotoButton} onPress={() => deleteImageHandler(index)}>      
                                <Entypo name="circle-with-cross" color={Colors.white} size={20} />
                            </TouchableHighlight>
                        </View>
                    </TouchableOpacity>
                }
                numColumns={2}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
            />
        </View>
        <ImageView
            images={listOfImages.map((item) => ({uri: item}))}
            imageIndex={imageIndex}
            visible={imageVisible}
            onRequestClose={() => setImageVisible(false)}
        />
        <TouchableHighlight underlayColor={Colors.gray} style={styles.addPhotoButton} onPress={addImage}>      
            <Entypo name="plus" color={Colors.white} size={30} />
        </TouchableHighlight>
    </>)
}

const styles = StyleSheet.create({
    flatlisContainer: {
        flex: 1,
    },
    flatlistImages: {
        width: Dimensions.get('window').width/2,
        height: Dimensions.get('window').width/2,
    },
    addPhotoButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: Colors.darkGray,
        position: 'absolute',
        top: '42%',
        left: '70%',
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex : 1
    },
    deletePhotoButton: {
        position: 'absolute',
        top: 10,
        right: 10
    }
})

export default AccountPhotos