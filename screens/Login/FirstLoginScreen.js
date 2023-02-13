import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  Text,
  Dimensions,
  Keyboard,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import {
  BLUE_COLOR,
  TOUCH_BLUE_COLOR,
  GREY_COLOR,
  TOUCH_GREEN_COLOR,
  GREEN_COLOR,
  WHITE_COLOR,
} from '../../constants/constants.js';

import { login } from '../../services/auth.service';
import { openNotice, closeNotice } from '../../redux/actions/notice.action';
import { networkErrorMsg, authMsg } from '../../constants/message.js';

export default function FirstLoginScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [accountFocus, setAccountFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [focus, setFocus] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setFocus(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setFocus(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const clickLogin = async () => {
    const response = await login({ password, phone });
    if (response.code === '1000') {
      await AsyncStorage.setItem('token', response.data.token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data));
      navigation.navigate('MainTab');
    } else {
      if (response.code === '9995' || response.code === '9998') {
        await AsyncStorage.removeItem('token');
        navigation.navigate('LoginScreen');
        dispatch(openNotice({notice: authMsg.badToken, typeNotice: 'warning'}));
        setTimeout(() => dispatch(closeNotice()), 2000);
      } else if (response.code === 'ERR_NETWORK') {
        dispatch(openNotice({notice: networkErrorMsg, typeNotice: 'warning'}));
        setTimeout(() => dispatch(closeNotice()), 2000);
      } else {
        dispatch(openNotice({notice: response.message, typeNotice: 'warning'}));
        setTimeout(() => dispatch(closeNotice()), 2000);
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {focus ? (
        <MaterialCommunityIcons
          name="facebook"
          size={80}
          color={BLUE_COLOR}
          style={{ paddingTop: 32, marginBottom: 20 }}
        />
      ) : (
        <Image
          style={styles.loginImage}
          source={require('../../assets/Login/Login.jpg')}
        />
      )}

      <View style={styles.body}>
        <View>
          <TextInput
            style={accountFocus ? styles.inputPress : styles.inputNormal}
            placeholder="Số điện thoại"
            placeholderTextColor={GREY_COLOR}
            keyboardType="numeric"
            onFocus={() => {
              setAccountFocus(true);
              setPassFocus(false);
            }}
            value={phone}
            onChangeText={(text) => setPhone(text)}
          />

          <View>
            <TextInput
              style={passFocus ? styles.inputPress : styles.inputNormal}
              autoCapitalize="none"
              autoComplete="password"
              placeholder="Mật khẩu"
              placeholderTextColor={GREY_COLOR}
              secureTextEntry={visible === false ? true : false}
              onFocus={() => {
                setAccountFocus(false);
                setPassFocus(true);
              }}
              value={password}
              onChangeText={(text) => {
                setPassword(text)
                if (text != null && text != '') setShow(true);
                else setShow(false);
              }}
            />
            {visible ? (
              <Ionicons
                style={show ? styles.iconEyeShow : styles.iconEye}
                name="ios-eye-outline"
                size={23}
                color="black"
                onPress={() => setVisible(!visible)}
              />
            ) : (
              <Ionicons
                style={show ? styles.iconEyeShow : styles.iconEye}
                name="ios-eye-off-outline"
                size={23}
                color="black"
                onPress={() => setVisible(!visible)}
              />
            )}
          </View>

          <TouchableHighlight
            style={styles.signinButton}
            onPress={async () => {
              await clickLogin();
            }}
            underlayColor={TOUCH_BLUE_COLOR}
          >
            <Text style={styles.textSigninButton}>Đăng nhập</Text>
          </TouchableHighlight>

          {!focus ? (
            <View>
              <View style={styles.separate}>
                <View style={styles.itemSeparate}></View>
                <Text style={{ fontSize: 12, color: GREY_COLOR }}>HOẶC</Text>
                <View style={styles.itemSeparate}></View>
              </View>
              <TouchableHighlight
                style={styles.signupButton}
                onPress={() => {
                  navigation.navigate('BeginSignup');
                }}
                underlayColor={TOUCH_GREEN_COLOR}
              >
                <Text style={styles.textSignupButton}>
                  Tạo tài khoản Facebook mới
                </Text>
              </TouchableHighlight>
            </View>
          ) : null}
        </View>
      </View>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
}

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: WHITE_COLOR,
    flex: 1,
    padding: 0,
  },
  loginImage: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH / 1.74,
    resizeMode: 'contain',
    marginBottom: 58,
  },
  body: {
    width: '83%',
  },
  inputNormal: {
    alignSelf: 'center',
    width: '98%',
    height: 50,
    fontSize: 19,
    borderBottomWidth: 0.7,
    borderColor: GREY_COLOR,
    marginBottom: 15,
  },
  inputPress: {
    alignSelf: 'center',
    width: '98%',
    height: 50,
    fontSize: 19,
    borderBottomWidth: 2.5,
    borderColor: BLUE_COLOR,
    marginBottom: 15,
  },
  iconEye: {
    position: 'absolute',
    right: 6,
    top: 15,
    display: 'none',
  },
  iconEyeShow: {
    position: 'absolute',
    right: 6,
    top: 15,
    display: 'flex',
  },
  signinButton: {
    marginVertical: 5,
    paddingVertical: 8,
    backgroundColor: BLUE_COLOR,
    alignItems: 'center',
    borderRadius: 4,
  },
  textSigninButton: {
    color: WHITE_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
  },
  separate: {
    paddingTop: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemSeparate: {
    backgroundColor: GREY_COLOR,
    height: 0.8,
    width: '42%',
  },
  signupButton: {
    alignSelf: 'center',
    width: '70%',
    marginTop: 30,
    marginVertical: 5,
    paddingVertical: 8,
    backgroundColor: GREEN_COLOR,
    alignItems: 'center',
    borderRadius: 4,
  },
  textSignupButton: {
    color: WHITE_COLOR,
    fontSize: 16,
    fontWeight: 'bold',
  },
});