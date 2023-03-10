import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  BackHandler,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';

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
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../constants/constants';
import state from '../../constants/state';
import { addPost } from '../../services/post.service';
import { authMsg, networkErrorMsg } from '../../constants/message';
import { openNotice, closeNotice } from '../../components/notice.action';

export default function AddPostScreen({ navigation }) {
  //   useEffect(() => {
  //     const backAction = () => {
  //       if (chooseState) return false;
  //       else return true;
  //     };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction
  //   );

  //     return () => backHandler.remove();
  //   }, [chooseState]);
  const dispatch = useDispatch();
  const [vertical, setVertical] = useState(true);
  const [cancel, setCancel] = useState(false);
  const [chooseState, setChooseState] = useState(false);
  const [userState, setUserState] = useState(null);
  const [describedText, setDescribedText] = useState('');
  const [status, setStatus] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [stateList, setStateList] = useState(state);
  const [stateFilter, setStateFilter] = useState(state.state);

  const [images, setImages] = useState([]);
  const [imagesURL, setImagesURL] = useState([]);
  const [imageNumber, setImageNumber] = useState(0);
  const [videoNumber, setVideoNumber] = useState(0);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const user = await AsyncStorage.getItem('user');
      const userData = JSON.parse(user);
      setCurrentUser(userData);
    };
    fetchCurrentUser();
  }, []);

  const pickImages = async () => {
    setImagesURL([]);
    setImages([]);
    // l???y item
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
    });
    // n???u l???y item th??nh c??ng
    if (!result.cancelled) {
      // n???u l???y nhi???u item m???t l??c
      if (result.selected) {
        // n???u t???ng s??? l?????ng item v?????t qu?? 4
        if (result.selected.length > 4 - imageNumber)
          Alert.alert(
            'C???nh b??o',
            `Ch??? ???????c ch???n th??m ${4 - imageNumber} ???nh.`,
            [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
          );
        else {
          // ki???m tra k???t qu??? tr??? v??? c?? video kh??ng
          let haveVideo = false;
          result.selected.forEach((item, index) => {
            if (item.type === 'video') {
              haveVideo = true;
            }
          });
          if (haveVideo)
            Alert.alert(
              'C???nh b??o',
              'Ch??? ???????c ch???n 1 video v?? kh??ng ???????c ch???n c??ng ???nh.',
              [{ text: 'OK', onPress: () => console.log('OK Pressed') }]
            );
          else {
            let imgCount = imageNumber;
            result.selected.forEach(async (item) => {
              imgCount++;
              setImageNumber(imgCount);
              imagesURL.push(item.uri);

              images.push(item);
            });
          }
        }
        // n???u l???y 1 item
      } else {
        if (result.type === 'image' && videoNumber == 0) {
          setImageNumber(imageNumber + 1);
          imagesURL.push(result.uri);
          // const img = (await fetch(result.uri)).blob()._z._data;
          // const imgs = { ...img, mimetype: img.type, path: result.uri };
          // console.log(imgs);
          images.push(result);
        } else if (result.type === 'video' && imageNumber == 0) {
          setVideoNumber(videoNumber + 1);
          imagesURL.push(result.uri);
          // const img = (await fetch(result.uri)).blob()._z._data;
          // const imgs = { ...img, mimetype: img.type, path: result.uri };
          // console.log(imgs);
          images.push(result);
        } else {
          Alert.alert('C???nh b??o', 'Kh??ng ???????c ch???n c??? ???nh v?? video.', [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ]);
        }
      }
      setImagesURL(imagesURL);
      setImages(images);
      console.log(images);
    } else {
      setImagesURL(imagesURL);
      setImages(images);
    }
  };

  const addNewPost = async () => {
    const token = await AsyncStorage.getItem('token');
    let body = { token };
    if (status !== '') {
      body.status = status;
    }
    if (describedText !== '') {
      body.described = describedText;
    }
    let formData = new FormData();
    if (imageNumber > 0) {
      images.forEach((image) => {
        console.log(image);
        const arr = image.uri.split('.');
        formData.append('image', {
          uri: image.uri,
          name: `${image.uri.slice(arr.length - 10, arr.length - 5)}.${
            arr[arr.length - 1]
          }`,
          type: `image/${arr[arr.length - 1]}`,
        });
      });
    }
    if (videoNumber > 0) {
      images.forEach((image) => {
        formData.append('video', image);
      });
    }
    if (imageNumber == 0 && videoNumber == 0) formData.append('video', null);
    body.formData = formData;
    const response = await addPost(body);
    console.log(response);
    if (response.code === '1000') {
      navigation.goBack();
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
  };

  return (
    <View style={styles.container}>
      {/* ch???n c???m x??c */}
      {chooseState && (
        <View style={styles.container}>
          <View style={styles.contentHeader}>
            <View style={styles.contentHeaderLeft}>
              <TouchableOpacity onPress={() => setChooseState(false)}>
                <AntDesign name="arrowleft" size={28} color="black" />
              </TouchableOpacity>
              <Text style={styles.textHeader}>B???n ??ang c???m th???y th??? n??o?</Text>
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
              placeholder="T??m ki???m"
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
                        key={index}
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

      {/* trang t???o b??i vi???t */}
      <View style={styles.contentHeader}>
        <View style={styles.contentHeaderLeft}>
          <TouchableOpacity onPress={() => setCancel(true)}>
            <AntDesign name="arrowleft" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.textHeader}>T???o b??i vi???t</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => addNewPost()}>
          <Text style={styles.textButton}>????NG</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.contentBody}>
          <View style={styles.headerBody}>
            <Image
              source={{ uri: currentUser.avatar }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                marginRight: 18,
              }}
            ></Image>
            <View style={{ width: '80%' }}>
              <Text style={styles.textInfor}>
                {currentUser.username}
                {userState ? (
                  <Text style={{ fontSize: 16, fontWeight: 'normal' }}>
                    {' '}
                    ??ang {
                      stateList.icon[stateList.state.indexOf(userState)]
                    }{' '}
                    c???m th???y {userState}.
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
                <Text style={styles.textinforBottom}>C??ng khai</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.betweenBody}>
            <TextInput
              style={styles.textInput}
              multiline={true}
              placeholder={
                imagesURL.length <= 0
                  ? 'B???n ??ang ngh?? g???'
                  : imageNumber > 0
                  ? 'H??y n??i g?? v??? b???c ???nh n??y'
                  : 'H??y n??i g?? v??? video n??y'
              }
              onFocus={() => {
                setVertical(false);
              }}
              value={describedText}
              onChangeText={(text) => setDescribedText(text)}
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
      {!chooseState && (
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
                        'C???nh b??o',
                        'Ch???n t???i ??a 4 b???c ???nh ho???c 1 video.',
                        [
                          {
                            text: 'OK',
                            onPress: () => console.log('OK Pressed'),
                          },
                        ]
                      );
                  }}
                >
                  <Ionicons
                    name="md-images"
                    size={24}
                    color="green"
                    style={styles.icon}
                  />
                  <Text style={{ fontSize: 16 }}>???nh/video</Text>
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
                  <Text style={{ fontSize: 16 }}>C???m x??c</Text>
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
                    {
                      console.log(imageNumber + ' ' + videoNumber);
                      if (imageNumber < 4 && videoNumber == 0) pickImages();
                      else
                        Alert.alert(
                          'C???nh b??o',
                          'Ch???n t???i ??a 4 b???c ???nh ho???c 1 video.',
                          [
                            {
                              text: 'OK',
                              onPress: () => console.log('OK Pressed'),
                            },
                          ]
                        );
                    }
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
      )}

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
              B???n mu???n ho??n th??nh b??i vi???t c???a m??nh sau?
            </Text>
            <Text style={{ fontSize: 14, color: GREY_COLOR }}>
              H??y l??u l??m b???n nh??p ho???c ti???p t???c ch???nh s???a.
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
                <Text style={styles.postOptionTitle}>L??u l??m b???n nh??p</Text>
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
                <Text style={styles.postOptionTitle}>B??? b??i vi???t</Text>
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
                  Ti???p t???c ch???nh s???a
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

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

  //Body Th??n body
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

  //th??ng b??o
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
