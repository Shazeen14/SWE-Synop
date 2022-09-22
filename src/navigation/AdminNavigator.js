import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import AdminScreen from '../screens/AdminScreen'

const AdminNavigator = () => {

    const UserStack = createStackNavigator()
  return (
      <UserStack.Navigator>
          <UserStack.Screen name='Admin' component={AdminScreen}/>
      </UserStack.Navigator>

  )
}

export default AdminNavigator