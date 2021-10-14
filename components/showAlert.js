import React from 'react'
import { Alert } from 'react-native';

const showAlert = (title, message) => Alert.alert(
    title,
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


export default showAlert
