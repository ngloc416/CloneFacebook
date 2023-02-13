import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput,ScrollView } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { Feather } from '@expo/vector-icons'
import { FontAwesome5 } from '@expo/vector-icons'
import { WHITE_COLOR, GREY_COLOR } from '../../constants/constants'
import Sent from '../../components/Sent'
import Received from '../../components/Received'

function ChatScreen({ navigation }) {
    const messages = [
        {
          message_id: '1',
          message: 'Hey',
          unread: '0',
          created: "12:04",
          sender: {
            id: '1',
            username: 'Nguyễn Đình Lộc',
            avatar: 'https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg',
          }
        },

        {
            message_id: '2',
            message: "What's up?",
            unread: '0',
            created: "12:05",
            sender: {
              id: '1',
              username: 'Nguyễn Văn A',
              avatar: 'https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg',
            }
          },

          {
            message_id: '3',
            message: "What's up?",
            unread: '0',
            created: "12:05",
            sender: {
              id: '1',
              username: 'Nguyễn Văn A',
              avatar: 'https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg',
            }
          },

          {
            message_id: '4',
            message: "What are u doing ?",
            unread: '0',
            created: "12:05",
            sender: {
              id: '1',
              username: 'Nguyễn Văn A',
              avatar: 'https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg',
            }
          },

          {
            message_id: '5',
            message: "I'm playing video games",
            unread: '0',
            created: "12:05",
            sender: {
              id: '1',
              username: 'Nguyễn Đình Lộc',
              avatar: 'https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg',
            }
          }
      ];


  return (
    <View style={{ backgroundColor: WHITE_COLOR, position: 'relative' }}>
        {/* CHAT HEADER */}
        <View style={styles.chatHeader}>
            <View style={styles.headerLeft}>
                <TouchableOpacity
                style={styles.btnBack}
                onPress={() => {
                    navigation.goBack();
                }}
                >
                    <FontAwesome5Icon size={20} name="arrow-left"></FontAwesome5Icon>
                </TouchableOpacity>
                <Image source={{ uri: "https://phongreviews.com/wp-content/uploads/2022/11/avatar-facebook-mac-dinh-8.jpg" }} style={styles.userAvatar}></Image>
                <Text style={styles.title}>Nguyễn Đình Lộc</Text>
            </View>
            <TouchableOpacity
                style={styles.btnBack}
                onPress={() => {
                    navigation.navigate('ChatInfo');
                }}
            >
                <FontAwesome5 name="info-circle" size={24} color="black" style={styles.iconInfo} />
            </TouchableOpacity>
        </View>

        {/* LIST MESSAGES */}
        <ScrollView>
            {messages.map((item, index) => {
                if(item.sender.username !== 'Nguyễn Đình Lộc')
                return <Sent item={item} key={index}></Sent>
                return <Received item={item} key={index}></Received>
            })}
        </ScrollView>


        {/* INPUT */}
        <View style={styles.inputArea}>
            <TextInput
				multiline
				placeholder={"Type something..."}
                placeholderTextColor='white'
				style={styles.input}
			/>
            <Feather name="send" size={24} color="black" style={styles.inputSend} />
        </View>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
    chatHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: WHITE_COLOR,
        shadowColor: GREY_COLOR,
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    btnBack: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'row'
    },
    userAvatar: {
        width: 35,
        height: 35,
        borderRadius: 100,
        borderColor: '#ccc',
        borderWidth: 1,
        marginLeft: 10
    },
    iconInfo: {
        marginTop: 5
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginLeft: 10,
        marginTop: 5
    },
    input: {
        backgroundColor: '#808080',
		paddingLeft: 20,
        paddingTop: 10,
		color: WHITE_COLOR,
		flex: 3,
		fontSize: 16,
		height: 40,
		alignSelf: "center",
        borderRadius: 100
    },
    inputArea: {
        position: 'absolute',
        top: 675,
        right: 0,
        left: 0,
        display: 'flex',
        flexDirection: 'row'
    },
    inputSend: {
        marginTop: 8
    }
  })