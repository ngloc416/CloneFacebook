import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { Video } from 'expo-av';
import {
  EvilIcons,
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  Entypo,
} from '@expo/vector-icons';
import {
  LIGHT_GREY_COLOR,
  GREY_COLOR,
  BLUE_COLOR,
} from '../../constants/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import state from '../../constants/state';
import { likePost } from '../../services/like.service';

function VideoDetailItem({ item, navigation }) {
  const [shortcutDescribed, setShortcutDescribed] = useState(true);
  const [liked, setLiked] = useState(item.is_liked);
  const [numberOfLike, setNumberOfLike] = useState(parseInt(item.like));

  const dispatch = useDispatch();

  const time = Date.now() / 1000 - parseInt(item.created);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const [options, setOptions] = useState(false);
  const [isMe, setIsMe] = useState(false);

  const expandDescribed = () => {
    setShortcutDescribed(!shortcutDescribed);
  };

  const onPressLike = async (postId) => {
    if (liked === '0') {
      setLiked('1');
      setNumberOfLike(numberOfLike + 1);
    } else {
      setLiked('0');
      setNumberOfLike(numberOfLike - 1);
    }
    const token = await AsyncStorage.getItem('token');
    await likePost({ postId, token });
  };

  const onPressPostOption = () => {
    setOptions(!options);
  };

  return (
    <View style={styles.item}>
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          <View style={styles.customListView}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                navigation.navigate('ProfileScreen');
              }}
            >
              <Image
                style={styles.avatar}
                source={{ uri: item.author.avatar }}
              ></Image>
            </TouchableOpacity>
            <View style={styles.infoWrapper}>
              <View style={styles.namesWrapper}>
                <TouchableHighlight
                  onPress={() => {
                    navigation.navigate('ProfileScreen');
                  }}
                  style={{ flex: 1 }}
                >
                  <Text
                    style={{ fontSize: 16, fontWeight: '700', color: 'white' }}
                  >
                    {item.author.username}
                    {item.state ? (
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 'normal',
                          color: 'white',
                        }}
                      >
                        {' '}
                        đang {state.icon[state.state.indexOf(item.state)]} cảm
                        thấy {item.state}.
                      </Text>
                    ) : null}
                  </Text>
                </TouchableHighlight>
              </View>

              <View style={styles.extraInfoWrapper}>
                <Text style={{ color: 'white', fontSize: 13 }}>
                  {time < 1 * 60 * 60 ? 'Vừa xong' : null}
                  {time >= 1 * 60 * 60 && time < 24 * 60 * 60
                    ? `${Math.floor(time / 3600)} giờ`
                    : null}
                  {time >= 24 * 60 * 60 && time < 30 * 24 * 60 * 60
                    ? `${Math.floor(time / 86400)} ngày`
                    : null}
                  {time >= 30 * 24 * 60 * 60 && time < 12 * 30 * 24 * 60 * 60
                    ? `${Math.floor(time / 2592000)} tháng`
                    : null}
                  {time >= 12 * 30 * 24 * 60 * 60
                    ? `${Math.floor(time / 31104000)} năm`
                    : null}
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 13,
                    marginHorizontal: 5,
                  }}
                >
                  ·
                </Text>
                <FontAwesome5Icon color="white" name="globe-asia" />
              </View>
            </View>
          </View>

          <TouchableHighlight
            onPress={onPressPostOption}
            style={{
              width: 45,
              height: 45,
              borderRadius: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon name="ellipsis-h" color="white"></Icon>
          </TouchableHighlight>
        </View>
      </View>

      <TouchableHighlight
        style={{ paddingBottom: 7, paddingLeft: 15, paddingRight: 15 }}
        onPress={expandDescribed}
      >
        {item.described ? (
          item.described.length > 150 ? (
            shortcutDescribed ? (
              <Text style={styles.paragraph}>
                {item.described.slice(0, 150)}
                <Text onPress={expandDescribed} style={styles.describedSupport}>
                  {` ... Xem thêm`}
                </Text>
              </Text>
            ) : (
              <Text style={styles.paragraph}>
                {item.described}
                <Text onPress={expandDescribed} style={styles.describedSupport}>
                  {` Ẩn Bớt`}
                </Text>
              </Text>
            )
          ) : (
            <Text style={styles.paragraph}>{item.described}</Text>
          )
        ) : null}
      </TouchableHighlight>

      <View>
        <Video
          ref={video}
          style={styles.video}
          source={{ uri: item.video.url }}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={setStatus}
        />
      </View>

      <View style={styles.footer}>
        <TouchableHighlight
          onPress={() => {
            navigation.navigate('PostCommentScreen', { postId: item.id });
          }}
        >
          <View style={styles.topFooter}>
            <View style={styles.countLike}>
              <AntDesign name="like1" size={16} color={BLUE_COLOR} />

              <Text
                style={{
                  marginLeft: 5,
                  color: 'white',
                  fontSize: 13,
                }}
              >
                {liked === '1'
                  ? numberOfLike > 1
                    ? `Bạn và ${numberOfLike - 1} người khác`
                    : 'Bạn'
                  : numberOfLike}
              </Text>
            </View>
            <View style={styles.rightComponent}>
              <Text style={{ color: 'white', fontSize: 13 }}>
                {item.comment} bình luận
              </Text>
            </View>
          </View>
        </TouchableHighlight>

        <View style={styles.bottomFooter}>
          <TouchableHighlight onPress={() => onPressLike(item.id)}>
            <View style={styles.groupItemFooter}>
              {liked === '0' ? (
                <EvilIcons name="like" size={30} color="white" />
              ) : (
                <EvilIcons name="like" size={30} color={BLUE_COLOR} />
              )}
              {liked === '0' ? (
                <Text style={styles.textIconFooter}>Thích</Text>
              ) : (
                <Text style={styles.textIconLikedFooter}>Thích</Text>
              )}
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => {
              navigation.navigate('PostCommentScreen', { postId: item.id });
            }}
          >
            <View style={styles.groupItemFooter}>
              <EvilIcons name="comment" size={30} color="white" />
              <Text style={styles.textIconFooter}>Bình luận</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={options && !isMe}
        onRequestClose={() => {
          setOptions(!options);
        }}
        style={styles.avatarOptionsContainer}
      >
        <View style={styles.backdrop}>
          <TouchableOpacity
            onPress={() => {
              setOptions(!options);
            }}
            style={{ width: '100%', height: '100%' }}
          ></TouchableOpacity>
        </View>
        <View style={styles.postOptionsWrapper}>
          <>
            <TouchableOpacity
              style={styles.postOptionItemWrapper}
              onPress={() => {
                setOptions(!options);
              }}
            >
              <View style={styles.postOptionItem}>
                <View style={styles.optionIcon}>
                  <MaterialIcons name="report" size={24} color="black" />
                </View>
                <View>
                  <Text style={styles.postOptionTitle}>Báo cáo video</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.postOptionItemWrapper}
              onPress={() => {
                setOptions(!options);
              }}
            >
              <View style={styles.postOptionItem}>
                <View style={styles.optionIcon}>
                  <FontAwesome5 name="user-friends" size={24} color="black" />
                </View>
                <View>
                  <Text style={styles.postOptionTitle}>Kết bạn video</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.postOptionItemWrapper}
              onPress={() => {
                setOptions(!options);
              }}
            >
              <View style={styles.postOptionItem}>
                <View style={styles.optionIcon}>
                  <Entypo name="block" size={24} color="black" />
                </View>
                <View>
                  <Text style={styles.postOptionTitle}>Chặn chủ video</Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        </View>
      </Modal>
    </View>
  );
}

const screenWidth = Math.round(Dimensions.get('window').width);
export default VideoDetailItem;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#000',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { height: 0, width: 0 },
    marginTop: 10,
  },
  customListView: {
    paddingTop: 15,
    paddingBottom: 18,
    flexDirection: 'row',
    width: '92%',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  infoWrapper: {
    marginLeft: 8,
    flex: 1,
  },
  namesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  extraInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 16,
    color: 'white',
  },
  describedSupport: {
    fontSize: 16,
    color: GREY_COLOR,
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
  topFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  countLike: {
    flexDirection: 'row',
  },
  rightComponent: {
    flexDirection: 'row',
  },
  bottomFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  groupItemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 43,
    width: screenWidth / 2,
    justifyContent: 'center',
  },
  textIconFooter: {
    marginLeft: 4,
    fontSize: 13,
    color: 'white',
  },
  textIconLikedFooter: {
    marginLeft: 4,
    fontSize: 13,
    color: BLUE_COLOR,
  },
  video: {
    height: 300,
    width: '100%',
  },
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
    fontWeight: '700',
    marginLeft: 15,
  },
});
