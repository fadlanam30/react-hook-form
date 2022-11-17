import React from 'react'
import { NativeBaseProvider, extendTheme } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import Router from './src/router'
import { store, persistor } from './src/redux/store'

const theme = extendTheme({
  colors: {
    // Add new color
    customPurple: '#47A9DA'
  }
})

const paperTheme = {
  ...DefaultTheme,
  dark: false
}

export default function App () {
  return (
    <PaperProvider theme={paperTheme}>
      <NativeBaseProvider theme={theme}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <NavigationContainer>
              <Router />
            </NavigationContainer>
          </PersistGate>
        </Provider>
      </NativeBaseProvider>
    </PaperProvider>
  )
}
