import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import {
  FontAwesome5,
  AntDesign,
  EvilIcons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

import { LIGHT_GREY_COLOR, BLUE_COLOR } from '../../constants/constants.js';
import FriendItem from '../../components/AllFriendItem';
import { getUserListFriend } from '../../services/friend.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { openNotice, closeNotice } from '../../redux/actions/notice.action';
import { authMsg } from '../../constants/message';

function AllFriend({ navigation }) {
  const [friendList, setFriendList] = useState([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState(false);

    {
      id: 2,
      fullname: "Pham Dinh Minh",
      name: "Minh",
      avatar:
        "https://gamek.mediacdn.vn/2019/10/20/photo-1-1571521922264714072244.jpg",
      mutual: 1,
    },

    {
      id: 4,
      fullname: "Do Dang Phuong",
      name: "Phuong",
      avatar: "https://i.ytimg.com/vi/dkvaprtP6L8/maxresdefault.jpg",
      mutual: 3,
    },

    {
      id: 5,
      fullname: "Ho Duc Han",
      name: "Han",
      avatar:
        "https://cdna.artstation.com/p/assets/images/images/019/387/690/large/inward-vertical-city.jpg?1563272711",
      mutual: 20,
    },

    {
      id: 6,
      fullname: "Chien Hoang Van",
      name: "Hoang",
      avatar:
        "https://www.ebtc.ie/wp-content/uploads/2017/10/bigstock-Autumn-Fall-scene-Beautiful-150998720.jpg",
      mutual: 6,
    },

    {
      id: 3,
      fullname: "Vu Ba Luong",
      name: "Luong",
      avatar:
        "https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg?r=1a0fc22192d0c808b8bb2b9bcfbf4a45b1793687",
      mutual: 2,
    },

    {
      id: 7,
      fullname: "Le Thi Giang",
      name: "Giang",
      avatar:
        "https://images.pexels.com/photos/301599/pexels-photo-301599.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      mutual: 5,
    },
  ];

  const listFriend = () => {
    return messengers.map((element) => {
      return (
        <View style={styles.friend} key={element.id}>
          <View>
            <FriendItem
              urlAvatar={element.avatar}
              mutual={element.mutual}
              name={element.fullname}></FriendItem>
          </View>
        </View>
      );
    });
  };

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
            onPress={() =>
              navigation.navigate('SearchScreen', { userId: null })
            }
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
              <TouchableOpacity
                style={styles.buttonSort}
                onPress={() => setFilter(true)}
              >
                <Text style={{ color: BLUE_COLOR, fontSize: 17 }}>Sắp xếp</Text>
              </TouchableOpacity>
            </View>

            <View>
              {total !== 0 ? (
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
                  );
                })
              ) : (
                <Text style={{ alignSelf: 'center', marginTop: 20 }}>
                  Hiện chưa có bạn bè
                </Text>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
      {/* filter */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={filter}
        onRequestClose={() => {
          setFilter(!filter);
        }}
        style={styles.avatarOptionsContainer}
      >
        <View style={styles.backdrop}>
          <TouchableOpacity
            onPress={() => {
              setFilter(!filter);
            }}
            style={{ width: '100%', height: '100%' }}
          ></TouchableOpacity>
        </View>
        <View style={styles.postOptionsWrapper}>
          <TouchableOpacity
            style={styles.postOptionItemWrapper}
            onPress={() => {
              setFilter(!filter);
            }}
          >
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <EvilIcons name="star" size={24} color="black" />
              </View>
              <View>
                <Text style={styles.postOptionTitle}>Mặc định</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postOptionItemWrapper}
            onPress={() => {
              setFilter(!filter);
            }}
          >
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <MaterialCommunityIcons
                  name="sort-descending"
                  size={24}
                  color="black"
                />
              </View>
              <View>
                <Text style={styles.postOptionTitle}>
                  Bạn bè mới nhất trước tiên
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postOptionItemWrapper}
            onPress={() => {
              setFilter(!filter);
            }}
          >
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <MaterialCommunityIcons
                  name="sort-ascending"
                  size={24}
                  color="black"
                />
              </View>
              <View>
                <Text style={styles.postOptionTitle}>
                  Bạn bè lâu năm nhất trước tiên
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
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
  avatarOptionsContainer: {
    position: 'relative',
  },
  backdrop: {
    zIndex: 1,
  },
  postOptionsWrapper: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 2,
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  postOptionItemWrapper: {
    paddingBottom: 20,
  },
  postOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: LIGHT_GREY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postOptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 15,
  },
});
