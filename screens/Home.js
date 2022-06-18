import React from 'react'
import { StyleSheet, SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native'

import Header from '../components/Home/Header'
import ScrollBar from '../components/Home/ScrollBar'
import SearchBar from '../components/Home/SearchBar'
import CardsList from '../components/Home/CardsList'
import Colors from '../constants/Colors'
import RouteOverlay from '../components/Home/RouteOverlay'

const Home = ({ navigation }) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <>
            <SafeAreaView style={styles.container}>
                <Header/>
                <SearchBar/>
                <ScrollBar/>
                <CardsList navigation={navigation}/>
            </SafeAreaView> 
            <RouteOverlay navigation={navigation}/>
            </>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightGray,
    },
})

export default Home
