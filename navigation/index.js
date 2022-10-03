import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ApprenticeshipScreen from '../src/screens/ApprenticeshipScreen';
import QuizScreen from '../src/screens/QuizScreen';
import ResultScreen from '../src/screens/ResultScreen';
import LoadingScreen from '../src/screens/LoadingScreen';
import LoginScreen from '../src/screens/LoginScreen';
import AccountScreen from '../src/screens/AccountScreen';

const Stack = createStackNavigator();

function MyStack() {
  return (
    
    <Stack.Navigator>
      <Stack.Screen name="Loading" component={LoadingScreen} options={{headerShown:false}} />
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown:false}} />
      <Stack.Screen name="Account" component={AccountScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Apprenticeship" component={ApprenticeshipScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Quiz" component={QuizScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Results" component={ResultScreen} options={{headerShown:false}} />

    </Stack.Navigator>
  );
}

export default MyStack