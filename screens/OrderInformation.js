import React, { useState } from 'react'

import { 
    Alert,
    Dimensions,
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TextInput, 
    View } from 'react-native'
import {Picker} from '@react-native-community/picker'
import axios from 'axios'

import AppButton from '../components/AppButton'
import AsyncStorage from '@react-native-async-storage/async-storage'


const OrderInformation = ({ navigation, route }) => {

    const {products} = route.params;

    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [selectedDelivery, setSelectedDelivery] = useState("CUSTOMER_HOME");
    const [selectedPayment, setSelectedPayment] = useState("CASH");


    const pushOrderToApi = async (orderData) => {
        
        console.log(orderData);
        var token = await AsyncStorage.getItem("token")
        var token_type = await AsyncStorage.getItem("token_type")
        console.log(`${token_type} ${token}`);
        const CREATE_ORDER_URL = 'https://osa-api.herokuapp.com/api/order/create/'
        const axiosConfig = {
            headers : {
            'content-type' : 'application/json',
            'Authorization' : `${token_type} ${token}`,
        }
        }

        try {
            await axios.post(
                CREATE_ORDER_URL,
                orderData,
                axiosConfig
            );
            console.log('Push successed');

        // push Products when success

            products.forEach(product => {
            var data = {
                product_url: product.url,
                product_name: product.name,
                quantity: product.quantity,
                memo_from_customer: product.memo,
                order: 1
            }

            pushProductsToApi(JSON.stringify(data))

            });


        }
        catch (error) {

            showAlert('Push order failed');
            
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              } else if (error.request) {
                console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
        }
      };


    const pushProductsToApi = async (data) => {

    /*
    1. if one of products push fail: bool=false
    2. bool=true => navigate
    */

    var bool=true

    var token = await AsyncStorage.getItem("token")
    var token_type = await AsyncStorage.getItem("token_type")
    console.log(`${token_type} ${token}`);
    const CREATE_PRODUCT_URL = 'https://osa-api.herokuapp.com/api/product/create/'
    const axiosConfig = {
        headers : {
        'content-type' : 'application/json',
        'Authorization' : `${token_type} ${token}`,
        }
    }

    try {
    await axios.post(
        CREATE_PRODUCT_URL,
        data,
        axiosConfig
    );
    console.log('Product Push successed'); 
    
    } 
    catch (error) {

        bool=false

        if (error.response) {

            showAlert('Push product failed');

            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
    }

        //Navigate when all products pushed success
        if (bool) {
            navigation.replace('Home')   
        }

    };

    const nextClick = () => {

        if (name.length == 0 || name.length == 0 || phone.length == 0 || address.length == 0)
        {
            showAlert('Please fill out form');
        }
        else 
        {
            /*
            0. Load token
            1. Add order to database via axios
            2. Add product to database via axios
            3. bool: if still true navigate
            */

            const orderData = {
                order_date: new Date(),
                customer_name: name,
                customer_email: mail,
                customer_phone: phone,
                customer_address: address,
                domestic_delivery_method: selectedDelivery,
                payment_method: selectedPayment
            }

            pushOrderToApi(orderData)
        } 
    }


    const showAlert = (message) => Alert.alert(
        "Form Invalid",
        message,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ]
      );



    return (
        <SafeAreaView>

            <Text style={{fontSize:30, paddingBottom:'5%'}}>Customer Information</Text>

            <Text>Customer Name</Text>
            <TextInput 
                style={styles.input}
                value={name}
                onChangeText={(e)=>{setName(e)}}
            ></TextInput>

            <Text>Customer Email</Text>
            <TextInput 
                style={styles.input}
                value={mail}
                onChangeText={(e)=>{setMail(e)}}
            ></TextInput>

            <Text>Customer Phone No</Text>
            <TextInput 
                style={styles.input}
                value={phone}
                onChangeText={(e)=>{setPhone(e)}}
            ></TextInput>

            <Text>Customer Address</Text>
            <TextInput 
                style={styles.input}
                value={address}
                onChangeText={(e)=>{setAddress(e)}}
            ></TextInput>


            
            <View style={styles.screen}>
            <Text>Domestic Delivery Method</Text>
            <Picker 
                style={styles.picker}
                selectedValue={selectedDelivery}
                itemStyle={styles.pickerItem}

                onValueChange={(itemValue, itemIndex) => setSelectedDelivery(itemValue)}
            >
                <Picker.Item label="To delivery to customer home" value="CUSTOMER_HOME" />
                <Picker.Item label="To pick up at branch" value="BRANCH" />
            </Picker>
            </View>

            <View style={styles.screen}>

            <Text>Payment Method</Text>
            <Picker 
                selectedValue={selectedPayment}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                onValueChange={(itemValue, itemIndex) => setSelectedPayment(itemValue)}
            >
                <Picker.Item label="Pay by Cash" value="CASH" />
                <Picker.Item label="Transfer by Bank" value="BANK_ACCOUNT" />
            </Picker>

            
            </View>

            <AppButton
                    title="SUBMIT"
                    onPress={nextClick}
                    btnStyles={{
                        position: 'absolute',
                        marginTop: Dimensions.get('window').height*.84,
                        backgroundColor: 'orange',
                        borderWidth: 1,
                        borderColor: 'gold',
                        width: '100%',
                    }}
                    btnTxtStyles={{
                        color:'white',
                        alignSelf: 'center',
                        fontSize: Dimensions.get('window').height*.07,
                    }}
                />

        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red'
    },
    wrapParent: {
        flexWrap: 'wrap',
        flexDirection: 'row'
    },
    input: {
        fontSize: Dimensions.get('window').height*.015,
        padding: '2%',
        marginTop: '2%',
        marginBottom: '6%',
        alignSelf: 'center',
        width: '98%',
        borderColor: 'grey',
        borderWidth: 1,
      },
      pickerItem: {
          height: Dimensions.get('window').height*.08,
          fontSize: Dimensions.get('window').height*.02,
      },
      picker: {
        width: '95%',
        alignSelf: 'center',
      },
})
export default OrderInformation
