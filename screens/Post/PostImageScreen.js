import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  Animated,
  Dimensions,
  Modal,
  Alert,
} from 'react-native';
import { Entypo, AntDesign, EvilIcons } from '@expo/vector-icons';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons';

import {
  GREY_COLOR,
  BLUE_COLOR,
  LIGHT_GREY_COLOR,
} from '../../constants/constants';

import { likePost } from '../../services/like.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PostImageScreen = ({ navigation, route }) => {
  const [shortcutDescribed, setShortcutDescribed] = useState(true);
  const postDetail = route.params.postDetail;
  const index = route.params.index;

  const expandDescribed = () => {
    setShortcutDescribed(!shortcutDescribed);
  };

  const [options, setOptions] = useState(false);
  const [isMe, setIsMe] = useState(true);
  const [liked, setLiked] = useState(postDetail.is_liked);
  const [numberOfLike, setNumberOfLike] = useState(parseInt(postDetail.like));

  const time = Date.now() / 1000 - parseInt(postDetail.created);

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

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback>
        <View style={styles.postWrapper}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              resizeMode="contain"
              source={{ uri: postDetail.image[index].url }}
            ></Image>
          </View>
          <View style={styles.optionIconWrapper}>
            <TouchableOpacity
              style={styles.cycleWrapper}
              onPress={() => {
                setOptions(true);
              }}
            >
              <Entypo name="dots-three-vertical" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.postContentWrapper}>
            <View>
              <View>
                <Text style={styles.name}>
                  {postDetail.author.username || postDetail.author.name}
                </Text>
              </View>
              <TouchableOpacity onPress={expandDescribed}>
                {postDetail.described ? (
                  postDetail.described.length > 150 ? (
                    shortcutDescribed ? (
                      <Text style={styles.content}>
                        {postDetail.described.slice(0, 150)}
                        <Text style={styles.describedSupport}>
                          {' '}
                          ... Xem th??m
                        </Text>
                      </Text>
                    ) : (
                      <Text style={styles.content}>
                        {postDetail.described}
                        <Text style={styles.describedSupport}> ???n B???t</Text>
                      </Text>
                    )
                  ) : (
                    <Text style={styles.content}>{postDetail.described}</Text>
                  )
                ) : null}
              </TouchableOpacity>
              {time < 1 * 60 ? <Text style={styles.time}>V???a xong</Text> : null}
              {time >= 1 * 60 && time < 60 * 60 ? (
                <Text style={styles.time}>{Math.floor(time / 60)} ph??t</Text>
              ) : null}
              {time >= 1 * 60 * 60 && time < 24 * 60 * 60 ? (
                <Text style={styles.time}>{Math.floor(time / 3600)} gi???</Text>
              ) : null}
              {time >= 24 * 60 * 60 && time < 30 * 24 * 60 * 60 ? (
                <Text style={styles.time}>{Math.floor(time / 86400)} ng??y</Text>
              ) : null}
              {time >= 30 * 24 * 60 * 60 && time < 12 * 30 * 24 * 60 * 60 ? (
                <Text style={styles.time}>
                  {Math.floor(time / 2592000)} th??ng
                </Text>
              ) : null}
              {time >= 12 * 30 * 24 * 60 * 60 ? (
                <Text style={styles.time}>
                  {Math.floor(time / 31104000)} n??m
                </Text>
              ) : null}
            </View>

            <View style={styles.reactionValueWrapper}>
              <TouchableOpacity>
                <View style={styles.reactionNumberWrapper}>
                  <AntDesign name="like1" size={16} color={BLUE_COLOR} />
                  <Text
                    style={{
                      color: '#fff',
                      marginLeft: 5,
                      fontSize: 13,
                      fontWeight: '700',
                    }}
                  >
                    {liked === '1'
                      ? numberOfLike > 1
                        ? `B???n v?? ${numberOfLike - 1} ng?????i kh??c`
                        : 'B???n'
                      : numberOfLike}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PostCommentScreen', {
                    postId: postDetail.id,
                  })
                }
              >
                <Text
                  style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}
                >
                  {postDetail.comment} b??nh lu???n
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.btnReactionWrapper}>
              <TouchableOpacity
                onPress={() => {
                  onPressLike(postDetail.id);
                }}
              >
                <View style={styles.groupItemFooter}>
                  {liked === '0' ? (
                    <EvilIcons name="like" size={30} color="#fff" />
                  ) : (
                    <EvilIcons name="like" size={30} color={BLUE_COLOR} />
                  )}
                  {liked === '0' ? (
                    <Text style={styles.textIconFooter}>Th??ch</Text>
                  ) : (
                    <Text
                      style={{ ...styles.textIconFooter, color: BLUE_COLOR }}
                    >
                      Th??ch
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('PostCommentScreen', {
                    postId: postDetail.id,
                  });
                }}
              >
                <View style={styles.groupItemFooter}>
                  <EvilIcons name="comment" size={30} color="#fff" />
                  <Text style={styles.textIconFooter}>B??nh lu???n</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
                      T???t th??ng b??o v??? b??i vi???t n??y
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.postOptionItemWrapper}
                onPress={() => {
                  setOptions(!options);
                  Alert.alert(
                    'X??a b??i vi???t?',
                    'B???n c?? th??? ch???nh s???a b??i vi???t n???u c???n thay ?????i.',
                    [
                      { text: 'X??A', onPress: () => console.log('OK Pressed') },
                      {
                        text: 'CH???NH S???A',
                        onPress: () => navigation.navigate('EditPostScreen'),
                      },
                      { text: 'H???Y', onPress: () => console.log('OK Pressed') },
                    ]
                  );
                }}
              >
                <View style={styles.postOptionItem}>
                  <View style={styles.optionIcon}>
                    <FontAwesome name="trash-o" size={24} color={GREY_COLOR} />
                  </View>
                  <View>
                    <Text style={styles.postOptionTitle}>X??a</Text>
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
                    <Text style={styles.postOptionTitle}>S???a b??i vi???t</Text>
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
                    <Text style={styles.postOptionTitle}>B??o c??o b??i vi???t</Text>
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
                      B???t th??ng b??o v??? b??i vi???t n??y
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  postWrapper: {
    position: 'relative',
    backgroundColor: 'rgba(0,0,0,1)',
    height: '100%',
  },
  optionIconWrapper: {
    position: 'absolute',
    right: 0,
    top: 7,
    zIndex: 999999,
  },
  cycleWrapper: {
    padding: 10,
  },

  optionListWrapper: {
    position: 'absolute',
    left: 0,
    height: '100%',
    zIndex: 999999,
    backgroundColor: 'rgba(0,0,0,0)',
    width: '100%',
  },
  allOptionWrapper: {
    backgroundColor: '#fff',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    zIndex: 2,
  },
  optionBackDrop: {
    // backgroundColor: "red",
    zIndex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  optionItemWrapper: {
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 10,
    fontSize: 16,
  },
  postContentWrapper: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    left: 0,
    width: '100%',
    // zIndex: 99,
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  name: {
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    color: '#fff',
  },
  time: {
    fontSize: 12,
    marginTop: 5,
    color: '#fff',
    textTransform: 'uppercase',
    opacity: 0.5,
  },
  btnReactionWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopColor: '#afafaf',
    borderTopWidth: 0.6,
  },
  groupItemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    width: screenWidth / 2,
    justifyContent: 'center',
  },
  textIconFooter: {
    marginLeft: 4,
    fontSize: 13,
    color: '#fff',
  },
  imageWrapper: {},
  image: {
    backgroundColor: 'rgba(0,0,0,0)',
    height: '100%',
    width: '100%',
  },
  reactionValueWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  reactionNumberWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  describedSupport: {
    color: GREY_COLOR,
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

export default PostImageScreen;
