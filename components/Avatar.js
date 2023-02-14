import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const Avatar = ({ source, navigation, userId }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('ProfileScreen', { userId })}
    >
      <Image style={styles.userImage} source={source} />
    </TouchableOpacity>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    position: 'relative',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
  },
});
