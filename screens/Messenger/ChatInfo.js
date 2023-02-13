import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, TextInput, SafeAreaView, Dimensions, Image } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

function ChatInfo({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <FontAwesome5Icon size={20} name="arrow-left"></FontAwesome5Icon>
        </TouchableOpacity>
        <SimpleLineIcons name="options-vertical" size={24} color="black" />
      </View>
      <View style={{ alignItems: 'center', marginTop: 30}}>
        <Image source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} style={styles.userAvatar}></Image>
        <Text style={styles.userName}>Nguyễn Đình Lộc</Text>
        <View style={{ marginTop: 10, alignItems: 'center'}}>
          <Ionicons name="person" size={26} color="black" style={styles.iconProfile}/>
          <Text style={styles.iconName}>Trang cá nhân</Text>
        </View>
      </View>
      <View style={styles.listOption}>
        <TouchableOpacity style={{ width: '100%'}}>
          <Text style={styles.optionName}>Chặn</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default ChatInfo
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%'
},
  headerWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 10,
      borderBottomWidth: 0.3,
      borderBottomColor: '#ddd',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between'
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
  iconName: {
    fontSize: 14,
    fontWeight: '400',
    marginTop: 5
  },
  listOption: {
    marginHorizontal: 30,
    marginTop: 20
  },
  optionName: {
    fontSize: 18,
  }
})