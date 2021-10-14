import React from 'react'
import { Text, View } from 'react-native'

export default function LoadingBar(props) {
    if (props.display) {
    return <Text style={{
        position: 'absolute',
        alignSelf:'center', 
        backgroundColor:'whitesmoke',
        top: -180,
        paddingTop: 200,
        paddingBottom: 200,
        height:600,
        paddingLeft: 100,
        paddingRight: 100,
        zIndex: 1,
        opacity: 0.8,
    }}>LOADING ...</Text>
    }
    return (<></>)

}
