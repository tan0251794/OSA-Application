import React, { useState } from 'react'

import {
    Button,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native'
import { Picker } from '@react-native-community/picker'
import axios from 'axios'

import AppButton from '../components/AppButton'
import AsyncStorage from '@react-native-async-storage/async-storage'


const OrderHistory = ({ navigation }) => {

    const [data, setData] = useState([]);




    React.useEffect(() => {
        const getOrderByUser = async () => {
            
            //Authorization
            var token = await AsyncStorage.getItem("token")
            var token_type = await AsyncStorage.getItem("token_type")
            console.log(`${token_type} ${token}`);
            const axiosConfig = {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `${token_type} ${token}`,
                }
            }
            const VIEW_ORDER_BY_USER_URL = 'https://osa-api.herokuapp.com/api/order/'

            try {
                let response = await axios.get(
                    VIEW_ORDER_BY_USER_URL,
                    axiosConfig
                );
                let json = response.data
                console.log(json);
                setData(json);
            }
            catch (error) {
                console.error(error);
            }
        };

        getOrderByUser()
    }, [])

    const ShowOrderBox = () => {
        return data.map((item, key) => {
            return (
                <View key={key} style={{
                    borderTopWidth: 1,
                    borderColor: 'grey',
                    padding: 15,
                    flexWrap: 'wrap',
                    flexDirection: 'row'
                }}>

                    

                <Text style={styles.txt1}>Order ID</Text>
                <Text style={styles.txt2}>
                    {item.id}
                </Text>
                <Text style={styles.txt1}>Order Status</Text>
                <Text style={styles.txt2}>
                    {item.status}
                </Text>
                <Text style={styles.txt1}>Order Date</Text>
                <Text style={styles.txt2}>
                    {item.order_date}
                </Text>
                <Text style={styles.txt1}>Total Price</Text>
                <Text style={styles.txt2}>
                    {item.fix_total_fee}
                </Text>
                <Text style={styles.txt1}>Delivery Method</Text>
                <Text style={styles.txt2}>
                    {item.domestic_delivery_method}
                </Text>
                <Text style={styles.txt1}>Delivery Date</Text>
                <Text style={styles.txt2}>
                    {item.delivery_date}
                </Text>
                <Text style={styles.txt1}>Payment Method</Text>  
                <Text style={styles.txt2}>
                    {item.payment_method}
                </Text>

                </View>
            )
        })
    }

    return (
        <SafeAreaView>
            <ScrollView>

            <Text style={{ fontSize:30, paddingBottom:'4%' }}>Order History</Text>

            <ShowOrderBox/>


            </ScrollView>
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
    txt1: {
        fontSize: 13,
        alignSelf: 'flex-start',
        width: '40%',
        height: 20,
    },
    txt2: {
        fontSize: 13,
        alignSelf: 'flex-start',
        width: '60%',
        height: 20,
    }
})
export default OrderHistory
