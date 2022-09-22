import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import AccountScreen from '../screens/AccountScreen'

const UserNavigator = () => {

    const UserStack = createStackNavigator()
  return (
      <UserStack.Navigator>
          <UserStack.Screen name='Account' component={AccountScreen}/>
      </UserStack.Navigator>

  )
}

export default UserNavigator