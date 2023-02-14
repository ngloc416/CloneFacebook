import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';


function Received({item}) {
    return(
        <View style={styles.container}>
          <Image source={{uri: item.sender.avatar}} style={styles.img}/>
          <View>
               <Text style={styles.message}>{item.message}</Text>
               <Text style={styles.duration}>{item.created}</Text>
          </View>
        </View>
    )
}
export default Received;
const styles = StyleSheet.create({
    duration:{
        color:'#b6b6b6',
        fontSize:11,
        marginHorizontal:15,
        marginTop:5,
    },
    container:{
        flexDirection:'row',
        marginTop:20,
        marginLeft: 10,
        width:250
    },
    img:{
        width:40,
        height:40,
        borderRadius:20
    },
    message:{
        fontSize:13,
        marginHorizontal:15,
    }
})