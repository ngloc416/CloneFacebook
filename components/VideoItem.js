import React, {useState} from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TouchableHighlight,
  } from 'react-native';
  import Icon from 'react-native-vector-icons/FontAwesome5';
  import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
  import { Video } from 'expo-av'
  import { EvilIcons, AntDesign } from '@expo/vector-icons';
  import {
    LIGHT_GREY_COLOR,
    GREY_COLOR,
    BLUE_COLOR,
  } from '../constants/constants';

function VideoItem({ item, navigation }) {
  const [shortcutDescribed, setShortcutDescribed] = useState(true);
  const [liked, setLiked] = useState(item.is_liked);
  const [numberOfLike, setNumberOfLike] = useState(parseInt(item.like));
  const [postOption, setPostOption] = useState(false);

  const time = Date.now() / 1000 - parseInt(item.created);
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});

  const expandDescribed = () => {
    setShortcutDescribed(!shortcutDescribed);
  };

  const onPressLike = () => {
    if (liked === '0') {
      setLiked('1');
      setNumberOfLike(numberOfLike + 1);
    } else {
      setLiked('0');
      setNumberOfLike(numberOfLike - 1);
    }
  };

  const onPressPostOption = () => {
    setPostOption(!postOption);
  };

  return (
    <View style={styles.item}>
      <TouchableHighlight
        underlayColor={LIGHT_GREY_COLOR}
        onPress={() => {}}
      >
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
                source={{ uri: item.author.avatar }}
              ></Image>
            </TouchableOpacity>
            <View style={styles.infoWrapper}>
              <View style={styles.namesWrapper}>
                <TouchableHighlight
                  underlayColor={LIGHT_GREY_COLOR}
                  onPress={() => {}}
                >
                  <Text style={{ fontSize: 16, fontWeight: '700' }}>
                    {item.author.username}
                  </Text>
                </TouchableHighlight>
              </View>

              <View style={styles.extraInfoWrapper}>
                <Text style={{ color: '#6b6d6e', fontSize: 13 }}>
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
              navigation.navigate('SearchScreen');
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
      </TouchableHighlight>

      <TouchableHighlight
        underlayColor={LIGHT_GREY_COLOR}
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
          source={{uri: item.video.url}}
          useNativeControls
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={setStatus}
        />
      </View>

      <View style={styles.footer}>
        <TouchableHighlight underlayColor={LIGHT_GREY_COLOR} onPress={() => {}}>
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
                  ? `Bạn và ${numberOfLike - 1} người khác`
                  : numberOfLike}
              </Text>
            </View>
            <View style={styles.rightComponent}>
              <Text style={{ color: '#6b6d6e', fontSize: 13 }}>
                {item.comment} bình luận
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
            onPress={() => {}}
          >
            <View style={styles.groupItemFooter}>
              <EvilIcons name="comment" size={30} color="#6b6d6e" />
              <Text style={styles.textIconFooter}>Bình luận</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  )
}

const screenWidth = Math.round(Dimensions.get('window').width);
export default VideoItem

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOpacity: 0.3,
      shadowOffset: { height: 0, width: 0 },
      marginTop: 10,
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
      color: '#6b6d6e',
    },
    textIconLikedFooter: {
      marginLeft: 4,
      fontSize: 13,
      color: BLUE_COLOR,
    },
    video: {
      height: 300,
      width: '100%'
    }
  });
  