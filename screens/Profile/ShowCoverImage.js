import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  TextInput,
  Modal,
} from 'react-native';

export default function ShowCoverImage({ navigation, route }) {
  const image = route.params.image;
  return (
    <View style={{ zIndex: 99 }}>
      <Image
        style={{
          backgroundColor: '#000',
          height: '100%',
          width: '100%',
        }}
        resizeMode="contain"
        source={{ uri: image }}
      ></Image>
    </View>
  );
}
