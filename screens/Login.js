import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react'
import { Button, Text, TextInput, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppButton from '../components/AppButton'
import axios from 'axios';


const Login = ({ navigation }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

const other_login_click = () => {
      navigation.replace('GoogleLogin')
    }


    return (
      <View>
        <View style={styles.form}>


          <TextInput
            placeholder='user ...'
            style={styles.input}
            value={username}
            onChangeText={(e) => {
              setUsername(e)
            }}
          />
          <TextInput
            placeholder='pass ...'
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={(e) => {
              setPassword(e)
            }}
          />

        </View>
        <AppButton
          title='Login'
          onPress={() => {
            /*
            1. Login api
            2. save token to AsyncStorage
            */
            const USER_LOGIN_URL = 'https://osa-api.herokuapp.com/user/login/'
            const headers = {
                'content-type' : 'application/json',
            }


            const loginApi = async () => {
                const loginData = {
                    username: username,
                    password: password
                }
                console.log(loginData);
                

                try {
                    let response = await axios.post(
                    USER_LOGIN_URL,
                    loginData,
                    headers
                  );
                  const token = response.data.token
                  AsyncStorage.setItem("token", token)
                  AsyncStorage.setItem("token_type", "token")
                  console.log('Login successed'); 
                  navigation.replace('Home')    
                  
                } 
                catch (error) {
                    if (error.response) {
                        // Request made and server responded
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                      } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                      } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log('Error', error.message);
                      }
                }
              };

              loginApi()
          }}
          btnStyles = {styles.appButtonContainer}
          btnTxtStyles = {styles.appButtonText}
        />
        <AppButton
          title="Login via Google"
          onPress={other_login_click}
          btnStyles={{
            alignSelf: 'flex-end',
            marginRight: '5%',
            marginTop: '5%',
          }}
          btnTxtStyles={{
            color:'royalblue'
          }}
        />
      </View>
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
})

export default Login