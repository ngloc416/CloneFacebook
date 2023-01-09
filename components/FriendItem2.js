import React from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
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
            <Text style={styles.textA}>Thêm bạn bè</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonB}>
            <Text style={styles.textB}>Gỡ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 5,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 100,
    borderColor: "#ccc",
    borderWidth: 1,
  },

  user: {
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
  },

  textB: {
    fontSize: 20,
  },
});