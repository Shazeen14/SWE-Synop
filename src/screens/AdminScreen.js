import React, {useContext, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Button, withTheme} from 'react-native-paper';
import {StackActions, useNavigation} from '@react-navigation/native';

import {AuthContext} from '../context/AuthContext';
import { TouchableOpacity } from 'react-native-gesture-handler';



const AdminScreen = ({theme}) => {
  const {logout, loggedIn, userData} = useContext(AuthContext);
  const {colors} = theme;
  useEffect(() => {
    if (loggedIn === false) {
      navigation.dispatch(StackActions.replace("Login"));
    }
  }, [loggedIn]);

  const navigation = useNavigation()

  return (
    <View style = {styles.imageContainer}>
      <Text>Admin Panel</Text>
      <View style = {styles.imageContainer}>
        <Image style={styles.image} source={require('../images/WeTrainApprentices_v2.png')} />
      </View>
      <TouchableOpacity style={styles.button} mode="contained" onPress={() => logout()}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default withTheme(AdminScreen);

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 400,
    resizeMode: 'contain',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    backgroundColor: '#00a896',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  }
});