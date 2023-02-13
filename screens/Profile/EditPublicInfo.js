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
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import * as ImagePicker from 'expo-image-picker';
import {
  SCREEN_HEIGHT,
  STATUSBAR_HEIGHT,
  BLUE_COLOR,
  TOUCH_BLUE_COLOR,
} from '../../constants/constants';

export default function EditPublicInfo({ navigation, route }) {
  const userInfo = route.params.userInfo;

  const [avatar, setAvatar] = useState(userInfo.avatar);
  const [coverImage, setCoverImage] = useState(userInfo.coverImage);
  const [username, setUsername] = useState(userInfo.username);
  const [description, setDescription] = useState(userInfo.description);
  const [city, setCity] = useState(userInfo.city);
  const [link, setLink] = useState(userInfo.link);
  const [editUsername, setEditUsername] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [editDetail, setEditDetail] = useState(false);

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
        <Text style={styles.navigationTitle}>Chỉnh sửa trang cá nhân</Text>
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
            <TouchableOpacity onPress={() => setEditUsername(true)}>
              <Text style={{ fontSize: 16, color: '#318bfb' }}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <TextInput
              style={{
                ...styles.introTxt,
                color: editUsername ? '#318bfb' : '#000',
              }}
              editable={editUsername}
              onChangeText={(text) => setUsername(text)}
            >
              {username}
            </TextInput>
            {editUsername ? (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  right: 15,
                  top: 15,
                }}
                onPress={() => {
                  setEditUsername(false);
                }}
              >
                <Text style={{ fontSize: 15, color: '#318bfb' }}>Lưu</Text>
              </TouchableOpacity>
            ) : null}
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <Text style={styles.detailTitle}>Tiểu sử</Text>
            <TouchableOpacity onPress={() => setEditDescription(true)}>
              <Text style={{ fontSize: 16, color: '#318bfb' }}>
                {description ? 'Chỉnh sửa' : 'Thêm'}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity activeOpacity={0.8}>
            <TextInput
              style={{
                ...styles.introTxt,
                color: editDescription ? '#318bfb' : '#000',
              }}
              editable={editDescription}
              onChangeText={(text) => setDescription(text)}
            >
              {description}
            </TextInput>
            {editDescription ? (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  right: 15,
                  top: 15,
                }}
                onPress={() => {
                  setEditDescription(false);
                }}
              >
                <Text style={{ fontSize: 15, color: '#318bfb' }}>Lưu</Text>
              </TouchableOpacity>
            ) : null}
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <View style={styles.detailTitleWrapper}>
            <Text style={styles.detailTitle}>Chi tiết</Text>
            <TouchableOpacity
              onPress={() => {
                setEditDetail(true);
              }}
            >
              <Text style={{ fontSize: 16, color: '#318bfb' }}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.introListWrapper}>
            <View style={styles.introLine}>
              <FontAwesome5Icon
                size={20}
                color="#333"
                style={styles.introIcon}
                name="home"
              />
              <Text style={styles.introLineText}>Sống tại </Text>
              <TextInput
                editable={editDetail}
                style={{
                  ...styles.introHightLight,
                  color: editDetail ? '#318bfb' : '#000',
                }}
                onChangeText={(text) => setCity(text)}
              >
                {city}
              </TextInput>
            </View>
            <View style={styles.introLine}>
              <FontAwesome5Icon
                size={20}
                color="#333"
                style={styles.introIcon}
                name="map-marker-alt"
              />
              <Text style={styles.introLineText}>Đến từ </Text>
              <TextInput
                editable={editDetail}
                style={{
                  ...styles.introHightLight,
                  color: editDetail ? '#318bfb' : '#000',
                }}
                onChangeText={(text) => setCity(text)}
              >
                {city}
              </TextInput>
            </View>

            <View style={styles.introLine}>
              <FontAwesome5Icon
                size={20}
                color="#333"
                style={styles.introIcon}
                name="link"
              />
              <TouchableOpacity>
                <TextInput
                  editable={editDetail}
                  style={{
                    ...styles.introLineText,
                    color: editDetail ? '#318bfb' : '#000',
                  }}
                  onChangeText={(text) => setLink(text)}
                >
                  {link}
                </TextInput>
              </TouchableOpacity>
            </View>
            {editDetail ? (
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  right: 15,
                  top: 15,
                }}
                onPress={() => {
                  setEditDetail(false);
                }}
              >
                <Text style={{ fontSize: 15, color: '#318bfb' }}>Lưu</Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>
        <TouchableHighlight
          style={styles.signinButton}
          onPress={() => {
            navigation.navigate('ProfileScreen');
          }}
          underlayColor={TOUCH_BLUE_COLOR}
        >
          <Text style={styles.textSigninButton}>Xác nhận</Text>
        </TouchableHighlight>
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
    height: '100%',
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
    marginBottom: 25,
    alignSelf: 'center',
    height: 40,
  },
  textSigninButton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
