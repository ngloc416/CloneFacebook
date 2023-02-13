import {View, Image, StyleSheet, Text, Alert} from 'react-native';
import React from 'react';

const Notice = ({ typeNotice, notice }) => {
  if ( typeNotice === 'warning' ) {
    return (
      Alert.alert(
        'Cảnh báo',
        `${notice}`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      )
    )
  } else {
    return (
      Alert.alert(
        'Cảnh báo',
        `${notice}`,
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
      )
    )
  }
};

export default Notice;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    position: 'relative',
    zIndex: 3,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
  }
});