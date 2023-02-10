import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  GREY_COLOR,
  BLUE_COLOR,
  STATUSBAR_HEIGHT,
  LIGHT_GREY_COLOR,
} from '../../constants/constants';

export default function AddPostScreen({ navigation }) {
  const post = {
    author: {
      id: '63b4d6871870e51c9354c506',
      userName: 'Abc',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
    },
    described: 'Merry Christmas',
    image: [],
    video: null,
    created: '1667879990',
    like: '15',
    comment: '33',
    is_liked: '1',
    is_blocked: '0',
    can_comment: '1',
    can_edit: '0',
    state: 'hạnh phúc',
  };
  const [vertical, setVertical] = useState(true);
  const [cancel, setCancel] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.contentHeader}>
        <View style={styles.contentHeaderLeft}>
          <TouchableOpacity onPress={() => setCancel(true)}>
            <AntDesign name="arrowleft" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Tạo bài viết</Text>
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.textButton}>ĐĂNG</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.contentBody}>
          <View style={styles.headerBody}>
            <Image
              source={require('../../assets/Login/Avatar.jpg')}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginRight: 18,
              }}
            ></Image>
            <View>
              <Text style={styles.textInfor}>{'Nguyễn Đình Lộc'}</Text>
              <TouchableOpacity style={styles.inforBottom}>
                <FontAwesome5Icon
                  style={{ marginRight: 3 }}
                  name="globe-asia"
                  size={14}
                  color={GREY_COLOR}
                ></FontAwesome5Icon>
                <Text style={styles.textinforBottom}>Công khai</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.betweenBody}>
            <TextInput
              style={styles.textInput}
              multiline={true}
              placeholder={
                post.image.length > 0
                  ? 'Hãy nói gì về bức ảnh này'
                  : 'Bạn đang nghĩ gì?'
              }
              onFocus={() => {
                setVertical(false);
              }}
            />
          </View>
          {post.image && post.image.length === 1 && (
            <TouchableWithoutFeedback
              style={styles.imageContainer1}
              onPress={() => {
                navigation.navigate('PostImageScreen');
              }}
            >
              <Image
                source={{ uri: post.image[0].url }}
                resizeMode="cover"
                style={styles.imageDetail1}
              />
            </TouchableWithoutFeedback>
          )}

          {post.image && post.image.length === 2 && (
            <View style={styles.imageContainer2}>
              <Image
                source={{ uri: post.image[0].url }}
                resizeMode="cover"
                style={styles.imageDetail2}
              />
              <Image
                source={{ uri: post.image[0].url }}
                resizeMode="cover"
                style={styles.imageDetail2}
              />
            </View>
          )}

          {post.image && post.image.length === 3 && (
            <View style={styles.imageContainer3}>
              <View style={styles.imageContainerLeft3}>
                <Image
                  source={{ uri: post.image[0].url }}
                  resizeMode="cover"
                  style={styles.imageDetail31}
                />
              </View>
              <View style={styles.imageContainerRight3}>
                <Image
                  source={{ uri: post.image[1].url }}
                  resizeMode="cover"
                  style={styles.imageDetail32}
                />
                <Image
                  source={{ uri: post.image[2].url }}
                  resizeMode="cover"
                  style={styles.imageDetail32}
                />
              </View>
            </View>
          )}

          {post.image && post.image.length === 4 && (
            <View style={styles.imageContainer4}>
              <View style={styles.imageAboveSubContainer4}>
                <Image
                  source={{ uri: post.image[0].url }}
                  resizeMode="cover"
                  style={styles.imageDetail4}
                />
                <Image
                  source={{ uri: post.image[1].url }}
                  resizeMode="cover"
                  style={styles.imageDetail4}
                />
              </View>
              <View style={styles.imageUnderSubContainer4}>
                <Image
                  source={{ uri: post.image[2].url }}
                  resizeMode="cover"
                  style={styles.imageDetail4}
                />
                <Image
                  source={{ uri: post.image[3].url }}
                  resizeMode="cover"
                  style={styles.imageDetail4}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{ height: 47 }}>
        <View style={styles.footer}>
          {vertical ? (
            <View style={styles.iconFooterCol}>
              <TouchableOpacity style={styles.item} onPress={() => {}}>
                <Ionicons
                  name="md-images"
                  size={24}
                  color="green"
                  style={styles.icon}
                />
                <Text style={{ fontSize: 16 }}>Ảnh/video</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item}>
                <Entypo
                  name="emoji-happy"
                  size={24}
                  color="#F5C33B"
                  style={styles.icon}
                />
                <Text style={{ fontSize: 16 }}>Cảm xúc</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.item}>
                <Entypo
                  name="camera"
                  size={24}
                  color={BLUE_COLOR}
                  style={styles.icon}
                />
                <Text style={{ fontSize: 16 }}>Camera</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.iconFooter}>
              <TouchableOpacity onPress={() => {}}>
                <Ionicons name="md-images" size={24} color="green" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo name="emoji-happy" size={24} color="#F5C33B" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Entypo name="camera" size={24} color={BLUE_COLOR} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVertical(!vertical)}>
                <MaterialCommunityIcons
                  name="dots-horizontal-circle"
                  size={26}
                  color={GREY_COLOR}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={cancel}
        onRequestClose={() => {
          setCancel(!cancel);
        }}
        style={styles.avatarOptionsContainer}
      >
        <View style={styles.backdrop}>
          <TouchableOpacity
            onPress={() => {
              setCancel(!cancel);
            }}
            style={{ width: '100%', height: '100%' }}
          ></TouchableOpacity>
        </View>
        <View style={styles.postOptionsWrapper}>
          <View style={{ height: 60 }}>
            <Text style={{ fontSize: 16, marginBottom: 4 }}>
              Bạn muốn hoàn thành bài viết của mình sau?
            </Text>
            <Text style={{ fontSize: 14, color: GREY_COLOR }}>
              Hãy lưu làm bản nháp hoặc tiếp tục chỉnh sửa.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.postOptionItemWrapper}
            onPress={() => {
              setCancel(!cancel);
              navigation.goBack();
            }}
          >
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <Ionicons
                  name="ios-bookmark-outline"
                  size={24}
                  color={GREY_COLOR}
                />
              </View>
              <View>
                <Text style={styles.postOptionTitle}>Lưu làm bản nháp</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postOptionItemWrapper}
            onPress={() => {
              setCancel(!cancel);
              navigation.goBack();
            }}
          >
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <FontAwesome name="trash-o" size={24} color={GREY_COLOR} />
              </View>
              <View>
                <Text style={styles.postOptionTitle}>Bỏ bài viết</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.postOptionItemWrapper}
            onPress={() => {
              setCancel(!cancel);
            }}
          >
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <AntDesign name="check" size={24} color={BLUE_COLOR} />
              </View>
              <View>
                <Text style={{ ...styles.postOptionTitle, color: BLUE_COLOR }}>
                  Tiếp tục chỉnh sửa
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);

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
  button: {
    backgroundColor: BLUE_COLOR,
    padding: 7,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 7,
  },
  textButton: {
    fontWeight: '700',
    color: '#fff',
  },
  // Body
  contentBody: {
    width: SCREEN_WIDTH,
  },
  headerBody: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  textInfor: {
    fontSize: 15,
    fontWeight: '700',
  },
  inforBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingLeft: 10,
    paddingVertical: 3,
    marginTop: 4,
    width: 110,
  },
  textinforBottom: {
    marginLeft: 6,
    fontSize: 12,
    fontWeight: '700',
    color: GREY_COLOR,
  },

  //Body Thân body
  betweenBody: {
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  textInput: {
    fontSize: 23,
    marginRight: 10,
  },
  imageContainer1: {
    marginTop: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageDetail1: {
    width: '100%',
    height: 350,
  },

  imageContainer2: {
    marginTop: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  imageDetail2: {
    width: '49.5%',
    height: 350,
  },

  imageContainer3: {
    marginTop: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    height: 350,
  },
  imageContainerLeft3: {
    width: '49.5%',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100%',
  },
  imageContainerRight3: {
    justifyContent: 'space-between',
    width: '49.5%',
    height: '100%',
    alignItems: 'center',
    flexDirection: 'column',
  },
  imageDetail31: {
    width: '100%',
    height: '100%',
  },
  imageDetail32: {
    width: '100%',
    height: '49.5%',
  },

  imageContainer4: {
    display: 'flex',
    marginTop: 5,
    width: '100%',
    height: 350,
    flexDirection: 'row',
  },
  imageAboveSubContainer4: {
    width: '50%',
    height: 350,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  imageUnderSubContainer4: {
    width: '50%',
    height: 350,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  imageDetail4: {
    width: '99%',
    height: '49.5%',
  },

  //Body Footer
  footer: {
    width: SCREEN_WIDTH,
    position: 'absolute',
    borderTopWidth: 0.2,
    borderTopColor: GREY_COLOR,
    bottom: 0,
    backgroundColor: '#fff',
  },
  iconFooter: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  //colum
  iconFooterCol: {
    flexDirection: 'column',
  },
  item: {
    flexDirection: 'row',
    borderTopWidth: 0.2,
    borderTopColor: GREY_COLOR,
    paddingHorizontal: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },

  //thông báo
  avatarOptionsContainer: {
    position: 'relative',
  },
  backdrop: {
    zIndex: 1,
  },
  postOptionsWrapper: {
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
    marginLeft: 15,
  },
});
