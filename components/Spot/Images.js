import React from 'react'
import { StyleSheet, View, Text, Image, Dimensions} from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

import Colors from '../../constants/Colors'

const spot = {
    secondary_images: [
        'https://curitibaspace.com.br/wp-content/uploads/2016/08/Praca-29-de-Marco-Curitiba-Space-1.jpg',
        'https://3.bp.blogspot.com/-gyGGe5_4QCI/W6_f4oMZulI/AAAAAAAAHm4/2wbU44Sm2Yc8DsJOHzIDA09LXrgVaagNwCEwYBhgL/s1600/20180707165159_FAO__DSC2014blog.jpg',
        'https://media.gazetadopovo.com.br/haus/2019/06/praca-29-marco-merces-curitiba-bongestabs-primeira-grande-reforma-haus-gazeta-do-povo-6-768x512-936fccc0.jpg',
        'https://1.bp.blogspot.com/-9ZErwxC__-g/W6_f24_DjmI/AAAAAAAAHl8/w91EarImQiwfU-XIaIAaVxT59zxUKORVACEwYBhgL/s1600/20180707163055_FAO__DSC1967blog.jpg',
        'https://i.ytimg.com/vi/iu4RKmFWJ74/maxresdefault.jpg'
    ]
}

const Images = ({ spot }) => {
    return (
        <View style={styles.imagesContainer}>
            <View style={styles.imagesTextContainer}>
                <FontAwesome name="picture-o" size={16} color={Colors.almostBlack} />
                <Text style={styles.imageText}>Images</Text>
            </View>
            {
                spot.secondary_images.map((item, index) => {
                    const isSecondImage = index%2 === 1
                    const isLastItem = index === spot.secondary_images.length-1
                    if (isSecondImage) {
                        return (
                            <ImageRow key={index} images={[spot.secondary_images[index-1], spot.secondary_images[index]]}/>
                        )
                    } else if (isLastItem) {
                        return (
                            <ImageRow key={index} images={[spot.secondary_images[index], null]}/>
                        )
                    }
                })
            }
        </View>
    )
}

const ImageRow = ({ images }) => {
    return (
        <View style={styles.imageRow}>
            {
                images.map((item, index) => {
                    if (!item) return
                    if (index === 1 || images[index+1]) return <Image resizeMode='cover' key={index} style={styles.imageRowImage} source={{ uri: item }}/>
                    return <Image resizeMode='cover' key={index} style={styles.imageRowImageLarge} source={{ uri: item }}/>
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    imagesContainer: {
        marginTop: 10,
        marginVertical: 5,
        paddingVertical: 5,
        backgroundColor: Colors.white,
        width: '100%',
    },
    imagesTextContainer: {
        marginHorizontal: 12,
        marginVertical: 6,
        flexDirection: 'row',
        alignItems: 'center'
    },
    imageText: {
        fontWeight: 'bold',
        marginHorizontal: 5
    },
    imageRow: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    imageRowImage: {
        width: Dimensions.get('window').width * 0.47,
        height: Dimensions.get('window').width * 0.3,
        margin: 2,
        borderRadius: 5
    },
    imageRowImageLarge: {
        width: Dimensions.get('window').width * 0.95,
        height: Dimensions.get('window').width * 0.5,
        margin: 2,
        borderRadius: 5
    }
})

export default Images