import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  Dimensions,
  Modal,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';

import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { EvilIcons, AntDesign } from '@expo/vector-icons';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import {
  GREY_COLOR,
  BLUE_COLOR,
  LIGHT_GREY_COLOR,
} from '../../constants/constants';

import { likePost } from '../../services/like.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PostDetailScreen({ navigation, route }) {
  const post = route.params.post;

  const [shortcutDescribed, setShortcutDescribed] = useState(true);
  const [liked, setLiked] = useState(post.is_liked);
  const [numberOfLike, setNumberOfLike] = useState(parseInt(post.like));

  const [options, setOptions] = useState(false);
  const [isMe, setIsMe] = useState(true);

  const time = Date.now() / 1000 - parseInt(post.created);

  const expandDescribed = () => {
    setShortcutDescribed(!shortcutDescribed);
  };

  const onPressLike = async () => {
    if (liked === '0') {
      setLiked('1');
      setNumberOfLike(numberOfLike + 1);
    } else {
      setLiked('0');
      setNumberOfLike(numberOfLike - 1);
    }
    const token = await AsyncStorage.getItem('token');
    await likePost({ postId: post.id, token });
  };

  return (
    <ScrollView style={styles.post}>
      {/* Header */}

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingLeft: 15,
          paddingRight: 15,
        }}
      >
        <View style={styles.customListView}>
          <TouchableOpacity activeOpacity={0.5} onPress={() => {}}>
            <Image
              style={styles.avatar}
              source={{ uri: post.author.avatar }}
            ></Image>
          </TouchableOpacity>
          <View style={styles.infoWrapper}>
            <View style={styles.namesWrapper}>
              <TouchableHighlight
                underlayColor={LIGHT_GREY_COLOR}
                onPress={() => {}}
              >
                <Text style={{ fontSize: 16, fontWeight: '700' }}>
                  {post.author.username || post.author.name}
                </Text>
              </TouchableHighlight>
            </View>

            <View style={styles.extraInfoWrapper}>
              <Text style={{ color: '#6b6d6e', fontSize: 13 }}>
                {time < 1 * 60 ? 'Vừa xong' : null}
                {time >= 1 * 60 && time < 60 * 60
                  ? `${Math.floor(time / 60)} phút`
                  : null}
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
                  color: '#6b6d6e',
                  fontSize: 13,
                  marginHorizontal: 5,
                }}
              >
                ·
              </Text>
              <FontAwesome5Icon color="#6b6d6e" name="globe-asia" />
            </View>
          </View>
        </View>

        <TouchableHighlight
          underlayColor={LIGHT_GREY_COLOR}
          onPress={() => {
            setOptions(true);
          }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="ellipsis-h" color="#6b6d6e"></Icon>
        </TouchableHighlight>
      </View>

      <TouchableHighlight
        underlayColor={LIGHT_GREY_COLOR}
        style={{ paddingBottom: 7, paddingLeft: 15, paddingRight: 15 }}
        onPress={expandDescribed}
      >
        {post.described ? (
          post.described.length > 150 ? (
            shortcutDescribed ? (
              <Text style={styles.paragraph}>
                {post.described.slice(0, 150)}
                <Text onPress={expandDescribed} style={styles.describedSupport}>
                  {` ... Xem thêm`}
                </Text>
              </Text>
            ) : (
              <Text style={styles.paragraph}>
                {post.described}
                <Text onPress={expandDescribed} style={styles.describedSupport}>
                  {` Ẩn Bớt`}
                </Text>
              </Text>
            )
          ) : (
            <Text style={styles.paragraph}>{post.described}</Text>
          )
        ) : null}
      </TouchableHighlight>

      <View style={styles.footer}>
        <TouchableHighlight
          underlayColor={LIGHT_GREY_COLOR}
          onPress={() =>
            navigation.navigate('PostCommentScreen', {
              postId: post.id,
            })
          }
        >
          <View style={styles.topFooter}>
            <View style={styles.countLike}>
              <AntDesign name="like1" size={16} color={BLUE_COLOR} />

              <Text
                style={{
                  marginLeft: 5,
                  color: '#6b6d6e',
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
              <Text style={{ color: '#6b6d6e', fontSize: 13 }}>
                {post.comment} bình luận
              </Text>
            </View>
          </View>
        </TouchableHighlight>

        <View style={styles.bottomFooter}>
          <TouchableHighlight
            underlayColor={LIGHT_GREY_COLOR}
            onPress={onPressLike}
          >
            <View style={styles.groupItemFooter}>
              {liked === '0' ? (
                <EvilIcons name="like" size={30} color="#6b6d6e" />
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
            underlayColor={LIGHT_GREY_COLOR}
            onPress={() =>
              navigation.navigate('PostCommentScreen', {
                postId: post.id,
              })
            }
          >
            <View style={styles.groupItemFooter}>
              <EvilIcons name="comment" size={30} color="#6b6d6e" />
              <Text style={styles.textIconFooter}>Bình luận</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>

      {post.image &&
        post.image.map((image, key) => (
          <TouchableWithoutFeedback
            onPress={() =>
              navigation.navigate('PostImageScreen', {
                postDetail: post,
                index: key,
              })
            }
          >
            <View>
              <View style={styles.seperatorLine}></View>
              <Image
                source={{ uri: image.url }}
                style={styles.image}
                resizeMode="cover"
                key={key}
              />
              <View style={styles.bottomFooter}>
                <TouchableHighlight>
                  <View style={styles.groupItemFooter}>
                    <EvilIcons name="like" size={30} color="#6b6d6e" />

                    <Text style={styles.textIconFooter}>Thích</Text>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight>
                  <View style={styles.groupItemFooter}>
                    <EvilIcons name="comment" size={30} color="#6b6d6e" />
                    <Text style={styles.textIconFooter}>Bình luận</Text>
                  </View>
                </TouchableHighlight>
              </View>
            </View>
          </TouchableWithoutFeedback>
        ))}
      <View style={styles.seperatorLine}></View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={options}
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
          {isMe ? (
            <>
              <TouchableOpacity
                style={styles.postOptionItemWrapper}
                onPress={() => {
                  setOptions(!options);
                }}
              >
                <View style={styles.postOptionItem}>
                  <View style={styles.optionIcon}>
                    <Ionicons
                      name="notifications-outline"
                      size={24}
                      color={GREY_COLOR}
                    />
                  </View>
                  <View>
                    <Text style={styles.postOptionTitle}>
                      Tắt thông báo về bài viết này
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.postOptionItemWrapper}
                onPress={() => {
                  setOptions(!options);
                  Alert.alert(
                    'Xóa bài viết?',
                    'Bạn có thể chỉnh sửa bài viết nếu cần thay đổi.',
                    [
                      { text: 'XÓA', onPress: () => console.log('OK Pressed') },
                      {
                        text: 'CHỈNH SỬA',
                        onPress: () => navigation.navigate('EditPostScreen'),
                      },
                      { text: 'HỦY', onPress: () => console.log('OK Pressed') },
                    ]
                  );
                }}
              >
                <View style={styles.postOptionItem}>
                  <View style={styles.optionIcon}>
                    <FontAwesome name="trash-o" size={24} color={GREY_COLOR} />
                  </View>
                  <View>
                    <Text style={styles.postOptionTitle}>Xóa</Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.postOptionItemWrapper}
                onPress={() => {
                  setOptions(!options);
                  navigation.navigate('EditPostScreen');
                }}
              >
                <View style={styles.postOptionItem}>
                  <View style={styles.optionIcon}>
                    <Feather name="edit-2" size={20} color={GREY_COLOR} />
                  </View>
                  <View>
                    <Text style={styles.postOptionTitle}>Sửa bài viết</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.postOptionItemWrapper}
                onPress={() => {
                  setOptions(!options);
                }}
              >
                <View style={styles.postOptionItem}>
                  <View style={styles.optionIcon}>
                    <AntDesign
                      name="closesquare"
                      size={24}
                      color={GREY_COLOR}
                    />
                  </View>
                  <View>
                    <Text style={styles.postOptionTitle}>Báo cáo bài viết</Text>
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
                    <Ionicons
                      name="notifications-outline"
                      size={24}
                      color={GREY_COLOR}
                    />
                  </View>
                  <View>
                    <Text style={styles.postOptionTitle}>
                      Bật thông báo về bài viết này
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </ScrollView>
  );
}

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  post: {
    width: '100%',
    backgroundColor: '#fff',
  },
  customListView: {
    paddingTop: 15,
    paddingBottom: 18,
    flexDirection: 'row',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  infoWrapper: {
    marginLeft: 8,
  },
  namesWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  extraInfoWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paragraph: {
    fontSize: 16,
  },
  describedSupport: {
    fontSize: 16,
    color: GREY_COLOR,
  },
  image: {
    width: '100%',
    height: 350,
  },
  seperatorLine: {
    width: '100%',
    backgroundColor: 'lightgrey',
    height: 7,
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
    color: '#6b6d6e',
  },
  textIconLikedFooter: {
    marginLeft: 4,
    fontSize: 13,
    color: BLUE_COLOR,
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
