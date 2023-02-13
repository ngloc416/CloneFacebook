import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons'; 

function VideoOptions() {
  return (
    <View style={styles.container}>
      <View style={styles.videoOptionsWrapper}>
        <TouchableOpacity style={styles.videoOptionItemWrapper}>
          <View style={styles.videoOptionItem}>
            <View style={styles.optionIcon}><MaterialIcons name="report" size={24} color="black" /></View>
            <View>
              <Text style={styles.videoOptionTitle}>Báo cáo video</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.videoOptionItemWrapper}>
          <View style={styles.videoOptionItem}>
            <View style={styles.optionIcon}><FontAwesome5 name="user-friends" size={24} color="black" /></View>
            <View>
              <Text style={styles.videoOptionTitle}>Kết bạn video</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.videoOptionItemWrapper}>
          <View style={styles.videoOptionItem}>
            <View style={styles.optionIcon}><Entypo name="block" size={24} color="black" /></View>
            <View>
              <Text style={styles.videoOptionTitle}>Chặn người chủ của video</Text>
            </View>
          </View>
        </TouchableOpacity>


      </View>
    </View>
  )
}

export default VideoOptions

const screenWidth = Dimensions.get('screen').width;
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      width: screenWidth
    },
    backdrop: {
      height: '100%',
      width: '100%',
      zIndex: 1
    },
    videoOptionsWrapper: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      zIndex: 2,
      padding: 15,
      backgroundColor: '#fff'
    },
    videoOptionItemWrapper: {
        paddingBottom: 30
    },
    videoOptionItem: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    optionIcon: {
        width: 35,
        alignItems: 'center'
    },
    videoOptionTitle: {
        fontSize: 16
    }
  });