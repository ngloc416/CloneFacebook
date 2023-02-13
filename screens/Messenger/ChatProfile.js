import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, TextInput, SafeAreaView, Dimensions, Image } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { Feather } from '@expo/vector-icons'

function ChatProfile({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchToolWrapper}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <FontAwesome5Icon size={20} name="arrow-left"></FontAwesome5Icon>
        </TouchableOpacity>
        <Text style={styles.title}>Tôi</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 30}}>
        <Image source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} style={styles.userAvatar}></Image>
        <Text style={styles.userName}>Nguyễn Đình Lộc</Text>
      </View>
      <View style={styles.listOption}>
          <TouchableOpacity 
            style={styles.option}
            onPress={() => {
              navigation.navigate('WaitingMessage');
            }}
          >
            <Feather name="message-circle" size={32} color="black" />
            <Text style={styles.optionName}>Tin nhắn đang chờ</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ChatProfile
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%'
},
  searchToolWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 0.3,
      borderBottomColor: '#ddd'
  },
  btnBack: {
      width: 30,
      height: 30,
      justifyContent: 'center',
      alignItems: 'center'
  },
  searchInput: {
      borderRadius: 48,
      backgroundColor: '#ddd',
      width: screenWidth - 60,
      height: 35,
      paddingHorizontal: 15,
      width: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginLeft: 15
  },
  userAvatar: {
    width: 70,
    height: 70,
    borderRadius: 100,
    borderColor: '#ccc',
    borderWidth: 1
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    marginTop: 10
  },
  listOption: {
    marginHorizontal: 30,
    marginTop: 20
  },
  option: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
  },
  optionName: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 3
  }
})