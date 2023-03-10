import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import state from '../../constants/state';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  GREY_COLOR,
  BLUE_COLOR,
  STATUSBAR_HEIGHT,
  SCREEN_HEIGHT,
} from '../../constants/constants';

export default function EditPostScreen({ navigation }) {
  let post = {
    author: {
      id: '63b4d6871870e51c9354c506',
      userName: 'Abc',
      avatar:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
    },
    described: 'Merry Christmas',
    image: [
      {
        url: 'https://images.baodantoc.vn/uploads/2021/Th%C3%A1ng_12/Ng%C3%A0y_23/%C3%81nh/Giang%20sinh/m%E1%BB%B9.jpg',
        id: '63b4d6871870e51c9354c506',
      },
      {
        url: 'https://hinhanhdephd.com/wp-content/uploads/2017/10/hinh-anh-mua-xuan-dep-canh-dep-thien-nhien-trong-mua-xuan-5.jpg',
        id: '63b4d6871870e51c9354c506',
      },
    ],
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

  useEffect(() => {
    if (post.video) {
      imagesURL.push(post.video.url);
      setImagesURL(imagesURL);
      setVideoNumber(1);
    } else {
      post.image.forEach((element) => {
        imagesURL.push(element.url);
      });
      setImagesURL(imagesURL);
      setImageNumber(post.image.length);
    }
  }, []);

  const [chooseState, setChooseState] = useState(false);
  const [userState, setUserState] = useState(post.state);
  const [stateList, setStateList] = useState(state);
  const [stateFilter, setStateFilter] = useState(state.state);

  const [vertical, setVertical] = useState(true);
  const [described, setDescribed] = useState(post.described);

  const [images, setImages] = useState([]);
  const [imagesURL, setImagesURL] = useState([]);
  const [imageNumber, setImageNumber] = useState(0);
  const [videoNumber, setVideoNumber] = useState(0);

  const pickImages = async () => {
    setImagesURL([]);
    // lấy item
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });
    // nếu lấy item thành công
    if (!result.cancelled) {
      // nếu lấy nhiều item một lúc
      if (result.selected) {
        // nếu tổng số lượng item vượt quá 4
        if (result.selected.length > 4 - imageNumber)
          Alert.alert(
            'Cảnh báo',
            `Chỉ được chọn thêm ${4 - imageNumber} ảnh.`,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
          );
        else {
          // kiểm tra kết quả trả về có video không
          let haveVideo = false;
          result.selected.forEach((item, index) => {
            if (item.type === 'video') {
              haveVideo = true;
            }
          });
          if (haveVideo)
            Alert.alert(
              'Cảnh báo',
              'Chỉ được chọn 1 video và không được chọn cùng ảnh.',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
          else {
            let imgCount = imageNumber;
            result.selected.forEach((item) => {
              imgCount++;
              setImageNumber(imgCount);
              imagesURL.push(item.uri);
            });
          }
        }
        // nếu lấy 1 item
      } else {
        if (result.type === 'image' && videoNumber == 0) {
          setImageNumber(imageNumber + 1);
          imagesURL.push(result.uri);
        } else if (result.type === 'video' && imageNumber == 0) {
          setVideoNumber(videoNumber + 1);
          imagesURL.push(result.uri);
        } else {
          Alert.alert('Cảnh báo', 'Không được chọn cả ảnh và video.', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      }
      setImagesURL(imagesURL);
    } else setImagesURL(imagesURL);
  };

  return (
    <View style={styles.container}>
      {/* chọn cảm xúc */}
      {chooseState && (
        <View style={{ ...styles.container, zIndex: 999 }}>
          <View style={styles.contentHeader}>
            <View style={styles.contentHeaderLeft}>
              <TouchableOpacity onPress={() => setChooseState(false)}>
                <AntDesign name="arrowleft" size={28} color="black" />
              </TouchableOpacity>
              <Text style={styles.textHeader}>Bạn đang cảm thấy thế nào?</Text>
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 15,
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <FontAwesome5Icon name="search" size={18} color="gray" />
            <TextInput
              value={userState}
              onChangeText={(text) => {
                setStateFilter(
                  state.state.filter((item) =>
                    item.includes(text.toLowerCase())
                  )
                );
              }}
              style={{ marginLeft: 10, fontSize: 17 }}
              placeholder="Tìm kiếm"
              placeholderTextColor={GREY_COLOR}
              autoFocus={true}
            />
            {userState ? (
              <TouchableOpacity
                style={{ position: 'absolute', right: 25 }}
                onPress={() => {
                  setUserState(null);
                  setStateFilter(state.state);
                }}
              >
                <AntDesign name="close" size={23} color={GREY_COLOR} />
              </TouchableOpacity>
            ) : null}
          </View>

          <ScrollView
            style={{
              marginTop: 10,
              flex: 1,
              borderTopColor: GREY_COLOR,
              borderTopWidth: 0.2,
            }}
          >
            {stateFilter
              ? stateFilter.map((item, index) => {
                  return (
                    <TouchableOpacity
                      style={{
                        borderWidth: 0.2,
                        borderColor: GREY_COLOR,
                        width: '100%',
                        height: 60,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onPress={() => {
                        setUserState(item);
                        setChooseState(false);
                      }}
                    >
                      <Text style={{ fontSize: 28 }} key={`icon${index}`}>
                        {stateList.icon[index]}
                      </Text>
                      <Text
                        style={{ fontSize: 17, marginLeft: 10 }}
                        key={{ index }}
                      >
                        {item}
                      </Text>
                    </TouchableOpacity>
                  );
                })
              : null}
          </ScrollView>
        </View>
      )}
      <View style={styles.contentHeader}>
        <View style={styles.contentHeaderLeft}>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Bỏ thay đổi?',
                'Nếu bỏ bây giờ thì bạn sẽ mất mọi thay đổi trên bài viết này.',
                [
                  {
                    text: 'CHỈNH SỬA TIẾP',
                    onPress: () => console.log('CHỈNH SỬA TIẾP'),
                  },
                  { text: 'BỎ', onPress: () => navigation.goBack() },
                ]
              )
            }
          >
            <AntDesign name="arrowleft" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Chỉnh sửa bài viết</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.textButton}>Lưu</Text>
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
            <View style={{ width: '80%' }}>
              <Text style={styles.textInfor}>
                {'Nguyễn Đình Lộc'}
                {userState ? (
                  <Text style={{ fontSize: 16, fontWeight: 'normal' }}>
                    {' '}
                    đang {
                      stateList.icon[stateList.state.indexOf(userState)]
                    }{' '}
                    cảm thấy {userState}.
                  </Text>
                ) : null}
              </Text>
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
                imagesURL.length <= 0
                  ? 'Bạn đang nghĩ gì?'
                  : imageNumber > 0
                  ? 'Hãy nói gì về bức ảnh này'
                  : 'Hãy nói gì về video này'
              }
              onFocus={() => {
                setVertical(false);
              }}
              value={described}
              onChangeText={(text) => {
                if (text) {
                  setDescribed(text);
                } else setDescribed(null);
              }}
            />
          </View>
          {imagesURL && imagesURL.length === 1 && (
            <View style={styles.imageContainer1} onPress={() => {}}>
              <Image
                source={{ uri: imagesURL[0] }}
                resizeMode="cover"
                style={styles.imageDetail1}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 5,
                }}
                onPress={() => {
                  imagesURL.pop();
                  setImagesURL(imagesURL);
                  setImageNumber(0);
                }}
              >
                <AntDesign name="closecircle" size={24} color={GREY_COLOR} />
              </TouchableOpacity>
            </View>
          )}

          {imagesURL && imagesURL.length === 2 && (
            <View style={styles.imageContainer2}>
              <Image
                source={{ uri: imagesURL[0] }}
                resizeMode="cover"
                style={styles.imageDetail2}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: 5,
                  top: 5,
                  zIndex: 66,
                }}
                onPress={() => {
                  imagesURL.pop();
                  setImagesURL(imagesURL);
                  setImageNumber(1);
                }}
              >
                <AntDesign name="closecircle" size={24} color={GREY_COLOR} />
              </TouchableOpacity>

              <Image
                source={{ uri: imagesURL[1] }}
                resizeMode="cover"
                style={styles.imageDetail2}
              />
              <TouchableOpacity
                style={{
                  position: 'absolute',
                  right: '52%',
                  top: 5,
                }}
                onPress={() => {
                  imagesURL.shift();
                  setImagesURL(imagesURL);
                  setImageNumber(1);
                }}
              >
                <AntDesign name="closecircle" size={24} color={GREY_COLOR} />
              </TouchableOpacity>
            </View>
          )}

          {imagesURL && imagesURL.length === 3 && (
            <View style={styles.imageContainer3}>
              <View style={styles.imageContainerLeft3}>
                <Image
                  source={{ uri: imagesURL[0] }}
                  resizeMode="cover"
                  style={styles.imageDetail31}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 5,
                    top: 5,
                    zIndex: 66,
                  }}
                  onPress={() => {
                    imagesURL.shift();
                    setImagesURL(imagesURL);
                    setImageNumber(2);
                  }}
                >
                  <AntDesign name="closecircle" size={24} color={GREY_COLOR} />
                </TouchableOpacity>
              </View>
              <View style={styles.imageContainerRight3}>
                <Image
                  source={{ uri: imagesURL[1] }}
                  resizeMode="cover"
                  style={styles.imageDetail32}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 5,
                    top: 5,
                    zIndex: 66,
                  }}
                  onPress={() => {
                    imagesURL.splice(1, 1);
                    setImagesURL(imagesURL);
                    setImageNumber(2);
                  }}
                >
                  <AntDesign name="closecircle" size={24} color={GREY_COLOR} />
                </TouchableOpacity>
                <Image
                  source={{ uri: imagesURL[2] }}
                  resizeMode="cover"
                  style={styles.imageDetail32}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 5,
                    top: '52%',
                    zIndex: 66,
                  }}
                  onPress={() => {
                    imagesURL.pop();
                    setImagesURL(imagesURL);
                    setImageNumber(2);
                  }}
                >
                  <AntDesign name="closecircle" size={24} color={GREY_COLOR} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {imagesURL && imagesURL.length === 4 && (
            <View style={styles.imageContainer4}>
              <View style={styles.imageAboveSubContainer4}>
                <Image
                  source={{ uri: imagesURL[0] }}
                  resizeMode="cover"
                  style={styles.imageDetail4}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 5,
                    top: 5,
                    zIndex: 66,
                  }}
                  onPress={() => {
                    imagesURL.shift();
                    setImagesURL(imagesURL);
                    setImageNumber(3);
                  }}
                >
                  <AntDesign name="closecircle" size={24} color={GREY_COLOR} />
                </TouchableOpacity>
                <Image
                  source={{ uri: imagesURL[1] }}
                  resizeMode="cover"
                  style={styles.imageDetail4}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 5,
                    top: '52%',
                    zIndex: 66,
                  }}
                  onPress={() => {
                    imagesURL.splice(1, 1);
                    setImagesURL(imagesURL);
                    setImageNumber(3);
                  }}
                >
                  <AntDesign name="closecircle" size={24} color={GREY_COLOR} />
                </TouchableOpacity>
              </View>
              <View style={styles.imageUnderSubContainer4}>
                <Image
                  source={{ uri: imagesURL[2] }}
                  resizeMode="cover"
                  style={styles.imageDetail4}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 5,
                    top: 5,
                    zIndex: 66,
                  }}
                  onPress={() => {
                    imagesURL.splice(2, 1);
                    setImagesURL(imagesURL);
                    setImageNumber(3);
                  }}
                >
                  <AntDesign name="closecircle" size={24} color={GREY_COLOR} />
                </TouchableOpacity>
                <Image
                  source={{ uri: imagesURL[3] }}
                  resizeMode="cover"
                  style={styles.imageDetail4}
                />
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 5,
                    top: '52%',
                    zIndex: 66,
                  }}
                  onPress={() => {
                    imagesURL.pop();
                    setImagesURL(imagesURL);
                    setImageNumber(3);
                  }}
                >
                  <AntDesign name="closecircle" size={24} color={GREY_COLOR} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{ height: 47 }}>
        <View style={styles.footer}>
          {vertical ? (
            <View style={styles.iconFooterCol}>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  console.log(imageNumber + ' ' + videoNumber);
                  if (imageNumber < 4 && videoNumber == 0) pickImages();
                  else
                    Alert.alert(
                      'Cảnh báo',
                      'Chọn tối đa 4 bức ảnh hoặc 1 video.',
                      [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
                    );
                }}
              >
                <Ionicons
                  name="md-images"
                  size={24}
                  color="green"
                  style={styles.icon}
                />
                <Text style={{ fontSize: 16 }}>Ảnh/video</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  setStateFilter(state.state);
                  setChooseState(true);
                }}
              >
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
              <TouchableOpacity
                onPress={() => {
                  pickImages;
                }}
              >
                <Ionicons name="md-images" size={24} color="green" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setStateFilter(state.state);
                  setChooseState(true);
                }}
              >
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
});
