import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
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
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
} from '@expo/vector-icons';
import {
  BLUE_COLOR,
  TOUCH_BLUE_COLOR,
  GREY_COLOR,
  TOUCH_GREEN_COLOR,
  GREEN_COLOR,
  WHITE_COLOR,
} from '../../constants/constants.js';
import { signUp } from '../../services/auth.service'

export default function FirstLoginScreen({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [accountFocus, setAccountFocus] = useState(false);
  const [passFocus, setPassFocus] = useState(false);
  const [focus, setFocus] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

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

  const chooseSignup = async () => {
    const regexPhone = /^0[0-9]{9}$/;
    const regexPassword = /^[A-Za-z\d]{6,10}$/;
    if ( !regexPhone.test(phone) ) {
      Alert.alert('', 'Số điện thoại không hợp lệ', [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ])
    } else {
      if (!regexPassword.test(password)) {
        Alert.alert('', 'Mật khẩu không hợp lệ', [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ])
      } else {
        const response = await signUp({phone, password});
        if (response.code === '1000') {
          navigation.pop();
          navigation.pop();
          navigation.navigate('CheckVerify', {phone, password});
        } else {
          Alert.alert('', 'Số điện thoại hoặc mật khẩu không hợp lệ', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ])
        }
      }
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentHeader}>
        <View style={styles.contentHeaderLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Tạo tài khoản</Text>
        </View>
      </View>

      <View style={styles.body}>
        <MaterialCommunityIcons
          name="facebook"
          size={80}
          color={BLUE_COLOR}
          style={{ paddingTop: 32, marginBottom: 20, alignSelf: 'center' }}
        />
        <View>
          <TextInput
            style={accountFocus ? styles.inputPress : styles.inputNormal}
            placeholder="Số điện thoại"
            value={phone}
            placeholderTextColor={GREY_COLOR}
            keyboardType="numeric"
            onFocus={() => {
              setAccountFocus(true);
              setPassFocus(false);
            }}
            onChangeText={(text) => setPhone(text)}
          />

          <View>
            <TextInput
              style={passFocus ? styles.inputPress : styles.inputNormal}
              autoCapitalize="none"
              autoComplete="password"
              placeholder="Mật khẩu"
              value={password}
              placeholderTextColor={GREY_COLOR}
              secureTextEntry={visible === false ? true : false}
              onFocus={() => {
                setAccountFocus(false);
                setPassFocus(true);
              }}
              onChangeText={(text) => {
                if (text != null && text != '') setShow(true);
                else setShow(false);
                setPassword(text);
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
            onPress={() => {
              chooseSignup()
            }}
            underlayColor={TOUCH_BLUE_COLOR}
          >
            <Text style={styles.textSigninButton}>Đăng ký</Text>
          </TouchableHighlight>
        </View>
      </View>
      <StatusBar style="light" />
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
  body: {
    width: '83%',
    marginTop: '10%',
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
});
