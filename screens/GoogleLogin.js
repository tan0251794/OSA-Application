import React, { Component, useEffect, useState } from 'react'
import { Button, Text, TextInput, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-google-app-auth';

import AppButton from '../components/AppButton'
import axios from 'axios';
import showAlert from '../components/showAlert';

  
  const GoogleLogin = ({navigation}) => {

    const [accessToken, setAccessToken] = useState("")


    const  getGoogleToken = async() => {
      try {
        await Google.logInAsync({
          iosClientId: '908666684854-muh6ulm3eb7b30kl7761vga6ife7bbik.apps.googleusercontent.com',
      }).then((res)=>{
        if (res.type === 'success') {
          console.log(res.accessToken);
          setAccessToken(res.accessToken)
          loginByGoogle()
        } 
      })
      }catch (e){
        console.log(e);
      }
  }

  const loginByGoogle = async() =>{
    await axios
    .post(`http://osa-api.herokuapp.com/api-auth/convert-token`, {
        token: accessToken,
        backend: "google-oauth2",
        grant_type: "convert_token",
        client_id: "kBIvxcB78Ebt0xNfaXofZ1D9PlN0tE4ggQ1yzDDr",
        client_secret: "NISwzvmIG2BlNxsrZ1HmhXYdP4qNgMflTqU7rCiEIHGa0cqacJdA31uljiu7hCtjrZtuPdb8e3CS5rqXIKMtqwb3HlU1MQMekq0P98Ytr83DtHANuhECxXtSxgTsLZtR",
    })
    .then((res) => {
        // Save access token
        const token = res.data.access_token
        AsyncStorage.setItem("token", token)
        AsyncStorage.setItem("token_type", "bearer")
        console.log('Login successed'); 
        navigation.replace('Home')    
    }).catch( error => 
      {
        if (error.response) {
            // Request made and server responded
            showAlert(error.response.data.error, error.response.data.error_description)
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
    

    )
  }



    const other_login_click = () => {
      navigation.replace('Login')
    }

    return (
      
      <View>
        <View style={styles.form}>

        </View>

        <AppButton
          title='Google'
          onPress={getGoogleToken}
          btnStyles = {styles.appButtonContainer}
          btnTxtStyles = {styles.appButtonText}
          />


        <AppButton
          title="... Username Login"
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
    backgroundColor: "crimson",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginLeft: 50,
    marginRight: 50
  },
  appButtonText: {
    fontSize: 18,
    color: "gainsboro",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
})

export default GoogleLogin