import React from 'react'
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
// import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faHammer } from '@fortawesome/free-solid-svg-icons'


import AppButton from '../components/AppButton'



const Home = ({ navigation, route }) => {

    const navigateNewOrder = () => {  
        navigation.navigate('OrderProduct')
    }

    const navigateOrderHistory = () => {  
        navigation.navigate('OrderReview')
    }



    return (
        <SafeAreaView>
            <ScrollView>

                <View style={styles.banner}>
                    <Text><FontAwesomeIcon icon={ faHammer } /> Banner Area</Text>
                </View>

                

                <AppButton 
                    iconBool= {true}
                    title="New Order"
                    onPress={navigateNewOrder}
                    btnStyles={{
                        marginTop: 50,
                        marginBottom: 10,
                        marginLeft: 10,
                        width: '95%',
                        height: 40,
                        backgroundColor: 'gainsboro',
                        alignItems: 'left',
                        justifyContent: 'center',
                        borderColor: 'ghostwhite',
                        borderWidth: 1,
                    }}
                    btnTxtStyles={{
                        paddingLeft: 20,
                    }}
                />

                <AppButton 
                    iconBool= {true}
                    title="Order History"
                    onPress={navigateOrderHistory}
                    btnStyles={{
                        marginTop: 10,
                        marginBottom: 40,
                        marginLeft: 10,
                        width: '95%',
                        height: 40,
                        backgroundColor: 'gainsboro',
                        alignItems: 'left',
                        justifyContent: 'center',
                        borderColor: 'ghostwhite',
                        borderWidth: 1,
                    }}
                    btnTxtStyles={{
                        paddingLeft: 20,
                    }}
                />

                <View style={styles.banner}>
                    <Text><FontAwesomeIcon icon={ faHammer } /> Banner Area</Text>
                </View>
                <View style={styles.banner}>
                    <Text><FontAwesomeIcon icon={ faHammer } /> Banner Area</Text>
                </View>

            </ScrollView>
        </SafeAreaView>
    )
}



const styles = StyleSheet.create({
    banner: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: Dimensions.get('window').height/4.2,
        borderWidth: 1,
        borderColor: 'white',
        backgroundColor: 'orange'
    },
})
export default Home
