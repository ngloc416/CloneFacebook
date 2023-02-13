import {View, Image, StyleSheet, Text} from 'react-native';
import React from 'react';

const Notice = ({ typeNotice, notice }) => {
  if ( typeNotice === 'warning' ) {
    return (
      <View styles={styles.container}>
        <Text>{notice}</Text>
      </View>
    )
  } else {
    return (
      <View styles={styles.container}>
        <Text>{notice}</Text>
      </View>
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