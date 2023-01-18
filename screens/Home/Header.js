import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesome5, AntDesign, Feather } from '@expo/vector-icons';
import { BLUE_COLOR, LIGHT_GREY_COLOR } from '../../constants/constants.js';

export default function Header({ navigation }) {
  const addPost = () => {};
  const search = () => {};
  const messenger = () => {};
  return (
    <View style={styles.header}>
      <Text style={styles.textHeader}>facebook</Text>
      <View style={styles.group}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={addPost}
          style={styles.iconHeader}
        >
          <AntDesign name="plus" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={search}
          style={styles.iconHeader}
        >
          <Feather name="search" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={messenger}
          style={styles.iconHeader}
        >
          <FontAwesome5 name="facebook-messenger" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 15,
  },
  textHeader: {
    fontSize: 28,
    fontWeight: '700',
    color: BLUE_COLOR,
  },
  group: {
    flexDirection: 'row',
  },
  iconHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_GREY_COLOR,
    borderRadius: 50,
    marginLeft: 8,
    padding: 5,
    height: 35,
    width: 35,
  },
});
