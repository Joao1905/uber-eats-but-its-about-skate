import { StyleSheet, Text, View } from 'react-native'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import RootNavigation from './Navigation'
import spotsReducer from './store/reducers/spots'
import routesReducer from './store/reducers/routes'

const rootReducer = combineReducers({
  spots: spotsReducer,
  routes: routesReducer,
})

const store = createStore(rootReducer)

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation/>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
