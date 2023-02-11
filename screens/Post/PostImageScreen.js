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
} from 'react-native';
import { Entypo, AntDesign, EvilIcons } from '@expo/vector-icons';

import { GREY_COLOR, BLUE_COLOR } from '../../constants/constants';

const PostImageScreen = ({ navigation, route }) => {
  const [shortcutDescribed, setShortcutDescribed] = useState(true);
  const postDetail = route.params.postDetail;
  const index = route.params.index;

  const expandDescribed = () => {
    setShortcutDescribed(!shortcutDescribed);
  };

  const time = Date.now() / 1000 - parseInt(postDetail.created);

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
            <TouchableOpacity style={styles.cycleWrapper}>
              <Entypo name="dots-three-vertical" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          {/* <Animated.View style={styles.optionListWrapper}>
            <View style={styles.optionBackDrop}>
              <TouchableOpacity style={{ width: '100%', height: '100%' }}>
                <View></View>
              </TouchableOpacity>
            </View>
            <View style={styles.allOptionWrapper}>
              <TouchableOpacity>
                <View style={styles.optionItemWrapper}>
                  <FontAwesome5Icon
                    name="download"
                    size={20}
                  ></FontAwesome5Icon>
                  <Text style={styles.optionText}>Save to your phone</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.optionItemWrapper}>
                  <FontAwesome5Icon name="share" size={20}></FontAwesome5Icon>
                  <Text style={styles.optionText}>Share it outside</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={styles.optionItemWrapper}>
                  <FontAwesome5Icon name="flag" size={20}></FontAwesome5Icon>
                  <Text style={styles.optionText}>Find support or report</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View> */}
          <View style={styles.postContentWrapper}>
            <View>
              <View>
                <Text style={styles.name}>{postDetail.author.username}</Text>
              </View>
              <TouchableOpacity onPress={expandDescribed}>
                {postDetail.described ? (
                  postDetail.described.length > 150 ? (
                    shortcutDescribed ? (
                      <Text style={styles.content}>
                        {postDetail.described.slice(0, 150)}
                        <Text style={styles.describedSupport}>
                          {' '}
                          ... Xem thêm
                        </Text>
                      </Text>
                    ) : (
                      <Text style={styles.content}>
                        {postDetail.described}
                        <Text style={styles.describedSupport}> Ẩn Bớt</Text>
                      </Text>
                    )
                  ) : (
                    <Text style={styles.description}>
                      {postDetail.described}
                    </Text>
                  )
                ) : null}
              </TouchableOpacity>
              {time < 1 * 60 * 60 ? (
                <Text style={styles.time}>Vừa xong</Text>
              ) : null}
              {time >= 1 * 60 * 60 && time < 24 * 60 * 60 ? (
                <Text style={styles.time}>{Math.floor(time / 3600)} giờ</Text>
              ) : null}
              {time >= 24 * 60 * 60 && time < 30 * 24 * 60 * 60 ? (
                <Text style={styles.time}>{Math.floor(time / 86400)} ngày</Text>
              ) : null}
              {time >= 30 * 24 * 60 * 60 && time < 12 * 30 * 24 * 60 * 60 ? (
                <Text style={styles.time}>
                  {Math.floor(time / 2592000)} tháng
                </Text>
              ) : null}
              {time >= 12 * 30 * 24 * 60 * 60 ? (
                <Text style={styles.time}>
                  {Math.floor(time / 31104000)} năm
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
                    {postDetail.like}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text
                  style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}
                >
                  {postDetail.comment} bình luận
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.btnReactionWrapper}>
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.groupItemFooter}>
                  <EvilIcons name="like" size={30} color="#fff" />

                  <Text style={styles.textIconFooter}>Thích</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.groupItemFooter}>
                  <EvilIcons name="comment" size={30} color="#fff" />
                  <Text style={styles.textIconFooter}>Bình luận</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
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
});

export default PostImageScreen;
