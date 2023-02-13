import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {} from 'react';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
  Text,
  TextInput,
  Keyboard,
} from 'react-native';
import {
  BLUE_COLOR,
  WHITE_COLOR,
  TOUCH_BLUE_COLOR,
  GREY_COLOR,
} from '../../constants/constants.js';

import { login } from '../../services/auth.service';
import { openNotice, closeNotice } from '../../redux/actions/notice.action';
import { networkErrorMsg, authMsg } from '../../constants/message.js';

export default function NextLoginScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({});
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      const userSaved = await AsyncStorage.getItem('user');
      setUser(JSON.parse(userSaved));
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setPassFocus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setPassFocus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={!passFocus ? styles.account : styles.accountFocus}>
        <Image style={styles.avatar} source={{ uri: user.avatar }} />
        <Text style={styles.username}>{user.username}</Text>
      </View>

      <View style={styles.passContainer}>
        <TextInput
          style={styles.input}
          autoCapitalize="none"
          autoComplete="password"
          placeholder="Mật khẩu"
          placeholderTextColor={GREY_COLOR}
          secureTextEntry={visible === false ? true : false}
          value={password}
          onFocus={() => {
            setPassFocus(true);
          }}
          onChangeText={(text) => {
            if (text != null && text != '') setShow(true);
            else setShow(false);
            setPassword(text);
          }}
        />
        {!visible ? (
          <Text
            style={show ? styles.passShow : styles.pass}
            onPress={() => setVisible(!visible)}
          >
            HIỂN THỊ
          </Text>
        ) : (
          <Text
            style={show ? styles.passShow : styles.pass}
            onPress={() => setVisible(!visible)}
          >
            ẨN
          </Text>
        )}
      </View>

      <TouchableHighlight
        style={styles.signinButton}
        onPress={async () => {
          const response = await login({ password, phone: user.phone });
          if (response.code === '1000') {
            await AsyncStorage.setItem('token', response.data.token);
            await AsyncStorage.setItem('user', JSON.stringify(response.data));
            navigation.pop();
            navigation.replace('MainTab');
          } else {
            if (response.code === '9995' || response.code === '9998') {
              await AsyncStorage.removeItem('token');
              navigation.navigate('LoginScreen');
              dispatch(
                openNotice({ notice: authMsg.badToken, typeNotice: 'warning' })
              );
              setTimeout(() => dispatch(closeNotice()), 2000);
            } else if (response.code === 'ERR_NETWORK') {
              dispatch(
                openNotice({ notice: networkErrorMsg, typeNotice: 'warning' })
              );
              setTimeout(() => dispatch(closeNotice()), 2000);
            } else {
              dispatch(
                openNotice({ notice: response.message, typeNotice: 'warning' })
              );
              setTimeout(() => dispatch(closeNotice()), 2000);
            }
          }
        }}
        underlayColor={TOUCH_BLUE_COLOR}
      >
        <Text style={styles.textSigninButton}>Đăng nhập</Text>
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
  account: {
    display: 'flex',
    flexDirection: 'column',
    width: '83%',
    alignItems: 'center',
    marginTop: 280,
  },
  accountFocus: {
    display: 'flex',
    flexDirection: 'column',
    width: '83%',
    alignItems: 'center',
    marginTop: 100,
  },
  avatar: {
    width: 78,
    height: 78,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  username: {
    marginTop: 12,
    fontSize: 15,
  },
  passContainer: {
    marginTop: 25,
    width: '83%',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 40,
    fontSize: 17,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: GREY_COLOR,
    borderRadius: 4,
    flex: 1,
  },
  pass: {
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: 12,
    fontWeight: 'bold',
    display: 'none',
  },
  passShow: {
    paddingLeft: 4,
    paddingRight: 4,
    fontSize: 12,
    fontWeight: 'bold',
    display: 'flex',
  },
  signinButton: {
    width: '83%',
    marginVertical: 5,
    paddingVertical: 8,
    backgroundColor: BLUE_COLOR,
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 16,
  },
  textSigninButton: {
    color: WHITE_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
