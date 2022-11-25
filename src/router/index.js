import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import HomeScreen from '../screens/home'
import UserFormScreen from '../screens/user-form'
import DetailScreen from '../screens/detail'

const Stack = createNativeStackNavigator()

const Router = () => (
  <Stack.Navigator
    initialRouteName="HomeScreen"
    screenOptions={{ headerShown: false }}
  >
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="DetailScreen" component={DetailScreen} />
    <Stack.Screen name="UserFormScreen" component={UserFormScreen} />
  </Stack.Navigator>
)

export default Router
