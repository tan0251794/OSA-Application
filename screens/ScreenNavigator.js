import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { Button, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import AppButton from '../components/AppButton';
import GoogleLogin from './GoogleLogin';
import Home from './Home';
import Login from './Login';
import OrderInformation from './OrderInformation';
import OrderProduct from './OrderProduct';
import OrderReview from './OrderReview';



const Stack = createNativeStackNavigator();
const ScreenNavigator = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name='Login'
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='GoogleLogin'
        component={GoogleLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Home'
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='OrderProduct'
        component={OrderProduct}
      />
      <Stack.Screen
        name='OrderInformation'
        component={OrderInformation}
      />
      <Stack.Screen
        name='OrderReview'
        component={OrderReview}
      />

    </Stack.Navigator>
  );
};





const styles = StyleSheet.create({
  form: {
    marginTop: 250,
    marginBottom: 50
  },
  input: {
    fontSize: 20,
    padding: 10,
    marginLeft: 50,
    marginRight: 50,
    marginBottom: 5,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#F4D03F",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginLeft: 50,
    marginRight: 50
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
});




export default ScreenNavigator