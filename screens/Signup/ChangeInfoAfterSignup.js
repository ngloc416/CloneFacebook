import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  TouchableHighlight,
  TOUCH_BLUE_COLOR,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import * as ImagePicker from 'expo-image-picker';
import {
  SCREEN_HEIGHT,
  STATUSBAR_HEIGHT,
  GREY_COLOR,
  BLUE_COLOR,
} from '../../constants/constants';

export default function ChangeInfoAfterSignup({ navigation, route }) {
  const userInfo = {
    avatar:
      'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191501/Facebook/Login/Avatar_px9tag.jpg',
    coverImage:
      'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191501/Facebook/Login/Avatar_px9tag.jpg',
    username: '',
  };

  const [avatar, setAvatar] = useState(userInfo.avatar);
  const [coverImage, setCoverImage] = useState(userInfo.coverImage);
  const [username, setUsername] = useState(userInfo.username);

  const pickImages = async (type) => {
    // lấy item
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      quality: 1,
    });
    // nếu lấy item thành công
    if (!result.cancelled) {
      if (type == 'avatar') {
        setAvatar(result.uri);
      } else {
        setCoverImage(result.uri);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.btnBack}
        >
          <FontAwesome5Icon name="arrow-left" color="#000" size={20} />
        </TouchableOpacity>
        <Text style={styles.navigationTitle}>Thay đổi thông tin</Text>
      </View>
      <ScrollView bounces={false} style={styles.detailsWrapper}>
        <View style={{ ...styles.detail, paddingTop: 0 }}>
          <View style={styles.detailTitleWrapper}>
            <Text style={styles.detailTitle}>Ảnh đại diện</Text>
            <TouchableOpacity onPress={() => pickImages('avatar')}>
              <Text style={{ fontSize: 16, color: '#318bfb' }}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <Image source={{ uri: avatar }} style={styles.avatar}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <Text style={styles.detailTitle}>Ảnh bìa</Text>
            <TouchableOpacity onPress={() => pickImages('coverImage')}>
              <Text style={{ fontSize: 16, color: '#318bfb' }}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <Image source={{ uri: coverImage }} style={styles.cover}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <Text style={styles.detailTitle}>Tên tài khoản</Text>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <TextInput
              style={{
                ...styles.introTxt,
                color: '#000',
              }}
              placeholder="Nhập tên tài khoản"
              placeholderTextColor={GREY_COLOR}
              onChangeText={(text) => setUsername(text)}
            >
              {username}
            </TextInput>
          </TouchableOpacity>
          <TouchableHighlight
            style={styles.signinButton}
            onPress={() => {
              navigation.navigate('MainTab');
            }}
            underlayColor={TOUCH_BLUE_COLOR}
          >
            <Text style={styles.textSigninButton}>Xác nhận</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
  navigationBar: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  btnBack: {
    width: 50,
    alignItems: 'center',
  },
  navigationTitle: {
    fontSize: 18,
  },
  detailsWrapper: {
    padding: 15,
    height: SCREEN_HEIGHT - (50 + STATUSBAR_HEIGHT),
  },
  detail: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingVertical: 15,
  },
  detailTitleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    borderRadius: 140,
  },
  cover: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 10,
  },
  introTxt: {
    color: '#333',
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 18,
  },
  introListWrapper: {
    paddingVertical: 10,
  },
  introLine: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  introIcon: {
    width: 30,
  },
  introLineText: {
    fontSize: 16,
    fontWeight: '400',
  },
  introHightLight: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  highlightGallery: {
    marginVertical: 10,
  },
  lastDetail: {
    marginBottom: 30,
    borderBottomWidth: 0,
  },
  btnModifyMore: {
    height: 40,
    width: '100%',
    backgroundColor: '#9dd0eb',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 5,
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
