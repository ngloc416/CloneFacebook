import { StatusBar } from 'expo-status-bar';
import FriendItem from '../../components/FriendItem2';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native'

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from '@expo/vector-icons'; 
import React from 'react'

function SuggestFriend() {
  const messengers = [
    {
      id: 1,
      fullname: "Trinh Dat",
      name: "Dat",
      avatar: "https://reactnative.dev/img/tiny_logo.png",
      mutual: 1,
    },

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
      <ScrollView style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.buttonReturn}>
              <Ionicons
                name="arrow-back"
                size={28}
                color="black"
                style={styles.iconReturn}
              />
            </TouchableOpacity>
            <Text style={styles.textHeader}>Gợi ý</Text>
            <TouchableOpacity style={styles.buttonSearch}>
                <FontAwesome5
                    name="search"
                    size={24}
                    color="black"
                />
            </TouchableOpacity>
          </View>
          <Text style={styles.textSubtitle}>Những người bạn có thể biết</Text>
          <View style={styles.lstFriend}>
            <ScrollView showsHorizontalScrollIndicator={false}>
              {listFriend()}
            </ScrollView>
          </View>
      </ScrollView>
    </View>
  )
}

export default SuggestFriend

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingHorizontal: 10,
  },

  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },

  buttonReturn: {
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "center",
  },

  textHeader: {
    fontSize: 32,
    fontWeight: "bold",
    marginLeft: "4%",
  },

  buttonSearch: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 225,
  },

  textSubtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5
  },

  invite: {
    paddingTop: "2%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  textInvite: {
    fontSize: 22,
    fontWeight: "bold",
    marginLeft: "2%",
  },

  buttonSort: {
    fontSize: 24,
    marginRight: 10,
    marginTop: 5
  },

  lstFriend: {
    paddingTop: 10,
  },

  option: {
    flexDirection: "row",
    paddingBottom: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },

  button: {
    marginTop: 10,
    backgroundColor: "#ccc",
    paddingVertical: 5,
    paddingHorizontal: 15,
    alignItems: "center",
    borderRadius: 20,
    marginLeft: 5,
  },

  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  });
