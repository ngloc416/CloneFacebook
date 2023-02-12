import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

import {
  GREY_COLOR,
  BLUE_COLOR,
  STATUSBAR_HEIGHT,
  SCREEN_HEIGHT,
  TOUCH_BLUE_COLOR,
} from '../../constants/constants';

export default function BeginSignUp({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <View style={styles.contentHeader}>
          <View style={styles.contentHeaderLeft}>
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Bạn có muốn dừng tạo tài khoản không?',
                  'Nếu dừng bây giờ, bạn sẽ mất toàn bộ tiến trình đã thực hiện',
                  [
                    {
                      text: 'DỪNG TẠO TÀI KHOẢN',
                      onPress: () => navigation.goBack(),
                    },
                    {
                      text: 'TIẾP TỤC TẠO TÀI KHOẢN',
                      onPress: () => console.log('OK Pressed'),
                    },
                  ]
                );
              }}
            >
              <AntDesign name="arrowleft" size={28} color="black" />
            </TouchableOpacity>
            <Text style={styles.textHeader}>Tạo tài khoản</Text>
          </View>
        </View>
        <Image
          style={{
            width: '100%',
            resizeMode: 'contain',
            height: '60%',
          }}
          source={require('../../assets/Signup/Signup.jpg')}
        />
        <TouchableHighlight
          style={styles.signinButton}
          onPress={() => {
            navigation.navigate('SignupScreen');
          }}
          underlayColor={TOUCH_BLUE_COLOR}
        >
          <Text style={styles.textSigninButton}>Tiếp</Text>
        </TouchableHighlight>

        <TouchableOpacity
          style={{ alignSelf: 'center', position: 'absolute', bottom: 15 }}
          onPress={() => {
            Alert.alert('', 'Bạn đã có tài khoản ư?', [
              {
                text: 'TIẾP TỤC TẠO TÀI KHOẢN',
                onPress: () => console.log('OK Pressed'),
              },
              {
                text: 'ĐĂNG NHẬP',
                onPress: () => navigation.navigate('FirstLoginScreen'),
              },
            ]);
          }}
        >
          <Text style={{ color: BLUE_COLOR, fontSize: 14, fontWeight: '700' }}>
            Bạn đã có tài khoản?
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
    marginTop: 16,
    alignSelf: 'center',
  },
  textSigninButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
