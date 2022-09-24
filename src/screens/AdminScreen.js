import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import {Button, withTheme } from "react-native-paper";
import { StackActions } from "@react-navigation/native";

import { AuthContext } from "../context/AuthContext"; 

const AdminScreen = ({ navigation, theme }) => {
    const { logout, loggedIn, userData } = useContext(AuthContext);
    const { colors } = theme;
    // useEffect(() => {
    //   if (loggedIn === false) {
    //     navigation.dispatch(StackActions.replace("Login"));
    //   }
    // }, [loggedIn]);

  return (
    <View>
        <Text>Welcome to the admin screen</Text>
            <Button mode="contained" onPress={() => logout()}>
            Logout
            </Button>
    </View>
  )
}

export default withTheme(AdminScreen);