import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useContext } from 'react'
import { AuthContext, AuthContextProvider } from '../context/AuthContext'
import AccountScreen from '../screens/AccountScreen'
import AdminNavigator from './AdminNavigator'
import UserNavigator from './UserNavigator'

const Stack = createNativeStackNavigator();

const RootNavigation = () => {
    const { logout, loggedIn, userData } = useContext(AuthContext);
    const authenticated = false
  return (
      <AuthContextProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Loading" component={LoadingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Account" component={AccountScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContextProvider>
  )
}

export default RootNavigation