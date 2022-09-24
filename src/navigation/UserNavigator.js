import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import AccountScreen from '../screens/AccountScreen'

const UserNavigator = () => {

    const UserStack = createStackNavigator()
  return (
      <UserStack.Navigator>
          <UserStack.Screen name='Quiz' component={QuizScreen}/>
      </UserStack.Navigator>

  )
}

export default UserNavigator