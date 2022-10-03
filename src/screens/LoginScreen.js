import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, withTheme } from "react-native-paper";
import { StackActions } from "@react-navigation/native";

import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation, theme }) => {
  const { colors } = theme;

  const { loggedIn } = useContext(AuthContext);

  useEffect(() => {
    if (loggedIn) {
      navigation.dispatch(StackActions.replace("Account"));
    }
  }, [loggedIn]);

  const { login } = useContext(AuthContext);

  return (

    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style = {styles.imageContainer}>
        <Image style={styles.image} source={require('../images/WeTrainApprentices_v2.png')} />
      </View>
      <View>
        <Text style={{fontsize: 40}}>About Us</Text>
        <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. I
        </Text>
      </View>
      <View>
        <Button style={{backgroundColor: '#028090'}}mode="contained" onPress={() => login()}>
          Login/Sign Up
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingRight: 30,
    paddingLeft: 30,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 400,
    resizeMode: 'contain',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default withTheme(LoginScreen);
