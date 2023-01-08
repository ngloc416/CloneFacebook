import React, {useState} from 'react'
import { Text, StyleSheet, View, Image, TouchableOpacity, TouchableWithoutFeedback, Dimensions, Animated } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'

import { GREY_COLOR } from '../../constants/constants'

const PostImageScreen = ({ navigation }) => {
  const [ shortcutDescribed, setShortcutDescribed ] = useState(true);

  const expandDescribed = () => {
    if (shortcutDescribed) {
      setShortcutDescribed(false);
    } else {
      setShortcutDescribed(true);
    }
  }

  const postDetail = {
    author: {
      id: "63b4d6871870e51c9354c506",
      userName: 'Abc',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
    },
    described: 'There are some common things that people do during this occasion but I think the most popular activity is that people decorate their houses with different '+
      'decorations such as Christmas Tree, Fairy Lights, Snowman and Wreaths. In addition, many well-known places in big cities are immersed in exciting and colorful tinsels '+
      'and cheerful melodies of Christmas songs. Another popular activity is that Vietnamese people are keen on gathering for sharing big meals with their families and exchanging gifts. ',
    image: [{
      url: 'https://images.baodantoc.vn/uploads/2021/Th%C3%A1ng_12/Ng%C3%A0y_23/%C3%81nh/Giang%20sinh/m%E1%BB%B9.jpg',
      id: "63b4d6871870e51c9354c506",
    },
    {
      url: 'https://images.baodantoc.vn/uploads/2021/Th%C3%A1ng_12/Ng%C3%A0y_23/%C3%81nh/Giang%20sinh/m%E1%BB%B9.jpg',
      id: "63b4d6871870e51c9354c506",
    }],
    video: null,
    created: '1667879990',
    like: '15',
    comment: '33',
    is_liked: '1',
    is_blocked: '0',
    can_comment: '1',
    can_edit: '0',
    state: 'hạnh phúc',
  }

  const time = Date.now()/1000 - parseInt(postDetail.created);

  return (
    <TouchableWithoutFeedback>
                <View style={styles.postWrapper}>
                    <View style={styles.imageWrapper}>
                        <Image style={styles.image} resizeMode="contain" source={{ uri: postDetail.image[0].url }}>
                        </Image>
                    </View>
                    <View style={styles.optionIconWrapper}>
                        <TouchableOpacity style={styles.cycleWrapper}>
                            <FontAwesome5Icon name="ellipsis-v" color="#fff" size={20}></FontAwesome5Icon>
                        </TouchableOpacity>
                    </View>
                    <Animated.View style={styles.optionListWrapper}>
                        <View style={styles.optionBackDrop}>
                            <TouchableOpacity style={{ width: "100%", height: "100%" }}>
                                <View></View>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.allOptionWrapper}>
                            <TouchableOpacity>
                                <View style={styles.optionItemWrapper}>
                                    <FontAwesome5Icon name="download" size={20}></FontAwesome5Icon>
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
                        </View> */}
                    </Animated.View>
                    <View style={styles.postContentWrapper}>
                        <View>
                            <TouchableOpacity>
                                <Text style={styles.name}>{postDetail.author.userName}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={expandDescribed}>
                            {
                              (postDetail.described)
                              ? ( (postDetail.described.length > 150)
                                    ? (
                                      (shortcutDescribed)
                                        ? <Text style={styles.content}>{postDetail.described.slice(0, 150)}
                                          <Text style={styles.describedSupport}> ...Xem thêm</Text>
                                          </Text>
                                        : <Text style={styles.content}>{post.described}
                                          <Text style={styles.describedSupport}> Ẩn Bớt</Text>
                                          </Text>
                                    )
                                    : <Text style={styles.description}>{post.described}</Text>
                                )
                              : (null)
                            }
                            </TouchableOpacity>
                            {
                              (time < 1*60*60) ? <Text style={styles.time}>Vừa xong</Text>: null
                            }
                            {
                              (time >= 1*60*60 && time < 24*60*60) ? <Text style={styles.time}>{Math.floor(time/3600)} giờ</Text>: null
                            }
                            {
                              (time >= 24*60*60 && time < 30*24*60*60) ? <Text style={styles.time}>{Math.floor(time/86400)} ngày</Text>: null
                            }
                            {
                              (time >= 30*24*60*60 && time < 12*30*24*60*60) ? <Text style={styles.time}>{Math.floor(time/2592000)} tháng</Text>: null
                            }
                            {
                              (time >= 12*30*24*60*60) ? <Text style={styles.time}>{Math.floor(time/31104000)} năm</Text>: null
                            }
                        </View>
                        <View style={styles.reactionValueWrapper}>
                            <TouchableOpacity >
                                <View style={styles.reactionNumberWrapper}>
                                    <Image source={require('../../assets/like.png')} style={{ width: 14, height: 14}}/>
                                    <Text style={{ color: '#fff', marginLeft: 5 }}>{postDetail.like}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Text style={{ color: '#fff' }}>{postDetail.comment} bình luận</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.btnReactionWrapper}>
                            <TouchableOpacity style={styles.btnWrapper}>
                                <View style={styles.reactionBtn}>
                                    <FontAwesome5Icon name="thumbs-up" color='#fff' size={20}>
                                    </FontAwesome5Icon>
                                    <Text style={styles.reactionBtnText}>Thích</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnWrapper}>
                                <View style={styles.reactionBtn}>
                                    <FontAwesome5Icon name="comment-alt" color="#fff" size={20}>
                                    </FontAwesome5Icon>
                                    <Text style={styles.reactionBtnText}>Bình luận</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnWrapper} >
                                <View style={styles.reactionBtn}>
                                    <FontAwesome5Icon name="share" color="#fff" size={20}>
                                    </FontAwesome5Icon>
                                    <Text style={styles.reactionBtnText}>Chia sẻ</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  postWrapper: {
      position: 'relative',
      backgroundColor: 'rgba(0,0,0,1)',
      height: "100%"
  },
  optionIconWrapper: {
      position: 'absolute',
      right: 30,
      top: 50,
      zIndex: 999999,
  },
  cycleWrapper: {
      padding: 10
  },

  optionListWrapper: {
      position: 'absolute',
      left: 0,
      height: "100%",
      zIndex: 999999,
      backgroundColor: "rgba(0,0,0,0)",
      width: "100%"
  },
  allOptionWrapper: {
      backgroundColor: "#fff",
      padding: 20,
      position: 'absolute',
      bottom: 0,
      width: "100%",
      zIndex: 2
  },
  optionBackDrop: {
      // backgroundColor: "red",
      zIndex: 1,
      position: 'absolute',
      top: 0,
      left: 0,
      height: "100%",
      width: "100%"
  },
  optionItemWrapper: {
      paddingVertical: 15,
      flexDirection: 'row',
      alignItems: 'center'
  },
  optionText: {
      marginLeft: 10,
      fontSize: 16
  },
  postContentWrapper: {
      backgroundColor: 'rgba(0,0,0,0.5)',
      left: 0,
      width: "100%",
      // zIndex: 99,
      position: 'absolute',
      bottom: 0,
      paddingHorizontal: 15,
      paddingVertical: 20
  },
  name: {
      fontWeight: 'bold',
      color: '#fff'
  },
  content: {
      color: '#fff'
  },
  time: {
      marginTop: 5,
      color: '#fff',
      textTransform: 'uppercase',
      opacity: 0.5
  },
  btnReactionWrapper: {
      flexDirection: 'row',
      justifyContent: 'center',
      paddingTop: 10,
      borderTopColor: '#ddd',
      borderTopWidth: 1
  },
  reactionBtnText: {
      color: '#fff',
      marginLeft: 5
  },
  btnWrapper: {
      flex: 1
  },
  reactionBtn: {
      width: "100%",
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
  },
  imageWrapper: {

  },
  image: {
      backgroundColor: "rgba(0,0,0,0)",
      height: "100%",
      width: "100%",
  },
  reactionValueWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 20,
      paddingHorizontal: 15
  },
  reactionNumberWrapper: {
      flexDirection: 'row',
      alignItems: 'center'
  },
  describedSupport: {
    color: GREY_COLOR,
  },
})

export default PostImageScreen;

