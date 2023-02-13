import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

function Sent({ item }) {
    return(
        <View style={styles.container}>
            <View
                style={styles.gradient}
            >
                <Text style={styles.text}>{item.message}</Text>
            </View>
            <Text style={styles.duration}>{item.created}</Text>
        </View>
    )
}
export default Sent;

const styles = StyleSheet.create({
    container:{
        marginVertical:25,
        alignSelf:'flex-end',
        marginRight: 10,
    },
    duration:{
        color:'#b6b6b6',
        fontSize:11,
        marginTop:5,
        alignSelf:'flex-end'
    },
    gradient:{
        display: 'flex',
        maxWidth:220,
        flexDirection: 'column',
        alignItems: 'flex-end',
        justifyContent:'flex-end',
        paddingVertical:10,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        borderBottomLeftRadius:25,
    },
    text:{
        color:'black',
    }
})