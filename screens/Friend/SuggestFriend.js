import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { LIGHT_GREY_COLOR } from '../../constants/constants.js';
import FriendItem from '../../components/FriendItem';

function SuggestFriend({ navigation }) {
  const suggestFriends = [
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
            <Text style={styles.textHeader}>Gợi ý</Text>
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
            <Text style={styles.textSubtitle}>Những người bạn có thể biết</Text>
            <View>
              {suggestFriends.map((item, index) => (
                <View style={styles.friend} key={index}>
                  <FriendItem
                    urlAvatar={item.avatar}
                    mutual={item.mutual}
                    name={item.fullname}
                    firstLabel="Thêm bạn bè"
                    secondLabel="Gỡ"
                    navigation={navigation}
                  ></FriendItem>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default SuggestFriend;

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

  textSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 13,
    paddingBottom: 8,
  },
});
