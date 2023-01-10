import {View, Image, StyleSheet} from 'react-native';
import React from 'react';

const Avatar = ({ source }) => {
  return (
    <View style={styles.container} >
      <Image style={styles.userImage} source={source}/>
    </View>
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
  }
});