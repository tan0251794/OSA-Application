import React, { useState } from 'react'

import { 
    Button, 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TextInput, 
    View } from 'react-native'
import {Picker} from '@react-native-community/picker'
import axios from 'axios'

import AppButton from '../components/AppButton'
import AsyncStorage from '@react-native-async-storage/async-storage'


const OrderReview = ({ navigation, route }) => {

    const {products} = route.params;

    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [selectedDelivery, setSelectedDelivery] = useState("CUSTOMER_HOME");
    const [selectedPayment, setSelectedPayment] = useState("CASH");




    return (
        <SafeAreaView>

            <Text style={{fontSize:20, paddingBottom:20}}>Order List</Text>

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
        fontSize: 12,
        padding: 5,
        marginTop: 5,
        marginBottom: 15,
        alignSelf: 'center',
        width: 370,
        borderColor: 'grey',
        borderWidth: 1,
      },
      pickerItem: {
          height: 44,
          fontSize: 12,
      },
      picker: {
        width: 380,
      },
})
export default OrderReview
