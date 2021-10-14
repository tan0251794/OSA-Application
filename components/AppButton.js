import { faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const AppButton = ({ iconBool=false, title, onPress, btnStyles, btnTxtStyles }) => {
  if (iconBool) {
    return(
      <TouchableOpacity
        onPress={onPress}
        style={btnStyles}>
        <Text style={btnTxtStyles}> <FontAwesomeIcon icon={ faHome } /> {title}</Text>
      </TouchableOpacity>
    )
  }else{
    return(
    <TouchableOpacity
        onPress={onPress}
        style={btnStyles}>
        <Text style={btnTxtStyles}> {title}</Text>
      </TouchableOpacity>
    )
  }
  
  }

export default AppButton
