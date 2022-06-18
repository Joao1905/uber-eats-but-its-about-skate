import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

import Colors from './constants/Colors';

import Home from './screens/Home'
import Spot from './screens/Spot'
import Browse from './screens/Browse';
import Add from './screens/Add';
import Routes from './screens/Routes';
import Account from './screens/Account';
import Settings from './screens/Settings'


const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const screenOptions = {
    headerShown: false,
}

const HomeNavigation = () => {
    return <Stack.Navigator initialRouteName='Home' screenOptions={screenOptions}>
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Spot' component={Spot}/>
    </Stack.Navigator>
}

const AccountNavigation = () => {
    return <Stack.Navigator initialRouteName='Account' screenOptions={screenOptions}>
        <Stack.Screen name='Account' component={Account}/>
        <Stack.Screen name='Settings' component={Settings}/>
    </Stack.Navigator>
}

const RootNavigation = () => {

    const routes = useSelector(state => state.routes.routes)
    const [routeCount, setRouteCount] = useState(routes.length)

    useEffect(() => {
        if (routes.length) setRouteCount(routes.length)
        else setRouteCount(null)
    },[routes])

    return <NavigationContainer>
        <Tab.Navigator initialRouteName='HomeNavigation' screenOptions={{ ...screenOptions, ...tabBarStyles}}>
            <Tab.Screen name='HomeNavigation' component={HomeNavigation} options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => (
                    <Entypo name="home" color={color} size={size} />
                )
            }}/>
            <Tab.Screen name='Browse' component={Browse} options={{
                tabBarLabel: 'Browse',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="ios-search-sharp" color={color} size={size} />
                )
            }}/>
            <Tab.Screen name='Add' component={Add} options={{
                tabBarLabel: 'Add',
                tabBarIcon: ({ color, size }) => (
                    <Entypo name="plus" color={color} size={size} />
                )
            }}/>
            <Tab.Screen name='Routes' component={Routes} options={{
                tabBarLabel: 'Routes',
                tabBarBadge: routeCount,
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="map-marker-distance" color={color} size={size} />
                )
            }}/>
            <Tab.Screen name='AccountNavigation' component={AccountNavigation} options={{
                tabBarLabel: 'Account',
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="account" color={color} size={size} />
                )
            }}/>
        </Tab.Navigator>
    </NavigationContainer>
}

const tabBarStyles = {
    tabBarActiveTintColor: Colors.black,
    tabBarLabelStyle: {
        fontSize: 12
    },
    tabBarIcon: {
        size: 32
    },
    tabBarItemStyle: {
        padding: 5,
    },
    tabBarStyle: {
        height: 60
    },
    tabBarHideOnKeyboard: true,
    tabBarActiveBackgroundColor: Colors.white,
    tabBarInactiveBackgroundColor: Colors.lightGray,
}

export default RootNavigation;