import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import Avatar from './Avatar';
import { MaterialIcons, FontAwesome, Fontisto } from '@expo/vector-icons';
import {
  WHITE_COLOR,
  BLACK_COLOR,
} from '../constants/constants.js';

const ToolBar = ({ source }) => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.row}>
          <Avatar source={source} />
          <TextInput
            placeholder="Bạn đang nghĩ gì?"
            style={{ marginLeft: 10, }}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.menu}>
          <FontAwesome name="pencil-square-o" size={22} color='#8A2BE2'/>
            <Text style={styles.menuText}>Trạng thái</Text>
          </View>
          <View style={styles.sperator} />
          <View style={styles.menu}>
            <MaterialIcons
              name="photo-size-select-actual"
              size={20}
              color="#4CAF50"
            />
            <Text style={styles.menuText}>Ảnh</Text>
          </View>
          <View style={styles.sperator} />
          <View style={styles.menu}>
          <Fontisto name="flag" size={22} color='#0000FF' />
            <Text style={styles.menuText}>Sự kiện</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default ToolBar;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: WHITE_COLOR,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    paddingRight: 11,
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
  },
  input: {
    height: 50,
    paddingRight: 8,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: BLACK_COLOR,
  },
  menu: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuText: {
    paddingLeft: 11,
    fontWeight: '500',
    fontSize: 12,
  },
  sperator: {
    width: 1,
    height: 26,
    backgroundColor: BLACK_COLOR,
  },
  bottomDivider: {
    width: '100%',
    height: 9,
    backgroundColor: BLACK_COLOR,
  },
});