import React, {useState, useEffect} from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { WHITE_COLOR } from '../../constants/constants'
import ChatItem from './ChatItem'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getListChat } from '../../services/chat'

function ListChat({ navigation }) {

    const [messageList, setMessageList] = useState([]);
    const [user, setUser] = useState({});
    
    useEffect(() => {
      async function fetchMessage() {
        const token = await AsyncStorage.getItem('token');
        const user = await AsyncStorage.getItem('user');
        const userData = JSON.parse(user);
        setUser(userData);
        const response = await getListChat({token, index: 0, count: 20});
        console.log(response.data[0].lastMessage);
        console.log(response.data[0].partner);
        if (response.code === '1000') {
          setMessageList(response.data);
        }
      }
      fetchMessage();
    }, [])
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
                  <Image source={{ uri: user.avatar }} style={styles.userAvatar}></Image>
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
            {messageList.map((item, index) => (
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
  