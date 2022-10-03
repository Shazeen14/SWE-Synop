import React, {useContext, useEffect} from 'react';
import { Text, TouchableOpacity, View, StyleSheet, SafeAreaView, Image } from 'react-native'
import Title from '../components/title'
import { AuthContext } from '../context/AuthContext';
import {StackActions, useNavigation} from '@react-navigation/native';

const ApprenticeshipScreen = () => {
  const { logout, loggedIn, userData } = useContext(AuthContext);
  useEffect(() => {
    if (loggedIn === false) {
      navigation.dispatch(StackActions.replace("Login"));
    }
  }, [loggedIn]);

  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <View style={styles.container}>
      <Title/>
      <View style = {styles.imageContainer}>
        <Image style={styles.image} source={require('../images/3.jpg')} />
      </View>
          <View>
              <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Quiz")}>
                  <Text style={styles.buttonText}>Software Developer</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Software Tester</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.footer}>
          <TouchableOpacity style={styles.logoutButton} mode="contained" onPress={() => logout()}>
          <Text style={{color:'black', fontWeight: '600'}}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} mode="contained" onPress={() => navigation.navigate("Results")}>
          <Text style={{color:'black', fontWeight: '600'}}>View Previous Results</Text>
          </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>

  )
}

export default ApprenticeshipScreen

const styles = StyleSheet.create({
  container: {
    paddingTop: 25, 
    paddingHorizontal: 16,
    height: '100%',
  },
  image: {
    height: 400,
    width: 500,
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
  logoutButton: {
    backgroundColor: '#f0f3bd',
    padding: 10,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  footer: {
    marginBottom: 12,
    paddingVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  } 
})