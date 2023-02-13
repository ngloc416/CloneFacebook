import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
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
    <TouchableHighlight
      underlayColor={LIGHT_GREY_COLOR}
      onPress={() => {
        props.navigation.navigate('ProfileScreen');
      }}
    >
      <View style={styles.container}>
        <Image source={{ uri: props.urlAvatar }} style={styles.image}></Image>
        <View style={styles.user}>
          <Text style={styles.textName}>{props.name}</Text>
          <Text style={{ color: GREY_COLOR }}>{props.mutual} bạn chung</Text>
          <View style={styles.areaButton}>
            <TouchableOpacity style={styles.buttonA}>
              <Text style={styles.textA}>{props.firstLabel}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonB}>
              <Text style={styles.textB}>{props.secondLabel}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 7,
  },

  image: {
    width: 90,
    height: 90,
    borderRadius: 100,
    borderColor: '#ccc',
    borderWidth: 1,
  },

  user: {
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
    width: 134,
    marginRight: 10,
  },

  buttonB: {
    marginVertical: 8,
    backgroundColor: LIGHT_GREY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    height: 35,
    width: 134,
  },

  textA: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },

  textB: {
    fontSize: 20,
    fontSize: 14,
    fontWeight: '700',
  },
});
