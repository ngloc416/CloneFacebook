import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { WHITE_COLOR } from '../../constants/constants'
import ChatItem from './ChatItem'

function ListChat({ navigation }) {
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
    <>
        <View style={styles.chatHeader}>
            <View style={styles.row}>
                <TouchableOpacity
                  style={styles.btnBack}
                  onPress={() => {
                      navigation.navigate('ChatProfile');
                  }}
                >
                  <Image source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }} style={styles.userAvatar}></Image>
                </TouchableOpacity>
                <Text style={styles.title}>Chats</Text>
            </View>
            <View style={styles.row}>
                <Entypo style={styles.icon} name="camera" size={24} color="black" />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('NewMessage');
                    }}
                >
                    <MaterialCommunityIcons style={styles.icon} name="pencil" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
        <ScrollView style={styles.listChat}>
            {messages.map((item, index) => (
                <TouchableOpacity key={index} onPress={() => {navigation.navigate('ChatScreen')}}>
                    <ChatItem item={item} key={index}></ChatItem>
                </TouchableOpacity>
            ))}
        </ScrollView>
    </>
  )
}

export default ListChat

const styles = StyleSheet.create({
    chatHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 15,
        backgroundColor: WHITE_COLOR,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userAvatar: {
        width: 40,
        height: 40,
        borderRadius: 100,
        borderColor: '#ccc',
        borderWidth: 1
    },
    title: {
        fontSize: 30,
        fontWeight: '700',
        marginLeft: 10
    },
    icon: {
        width: 40,
        height: 40,
        marginTop: 15,
        marginLeft: 10
    },
    listChat: {
        backgroundColor: WHITE_COLOR,
    }
  });
  