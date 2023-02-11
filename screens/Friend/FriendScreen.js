import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

import { LIGHT_GREY_COLOR } from '../../constants/constants.js';
import FriendItem from '../../components/FriendItem';

function FriendScreen({ navigation }) {
  const friends = [
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

  const listFriend = () => {
    return friends.map((element) => {
      return (
        <View key={element.id}>
          <View>
            <FriendItem
              urlAvatar={element.avatar}
              mutual={element.mutual}
              name={element.fullname}
              firstLabel="Chấp nhận"
              secondLabel="Xóa"
              navigation={navigation}
            ></FriendItem>
          </View>
        </View>
      );
    });
  };

  return (
    <View>
      <ScrollView
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.textHeader}>Bạn bè</Text>
          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={() => navigation.navigate('SearchScreen')}
          >
            <FontAwesome5 name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonHeader}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('SuggestFriend');
            }}
          >
            <Text style={styles.textButton}>Gợi ý</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('AllFriend');
            }}
          >
            <Text style={styles.textButton}>Tất cả bạn bè</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderTopColor: LIGHT_GREY_COLOR,
            borderTopWidth: 1,
            height: 1,
            marginTop: 20,
          }}
        ></View>
        <View style={styles.invite}>
          <Text style={styles.textInvite}>Lời mời kết bạn</Text>
          <Text style={styles.countFriends}>{friends.length}</Text>
        </View>
        <View style={styles.listFriend}>{listFriend()}</View>
        <View style={{ height: 20 }}></View>
      </ScrollView>
    </View>
  );
}

export default FriendScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingHorizontal: 15,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textHeader: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  buttonHeader: {
    flexDirection: 'row',
  },

  textButton: {
    fontWeight: '700',
    fontSize: 16,
  },

  invite: {
    paddingTop: 16,
    flexDirection: 'row',
  },

  textInvite: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: '2%',
  },

  countFriends: {
    fontSize: 22,
    color: 'red',
    marginLeft: 8,
    fontWeight: 'bold',
  },

  listFriend: {
    paddingTop: 15,
  },

  button: {
    marginTop: 10,
    backgroundColor: LIGHT_GREY_COLOR,
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: 'center',
    borderRadius: 20,
    marginRight: 10,
    height: 35,
  },
});