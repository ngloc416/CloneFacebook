import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  Alert,
} from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { LIGHT_GREY_COLOR, GREY_COLOR } from '../constants/constants.js';

export default function FriendItem(props) {
  const [options, setOptions] = useState(false);
  return (
    <TouchableHighlight
      underlayColor={LIGHT_GREY_COLOR}
      onPress={() => {
        props.navigation.navigate('ProfileScreen', {userId: props.userId});
      }}
    >
      <View>
      <View style={styles.container}>
        <Image source={{ uri: props.urlAvatar }} style={styles.image}></Image>
        <View style={styles.user}>
          <View>
            <Text style={styles.textName}>{props.name}</Text>
            <Text style={{ color: GREY_COLOR }}>{props.mutual} bạn chung</Text>
          </View>
          <TouchableOpacity onPress={() => setOptions(true)}>
            <AntDesign
              name="ellipsis1"
              size={26}
              color={GREY_COLOR}
              style={styles.buttonOption}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* options */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={options}
        onRequestClose={() => {
          setOptions(!options);
        }}
        style={styles.avatarOptionsContainer}
      >
        <View style={styles.backdrop}>
          <TouchableOpacity
            onPress={() => {
              setOptions(!options);
            }}
            style={{ width: '100%', height: '100%' }}
          ></TouchableOpacity>
        </View>
        <View style={styles.postOptionsWrapper}>
          <TouchableOpacity
            style={styles.postOptionItemWrapper}
            onPress={() => {
              setOptions(!options);
            }}
          >
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <AntDesign name="message1" size={24} color="black" />
              </View>
              <View>
                <Text style={styles.postOptionTitle}>Nhắn tin</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postOptionItemWrapper}
            onPress={() => {
              setOptions(!options);
              Alert.alert('', `Chặn trang cá nhân của ${props.name}`, [
                { text: 'HỦY', onPress: () => console.log('OK Pressed') },
                { text: 'CHẶN', onPress: () => console.log('CHẶN Pressed') },
              ]);
            }}
          >
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <MaterialCommunityIcons
                  name="block-helper"
                  size={24}
                  color="black"
                />
              </View>
              <View>
                <Text style={styles.postOptionTitle}>Chặn trang cá nhân</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postOptionItemWrapper}
            onPress={() => {
              setOptions(!options);
              Alert.alert('', `Hủy kết bạn với `, [
                { text: 'HỦY', onPress: () => console.log('OK Pressed') },
                {
                  text: 'XÁC NHẬN',
                  onPress: () => console.log('HỦY KẾT BẠN Pressed'),
                },
              ]);
            }}
          >
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <MaterialCommunityIcons
                  name="account-cancel-outline"
                  size={24}
                  color="red"
                />
              </View>
              <View>
                <Text style={{ ...styles.postOptionTitle, color: 'red' }}>
                  Hủy kết bạn
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
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

  avatarOptionsContainer: {
    position: 'relative',
  },
  backdrop: {
    zIndex: 1,
  },
  postOptionsWrapper: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 2,
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  postOptionItemWrapper: {
    paddingBottom: 20,
  },
  postOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: LIGHT_GREY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postOptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 15,
  },
});
