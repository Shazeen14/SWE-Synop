import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, Button, withTheme } from "react-native-paper";
import { StackActions } from "@react-navigation/native";

import { AuthContext } from "../context/AuthContext";
import AdminScreen from "./AdminScreen";
import ApprenticeshipScreen from "./ApprenticeshipScreen";
import LoginScreen from "./LoginScreen";

const AccountScreen = ({ navigation, theme }) => {
  const { logout, loggedIn, userData } = useContext(AuthContext);
  const { colors } = theme;
  useEffect(() => {
    if (loggedIn === false) {
      navigation.dispatch(StackActions.replace("Login"));
    }
  }, [loggedIn]);

  return (
    userData == null ? <LoginScreen /> :
    userData.name === 'shazeen1999@hotmail.co.uk' ? <AdminScreen /> :
    <ApprenticeshipScreen/>
  );
};

export default withTheme(AccountScreen);