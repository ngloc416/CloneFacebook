import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  TextInput,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import {
  GREY_COLOR,
  BLUE_COLOR,
  STATUSBAR_HEIGHT,
  SCREEN_HEIGHT,
  TOUCH_BLUE_COLOR,
  LIGHT_GREY_COLOR,
} from '../../constants/constants';

import { authMsg, networkErrorMsg } from '../../constants/message';
import { openNotice, closeNotice } from '../../redux/actions/notice.action';
import { checkVerifyCode, getVerifyCode, login } from '../../services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BeginSignUp({ navigation, route }) {
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCode = async () => {
      const response = await getVerifyCode({phone: route.params.phone});
      if (response.code === '1000') {
        setCode(response.data.verifyCode);
      } else {
        if (response.code === 'ERR_NETWORK') {
          dispatch(openNotice({notice: networkErrorMsg, typeNotice: 'warning'}));
          setTimeout(() => dispatch(closeNotice()), 2000);
        } else {
          dispatch(openNotice({notice: response.message, typeNotice: 'warning'}));
          setTimeout(() => dispatch(closeNotice()), 2000);
        }
      }
    }
    fetchCode();
  }, [])

  const checkCode = async () => {
    const response = await checkVerifyCode({phone: route.params.phone, codeVerify: code});
    if (response.code === '1000') {
      await AsyncStorage.setItem('token', response.data.token);
      Alert.alert(
        'Nhớ số điện thoại và mật khẩu của bạn',
        `Bạn cần thông tin này vào lần đăng nhập sau: \nSố điện thoại: ${route.params.phone}`,
        [
          {
            text: 'OK',
            onPress: () => {
              navigation.pop();
              navigation.navigate('ChangeInfoAfterSignup');
            },
          },
        ]
      );
    } else {
      if (response.code === 'ERR_NETWORK') {
        dispatch(openNotice({notice: networkErrorMsg, typeNotice: 'warning'}));
        setTimeout(() => dispatch(closeNotice()), 2000);
      } else {
        dispatch(openNotice({notice: response.message, typeNotice: 'warning'}));
        setTimeout(() => dispatch(closeNotice()), 2000);
      }
    }
  }

  const reloadCode = async () => {
    const response = await getVerifyCode({phone: route.params.phone});
      if (response.code === '1000') {
        setCode(response.data.verifyCode);
        Alert.alert('', 'Chúng tôi đã gửi lại mã cho bạn', [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      } else {
        if (response.code === 'ERR_NETWORK') {
          dispatch(openNotice({notice: networkErrorMsg, typeNotice: 'warning'}));
          setTimeout(() => dispatch(closeNotice()), 2000);
        } else {
          dispatch(openNotice({notice: response.message, typeNotice: 'warning'}));
          setTimeout(() => dispatch(closeNotice()), 2000);
        }
      }
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.contentHeader}>
          <View style={styles.contentHeaderLeft}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert('', 'Bạn muốn hủy nhập mã xác nhận ư?', [
                  {
                    text: 'KHÔNG',
                    onPress: () => console.log('OK Pressed'),
                  },
                  {
                    text: 'HỦY',
                    onPress: () => {
                      navigation.pop();
                      navigation.navigate('FirstLoginScreen');
                    },
                  },
                ]);
              }}
            >
              <AntDesign name="arrowleft" size={28} color="black" />
            </TouchableOpacity>
            <Text style={styles.textHeader}>Xác nhận tài khoản</Text>
          </View>
        </View>
        <Text style={{ alignSelf: 'center', fontSize: 17, marginTop: 10 }}>
          Chúng tôi đã gửi SMS kèm mã tới{' '}
          <Text style={{ fontWeight: '700' }}>{route.params.phone}</Text>{' '}
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontWeight: '700',
            alignSelf: 'center',
            marginTop: 5,
          }}
        >
          Nhập mã gồm 4 chữ số từ SMS của bạn.
        </Text>
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            marginTop: 25,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: '700' }}>FB-</Text>
          <TextInput
            style={{
              borderWidth: 0.8,
              borderRadius: 6,
              borderColor: GREY_COLOR,
              height: 50,
              width: 100,
              marginLeft: 5,
              fontSize: 20,
              fontWeight: '700',
              padding: 10,
              paddingHorizontal: 25,
            }}
            maxLength={4}
            value={code}
            onChangeText={(text) => setCode(text)}
            autoFocus={true}
            keyboardType="numeric"
          />
        </View>
        <TouchableHighlight
          style={styles.signinButton}
          onPress={() => {
            checkCode()
          }}
          underlayColor={TOUCH_BLUE_COLOR}
        >
          <Text style={styles.textSigninButton}>Xác nhận</Text>
        </TouchableHighlight>
        <View
          style={{
            height: 1,
            borderBottomColor: GREY_COLOR,
            borderBottomWidth: 0.2,
            width: '83%',
            marginTop: 20,
            alignSelf: 'center',
          }}
        ></View>
        <TouchableOpacity
          style={{
            ...styles.signinButton,
            marginTop: 27,
            backgroundColor: LIGHT_GREY_COLOR,
          }}
          onPress={() => {
            reloadCode()
          }}
        >
          <Text style={{ ...styles.textSigninButton, color: '#000' }}>
            Tôi không nhận được mã
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ alignSelf: 'center', marginTop: 40 }}
          onPress={() => {
            Alert.alert('', 'Bạn muốn đăng xuất ư?', [
              {
                text: 'KHÔNG',
                onPress: () => console.log('OK Pressed'),
              },
              {
                text: 'ĐĂNG XUẤT',
                onPress: async () => {
                  await AsyncStorage.removeItem('token');
                  navigation.pop();
                  navigation.navigate('FirstLoginScreen');
                },
              },
            ]);
          }}
        >
          <Text style={{ color: GREY_COLOR, fontSize: 16, fontWeight: '700' }}>
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: SCREEN_HEIGHT - STATUSBAR_HEIGHT,
  },
  contentHeader: {
    marginTop: 15,
    width: SCREEN_WIDTH,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderBottomWidth: 0.2,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: GREY_COLOR,
    height: 40,
  },
  contentHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  textHeader: {
    marginLeft: 13,
    fontSize: 20,
  },
  signinButton: {
    width: '83%',
    marginVertical: 5,
    paddingVertical: 8,
    backgroundColor: BLUE_COLOR,
    alignItems: 'center',
    borderRadius: 4,
    marginTop: 35,
    alignSelf: 'center',
    height: 40,
  },
  textSigninButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
