import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View, TextInput, ScrollView, SafeAreaView, Dimensions, Image } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import ChatItem from './ChatItem'

function WaitingMessage({navigation}) {
  const messages = [
    {
      id: 1,
      partner: {
        id: '1',
        username: 'Nguyễn Đình Lộc',
        avatar: 'https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg'
      },
      lastmessage: {
        message: 'Ok! Thank you ',
        created: '12323232322123',
        unread: '0'
      }
    },

      {
        id: 2,
        partner: {
          id: '2',
          username: 'Nguyễn Đức Thắng',
          avatar: 'https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg'
        },
        lastmessage: {
          message: 'You: Please help me!',
          created: '1672797164',
          unread: '0'
        }
      },

      {
        id: 3,
        partner: {
          id: '3',
          username: 'Nguyễn Văn Khoa',
          avatar: 'https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg'
        },
        lastmessage: {
          message: 'Hello C',
          created: '1672797164',
          unread: '0'
        }
      },

      {
        id: 4,
        partner: {
          id: '4',
          username: 'Vũ Hoàng Long',
          avatar: 'https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg'
        },
        lastmessage: {
          message: 'You: Hello C',
          created: '1672797164',
          unread: '0'
        }
      }

  ];
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
          <Text style={{ fontSize: 18, marginLeft: 10}}>Tin nhắn đang chờ</Text>
        </TouchableOpacity>
        <SimpleLineIcons name="options-vertical" size={24} color="black" />
      </View>

      <ScrollView style={styles.listChat}>
            {messages.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => {navigation.navigate('ChatScreen')}}>
                    <ChatItem item={item} key={index}></ChatItem>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </SafeAreaView>
  )
}

export default WaitingMessage
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
      height: 30,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'row'
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