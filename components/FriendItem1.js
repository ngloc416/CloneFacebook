import React from "react";
import { StatusBar } from "expo-status-bar";
import { AntDesign } from '@expo/vector-icons'; 
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

export default function Friend(props) {
  return (
    <View style={styles.container}>
        <TouchableOpacity style={styles.card}>
        <Image source={{ uri: props.urlAvatar }} style={styles.image}></Image>
        <View style={styles.user}>
            <Text style={styles.textName}>{props.name}</Text>
            <Text style={styles.textFr}>{props.mutual} bạn chung</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity>
            <AntDesign name="ellipsis1" size={24} color="black" style={styles.buttonOption}/>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        justifyContent:"space-between"
    },

  card: {
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
    paddingTop: 10,
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

  buttonOption: {
    marginTop: 25
  }
});