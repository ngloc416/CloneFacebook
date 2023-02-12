import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Text,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';
import {
  BLUE_COLOR,
  WHITE_COLOR,
  LIGHT_BLUE_COLOR,
  LIGHT_GREY_COLOR,
} from '../../constants/constants.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchUser = async () => {
  const userSaved = await AsyncStorage.getItem('user');
  return JSON.parse(userSaved);
}

export default function FirstLoginScreen({ navigation }) {
  const [showOption, setShowOption] = useState(false);
  const [user, setUser] = useState(fetchUser());

  useEffect(() => {
    const fetchUser = async () => {
      const userSaved = await AsyncStorage.getItem('user');
      setUser(JSON.parse(userSaved));
    }
    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <MaterialCommunityIcons
        name="facebook"
        size={60}
        color={BLUE_COLOR}
        style={{ paddingTop: '55%', marginBottom: 20 }}
      />
      <View style={{ width: '100%' }}>
        {
          (user) ?
          <TouchableHighlight
            style={styles.accountFrame}
            underlayColor={LIGHT_GREY_COLOR}
            onPress={() => {
              navigation.navigate('NextLoginScreen');
            }}
          >
            <View style={styles.account}>
              <Image
                style={styles.avatar}
                source={{uri: user.avatar}}
              />

              <Text style={styles.username}>{user.username}</Text>
            </View>
          </TouchableHighlight>
          : null
        }

        <TouchableHighlight
          style={styles.setting}
          underlayColor={WHITE_COLOR}
          onPress={() => {
            setShowOption(!showOption);
          }}
        >
          <MaterialCommunityIcons
            name="dots-vertical"
            size={20}
            color="black"
          />
        </TouchableHighlight>
      </View>

      <View style={{ width: '100%' }}>
        <TouchableHighlight
          style={styles.otherAccountFrame}
          onPress={() => {
            navigation.navigate('FirstLoginScreen');
          }}
          underlayColor={LIGHT_GREY_COLOR}
        >
          <View style={styles.otherAccount}>
            <View style={styles.plusIcon}>
              <AntDesign name="plus" size={18} color={BLUE_COLOR} />
            </View>

            <Text style={styles.otherAccountText}>
              Đăng nhập bằng tài khoản khác
            </Text>
          </View>
        </TouchableHighlight>

        <TouchableHighlight
          style={styles.otherAccountFrame}
          onPress={() => {
            navigation.navigate('FirstLoginScreen');
          }}
          underlayColor={LIGHT_GREY_COLOR}
        >
          <View style={styles.otherAccount}>
            <View style={styles.plusIcon}>
              <Ionicons name="search-outline" size={22} color={BLUE_COLOR} />
            </View>

            <Text style={styles.otherAccountText}>Tìm tài khoản</Text>
          </View>
        </TouchableHighlight>

        {showOption ? (
          <View style={styles.optionFrame}>
            <TouchableHighlight
              style={styles.option}
              onPress={() => {}}
              underlayColor={LIGHT_GREY_COLOR}
            >
              <Text style={styles.textOption}>Gỡ tài khoản khỏi thiết bị</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={styles.option}
              onPress={() => {}}
              underlayColor={LIGHT_GREY_COLOR}
            >
              <Text style={styles.textOption}>Tắt thông báo đẩy</Text>
            </TouchableHighlight>
          </View>
        ) : null}
      </View>

      <TouchableHighlight
        style={styles.signupButton}
        onPress={() => {}}
        underlayColor={LIGHT_GREY_COLOR}
      >
        <Text style={styles.textSignupButton}>TẠO TÀI KHOẢN FACEBOOK MỚI</Text>
      </TouchableHighlight>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: WHITE_COLOR,
    flex: 1,
    padding: 0,
    width: '100%',
  },
  accountFrame: {
    width: '100%',
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
  },
  account: {
    width: '83%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  username: {
    marginLeft: 12,
    fontWeight: 'bold',
    fontSize: 16,
  },
  setting: {
    position: 'absolute',
    right: '8%',
    height: 85,
    width: 70,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  otherAccountFrame: {
    width: '100%',
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
  },
  otherAccount: {
    width: '83%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  plusIcon: {
    backgroundColor: LIGHT_BLUE_COLOR,
    height: 27,
    width: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  otherAccountText: {
    marginLeft: 12,
    fontWeight: 'bold',
    color: BLUE_COLOR,
  },
  signupButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    width: '83%',
    marginVertical: 5,
    paddingVertical: 8,
    backgroundColor: LIGHT_BLUE_COLOR,
    alignItems: 'center',
    borderRadius: 4,
  },
  textSignupButton: {
    color: BLUE_COLOR,
    fontSize: 14,
    fontWeight: 'bold',
  },
  optionFrame: {
    position: 'absolute',
    right: 0,
    backgroundColor: WHITE_COLOR,
    elevation: 15,
  },
  option: {
    height: 48,
    justifyContent: 'center',
  },
  textOption: {
    marginStart: 18,
    marginEnd: 18,
    fontSize: 16,
  },
});
