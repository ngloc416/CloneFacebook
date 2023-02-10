import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { LIGHT_GREY_COLOR, GREY_COLOR } from '../constants/constants.js';

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
          <View>
            <Text style={styles.textName}>{props.name}</Text>
            <Text style={{ color: GREY_COLOR }}>{props.mutual} bạn chung</Text>
          </View>
          <TouchableOpacity>
            <AntDesign
              name="ellipsis1"
              size={26}
              color={GREY_COLOR}
              style={styles.buttonOption}
            />
          </TouchableOpacity>
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
    width: 65,
    height: 65,
    borderRadius: 100,
    borderColor: '#ccc',
    borderWidth: 1,
  },

  user: {
    flex: 1,
    paddingLeft: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  textName: {
    fontSize: 18,
    fontWeight: '700',
  },
});
