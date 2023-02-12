import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { LIGHT_GREY_COLOR, BLUE_COLOR } from '../../constants/constants.js';
import FriendItem from '../../components/AllFriendItem';
import { getUserListFriend } from '../../services/friend.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openNotice, closeNotice } from '../../redux/actions/notice.action';
import { authMsg } from '../../constants/message';

function AllFriend({ navigation }) {
  const [friendList, setFriendList] = useState([]);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchFriendList = async () => {
      const token = await AsyncStorage.getItem('token');
      const userData = await AsyncStorage.getItem('user');
      const user = JSON.parse(userData);
      const response = await getUserListFriend({ token, userId: user.id, index: 0, count: 20});
      if (response.code === '1000') {
        setFriendList(response.data.friends);
        setTotal(response.data.total);
      } else {
        if (response.code === '9995' || response.code === '9998') {
          await AsyncStorage.removeItem('token');
          navigation.navigate('LoginScreen');
          dispatch(openNotice({notice: authMsg.badToken, typeNotice: 'warning'}));
          setTimeout(() => dispatch(closeNotice()), 2000);
        }
      }
    }
    fetchFriendList();
  }, [])
  const allFriends = [
    {
      id: 1,
      fullname: 'Vũ Hoàng Long',
      name: 'Long',
      avatar:
        'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191501/Facebook/Login/Avatar_px9tag.jpg',
      mutual: 1,
    },

    {
      id: 2,
      fullname: 'Nguyễn Đức Thắng',
      name: 'Thắng',
      avatar:
        'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191501/Facebook/Login/Avatar_px9tag.jpg',
      mutual: 1,
    },

    {
      id: 4,
      fullname: 'Nguyễn Văn Khoa',
      name: 'Khoa',
      avatar:
        'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191501/Facebook/Login/Avatar_px9tag.jpg',
      mutual: 3,
    },

    {
      id: 5,
      fullname: 'Võ Tiến Bắc',
      name: 'Bắc',
      avatar:
        'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191501/Facebook/Login/Avatar_px9tag.jpg',
      mutual: 20,
    },
    {
      id: 6,
      fullname: 'Nguyễn Văn Khoa',
      name: 'Khoa',
      avatar:
        'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191501/Facebook/Login/Avatar_px9tag.jpg',
      mutual: 3,
    },

    {
      id: 7,
      fullname: 'Võ Tiến Bắc',
      name: 'Bắc',
      avatar:
        'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191501/Facebook/Login/Avatar_px9tag.jpg',
      mutual: 20,
    },
    {
      id: 8,
      fullname: 'Nguyễn Văn Khoa',
      name: 'Khoa',
      avatar:
        'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191501/Facebook/Login/Avatar_px9tag.jpg',
      mutual: 3,
    },

    {
      id: 9,
      fullname: 'Võ Tiến Bắc',
      name: 'Bắc',
      avatar:
        'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191501/Facebook/Login/Avatar_px9tag.jpg',
      mutual: 20,
    },
  ];

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={styles.buttonReturn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="arrow-back"
                size={28}
                color="black"
                style={styles.iconReturn}
              />
            </TouchableOpacity>
            <Text style={styles.textHeader}>Tất cả bạn bè</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={() => navigation.navigate('SearchScreen')}
          >
            <FontAwesome5 name="search" size={21} color="black" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderTopColor: LIGHT_GREY_COLOR,
            borderTopWidth: 1,
            height: 1,
          }}
        ></View>

        <View
          style={{
            paddingHorizontal: 15,
            height: '93%',
          }}
        >
          <ScrollView
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.subHeader}>
              <Text style={styles.textCount}>{total} bạn bè</Text>
              <TouchableOpacity style={styles.buttonSort}>
                <Text style={{ color: BLUE_COLOR, fontSize: 17 }}>Sắp xếp</Text>
              </TouchableOpacity>
            </View>

            <View>
              {
                (total !== 0) ? 
                friendList.map((item, index) => {

                  return (
                  <View style={styles.friend} key={index}>
                    <FriendItem
                      userId={item.id}
                      urlAvatar={item.avatar}
                      mutual={item.same_friends}
                      name={item.fullname}
                      navigation={navigation}
                    ></FriendItem>
                  </View>
                )})
                : <Text>Hiện chưa có bạn bè</Text>
              }
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default AllFriend;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '7%',
    paddingHorizontal: 15,
  },

  textHeader: {
    fontSize: 18,
    marginLeft: '8%',
  },

  subHeader: {
    paddingTop: 13,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textCount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
