import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoadingScreen from './src/screens/LoadingScreen';
import LoginScreen from './src/screens/LoginScreen';
import AccountScreen from './src/screens/AccountScreen';
import AdminScreen from './src/screens/AdminScreen';
import QuizScreen from './src/screens/QuizScreen';

import {AuthContextProvider} from './src/context/AuthContext';
import ResultScreen from './src/screens/ResultScreen';
import ApprenticeshipScreen from './src/screens/ApprenticeshipScreen';
import MyStack from './navigation';
import GlobalFont from 'react-native-global-font';

const Stack = createNativeStackNavigator();


const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    let fontName = 'Verdana'
   GlobalFont.applyGlobal(fontName);
  }, []);

  return (
    // <View>
    //   <LoginScreen></LoginScreen>
    // </View>
    <SafeAreaView style={styles.root}>
    <AuthContextProvider>
    <NavigationContainer>
      <MyStack></MyStack>
    </NavigationContainer>
    </AuthContextProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;