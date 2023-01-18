<<<<<<< HEAD
import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
=======
import React from 'react';
import {
>>>>>>> a76e6782d8e2c879d93bb6044115da0a81f306c5
  StyleSheet,
  Text,
  View,
  Image,
<<<<<<< HEAD
  TouchableOpacity,
} from "react-native";

export default function FriendItem(props) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: props.urlAvatar }} style={styles.image}></Image>
      <View style={styles.user}>
        <Text style={styles.textName}>{props.name}</Text>
        <Text style={styles.textFr}>{props.mutual} bạn chung</Text>
        <View style={styles.areaButton}>
          <TouchableOpacity style={styles.buttonA}>
            <Text style={styles.textA}>Chấp nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonB}>
            <Text style={styles.textB}>Xóa</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
=======
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import {
  BLUE_COLOR,
  LIGHT_GREY_COLOR,
  GREY_COLOR,
} from '../constants/constants.js';

export default function FriendItem(props) {
  return (
    <TouchableHighlight underlayColor={LIGHT_GREY_COLOR} onPress={() => {}}>
      <View style={styles.container}>
        <Image source={{ uri: props.urlAvatar }} style={styles.image}></Image>
        <View style={styles.user}>
          <Text style={styles.textName}>{props.name}</Text>
          <Text style={{ color: GREY_COLOR }}>{props.mutual} bạn chung</Text>
          <View style={styles.areaButton}>
            <TouchableOpacity style={styles.buttonA}>
              <Text style={styles.textA}>Chấp nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonB}>
              <Text style={styles.textB}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableHighlight>
>>>>>>> a76e6782d8e2c879d93bb6044115da0a81f306c5
  );
}

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
    flexDirection: "row",
    paddingVertical: 5,
=======
    flexDirection: 'row',
    paddingVertical: 7,
>>>>>>> a76e6782d8e2c879d93bb6044115da0a81f306c5
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 100,
<<<<<<< HEAD
    borderColor: "#ccc",
=======
    borderColor: '#ccc',
>>>>>>> a76e6782d8e2c879d93bb6044115da0a81f306c5
    borderWidth: 1,
  },

  user: {
<<<<<<< HEAD
    paddingLeft: 10,
  },

  textName: {
    fontSize: 22,
    fontWeight: "bold",
  },

  areaButton: {
    flexDirection: "row",
  },

  buttonA: {
    marginVertical: 10,
    backgroundColor: "#1877f2",
    paddingTop: 8,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 8,
  },

  buttonB: {
    marginVertical: 10,
    backgroundColor: "#ccc",
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginLeft: 5,
    alignItems: "center",
    borderRadius: 8,
  },

  textA: {
    color: "#fff",
    fontSize: 20,
=======
    paddingLeft: 12,
  },

  textName: {
    fontSize: 18,
    fontWeight: '700',
  },

  areaButton: {
    flexDirection: 'row',
    flex: 1,
  },

  buttonA: {
    marginVertical: 8,
    backgroundColor: BLUE_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 35,
    width: 130,
    marginRight: 10,
  },

  buttonB: {
    marginVertical: 8,
    backgroundColor: LIGHT_GREY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 35,
    width: 130,
  },

  textA: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
>>>>>>> a76e6782d8e2c879d93bb6044115da0a81f306c5
  },

  textB: {
    fontSize: 20,
<<<<<<< HEAD
  },
});
=======
    fontSize: 14,
    fontWeight: '700',
  },
});
>>>>>>> a76e6782d8e2c879d93bb6044115da0a81f306c5
