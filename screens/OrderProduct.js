import React, { Component } from 'react'

import { 
    Alert, 
    Dimensions, 
    SafeAreaView, 
    ScrollView, 
    StyleSheet, 
    Text, 
    TextInput, 
    View 
} from 'react-native'

import AppButton from '../components/AppButton'


class OrderProduct extends Component{
    constructor(props) {
        super(props);
        this.state = {
            productFormId : [
                {
                    id: 0,
                    url: '',
                    name: '',
                    quantity: '',
                    memo: '',
                },
            ],
        };
        this.nextClick = this.nextClick.bind(this)
        this.showAlert = this.showAlert.bind(this)
        this.addProduct = this.addProduct.bind(this)
        this.deleteProduct = this.deleteProduct.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    nextClick(){
        var bool = true

        this.state.productFormId.forEach(productFormData => {
            if (
                productFormData.url.length == 0 || 
                productFormData.quantity.length == 0 || 
                productFormData.memo.length == 0
            ){
                this.showAlert('Please fill out form')
                bool = false
            }
            else if (isNaN(productFormData.quantity)){
                this.showAlert('Quantity Need a Number');
                bool = false
            }
            else if (productFormData.url.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g) === null)
            {
                this.showAlert('Invalid Url');
                bool = false
            }
        })
        if (bool){
            console.log(this.state.productFormId)
            this.props.navigation.navigate('OrderInformation', {products: this.state.productFormId})
        }
    }

    showAlert = (message) => Alert.alert(
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
    

    addProduct(){
        const currentFormCount = this.state.productFormId.length

        const data = {
            id: currentFormCount,
            url: '',
            name: '',
            quantity: '',
            memo: '',
        }

        var newForm = this.state.productFormId
        newForm.push(data)
        this.setState({
            productFormId: newForm
        })
    }

    deleteProduct(){
        const currentFormCount = this.state.productFormId.length

        if (currentFormCount > 1) {
            var newForm = this.state.productFormId
            newForm.pop(currentFormCount)
            this.setState({
                productFormId: newForm
            })            
        }
    }

    onChange(e, tag, formId){
        var curForm = this.state.productFormId[formId]
        curForm[tag] = e

        this.setState({
            ...this.state.productFormId, [formId]: curForm
        })      
    }




    render (){
        return (
            <SafeAreaView>
            <ScrollView>
            <Text style={{fontSize:30, paddingBottom:'4%'}}>Make Order</Text>

            {
            this.state.productFormId.map((item, key) => {
                return (
                    <View key={key}>

                    <Text 
                    style={{
                        fontSize:20, 
                        paddingBottom:10,
                        fontWeight: 'bold',
                    }}>Product Information No. {key+1}</Text>

                        <Text>URL</Text>
                        <TextInput 
                            style={styles.input}
                            value={item.url}
                            onChangeText={(e)=>{this.onChange(e, 'url', key)}}
                        ></TextInput>

                        <Text>Product Name</Text>
                        <TextInput 
                            style={styles.input}
                            value={item.name}
                            onChangeText={(e)=>{this.onChange(e, 'name', item.id)}}
                        ></TextInput>

                        <Text>Quantity</Text>
                        <TextInput 
                            style={styles.input}
                            value={item.quantity}
                            onChangeText={(e)=>{this.onChange(e, 'quantity', item.id)}}
                        ></TextInput>

                        <Text>Memo</Text>
                        <TextInput 
                            style={styles.input}
                            value={item.memo}
                            onChangeText={(e)=>{this.onChange(e, 'memo', item.id)}}
                        ></TextInput>

                    </View>
                )
        })
            }
            
            <View style={{position:'related', marginTop:'2%', marginBottom: '40%'}}>
                <AppButton 
                    title='Add Product'
                    onPress={this.addProduct}
                    btnStyles={{
                        position:'absolute',
                        marginLeft: 10,
                        backgroundColor: 'orange',
                        borderWidth: 1,
                        borderColor: 'gold',
                        width: '35%',
                        height: Dimensions.get('window').height/22,
                        justifyContent: 'center',
                    }}
                    btnTxtStyles={{
                        color:'white',
                        alignSelf: 'center',
                        padding: 5,
                        fontSize: 15,
                    }}
                />

                <AppButton 
                    title='Delete Product'
                    onPress={this.deleteProduct}
                    btnStyles={{
                        position:'absolute',
                        marginLeft: '60%',
                        backgroundColor: 'lightpink',
                        borderWidth: 1,
                        borderColor: 'pink',
                        width: '30%',
                        height: Dimensions.get('window').height/22,
                        justifyContent: 'center',
                    }}
                    btnTxtStyles={{
                        alignSelf: 'center',
                        padding: 5,
                        fontSize: 15,
                    }}
                />
            </View>

                

            </ScrollView>

            <AppButton
                    title="NEXT STEP"
                    onPress={this.nextClick}
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
})
export default OrderProduct
