import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

import { WHITE_COLOR, LIGHT_GREY_COLOR } from '../../constants/constants.js';

export default function PostTool({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.postToolWrapper}>
        <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
          <Image
            source={require('../../assets/Login/Avatar.jpg')}
            style={styles.userAvatar}
          ></Image>
        </TouchableOpacity>
        <TouchableHighlight
          onPress={() => {}}
          style={styles.postInputWrapper}
          underlayColor={LIGHT_GREY_COLOR}
        >
          <View style={styles.postInput}>
            <Text
              style={{
                fontSize: 16,
              }}
            >
              Bạn đang nghĩ gì?
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopColor: '#ddd',
    borderTopWidth: 0.5,
    backgroundColor: WHITE_COLOR,
  },
  postToolWrapper: {
    padding: 15,
    flexDirection: 'row',
  },

  postInputWrapper: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 50,
    justifyContent: 'center',
    height: 36,
  },
  postInput: {
    justifyContent: 'center',
    borderRadius: 50,
    height: 36,
    width: '100%',
    borderColor: '#ddd',
    paddingHorizontal: 20,
    borderWidth: 1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
});
