import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import AdminNavigator from './AdminNavigator'
import UserNavigator from './UserNavigator'

const RootNavigation = () => {

    const authenticated = false
  return (
    <NavigationContainer>
        {authenticated ? <UserNavigator/> : <AdminNavigator/>}
    </NavigationContainer>
  )
}

export default RootNavigation