import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useState } from 'react';
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { GREY_COLOR, BLACK_COLOR, BLUE_COLOR } from '../constants/constants';
import Avatar from "./Avatar";


const Post = ({ post }) => {
  const [ shortcutDescribed, setShortcutDescribed ] = useState(true);
  const [ liked, setLiked ] = useState(post.is_liked);
  const [ numberOfLike, setNumberOfLike ] = useState(parseInt(post.like));
  const [ postOption, setPostOption ] = useState(false);

  const time = Date.now()/1000 - parseInt(post.created);

  const expandDescribed = () => {
    if (shortcutDescribed) {
      setShortcutDescribed(false);
    } else {
      setShortcutDescribed(true);
    }
  }

  const onPressLike = () => {
    if (liked === '0') {
      setLiked('1');
      setNumberOfLike(numberOfLike+1);
    } else {
      setLiked('0');
      setNumberOfLike(numberOfLike-1);
    }
  }

  const onPressPostOption = () => {
    if (!postOption) {
      setPostOption(true);
    } else {
      setPostOption(false);
    }
  }

  return (
  <View style={styles.post}>
  {/* Header */}
    <View style={styles.header}>
      <Avatar source={{uri: post.author.avatar}}/>
      <View style={styles.title}>
        <Text style={styles.name}>{post.author.userName}</Text>
        {
          (time < 1*60*60) ? <Text style={styles.subTitle}>Vừa xong</Text>: null
        }
        {
          (time >= 1*60*60 && time < 24*60*60) ? <Text style={styles.subTitle}>{Math.floor(time/3600)} giờ</Text>: null
        }
        {
          (time >= 24*60*60 && time < 30*24*60*60) ? <Text style={styles.subTitle}>{Math.floor(time/86400)} ngày</Text>: null
        }
        {
          (time >= 30*24*60*60 && time < 12*30*24*60*60) ? <Text style={styles.subTitle}>{Math.floor(time/2592000)} tháng</Text>: null
        }
        {
          (time >= 12*30*24*60*60) ? <Text style={styles.subTitle}>{Math.floor(time/31104000)} năm</Text>: null
        }
      </View>
      <TouchableOpacity style={styles.icon} onPress={onPressPostOption}>
        <Entypo
          name="dots-three-horizontal"
          size={18}
          color="gray"
        />
      </TouchableOpacity>
  </View>

  {
    (post.described)
    ? ( (post.described.length > 150)
          ? (
            (shortcutDescribed)
              ? <Text style={styles.description}>{post.described.slice(0, 150)}
                <Text onPress={expandDescribed} style={styles.describedSupport}> ...Xem thêm</Text>
                </Text>
              : <Text style={styles.description}>{post.described}
                <Text onPress={expandDescribed} style={styles.describedSupport}> Ẩn Bớt</Text>
                </Text>
          )
          : <Text style={styles.description}>{post.described}</Text>
      )
    : (null)
  }
    <View style={styles.imageContainer}>
    {post.image && (
      post.image.map((image, key) => (
        <Image
        source={{ uri: image.url}}
        style={styles.image}
        resizeMode="cover"
        key={key}
      />
      ))
    )}
    </View>

  {/* Footer */}
  <View style={styles.footer}>
    <View style={styles.statsRow}>
      <Image source={require('../assets/like.png')} style={styles.likeIcon} />
      {
        (liked === '1')
        ? <Text style={styles.likedBy}>Bạn và {numberOfLike - 1} người khác</Text>
        : <Text style={styles.likedBy}>{numberOfLike}</Text>
      }
      <Text style={styles.shares}>{post.comment} bình luận</Text>
    </View>
    <View style={styles.buttonsRow}>
      <TouchableOpacity style={styles.iconButton} onPress={onPressLike} >
        {
          (liked === "0") ? <AntDesign name="like2" size={18} color={GREY_COLOR} />
          : <AntDesign name="like1" size={18} color={BLUE_COLOR}/>
        }
        {
          (liked === "0") ? <Text style={styles.iconButtonText}>Thích</Text>
          : <Text style={styles.iconButtonLikedText}>Thích</Text>
        }
      </TouchableOpacity>
      <View style={styles.iconButton}>
        <FontAwesome5 name="comment-alt" size={16} color={GREY_COLOR} />
        <Text style={styles.iconButtonText}>Bình luận</Text>
      </View>
      <View style={styles.iconButton}>
        <MaterialCommunityIcons
          name="share-outline"
          size={18}
          color={GREY_COLOR}
        />
        <Text style={styles.iconButtonText}>Chia sẻ</Text>
      </View>
    </View>
  </View>
  </View>
  );
};

const styles = StyleSheet.create({
  post: {
    width: "100%",
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  title: {
    marginLeft: 10,
  },
  name: {
    fontWeight: "700",
  },
  subTitle: {
    color: GREY_COLOR,
  },
  icon: {
    marginLeft: "auto",
  },
  description: {
    lineHeight: 20,
    letterSpacing: 0.3,
    paddingHorizontal: 10,
    color: BLACK_COLOR,
  },
  describedSupport: {
    color: GREY_COLOR,
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 10,
  },
  footer: {
    paddingHorizontal: 10,
  },
  statsRow: {
    flexDirection: "row",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 10,
    borderColor: "lightgray",
  },
  likeIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  likedBy: {
    color: GREY_COLOR,
  },
  shares: {
    color: GREY_COLOR,
    marginLeft: "auto",
  },
  buttonsRow: {
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  iconButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButtonText: {
    color: GREY_COLOR,
    marginLeft: 5,
    fontWeight: "500",
  },
  iconButtonLikedText: {
    color: BLUE_COLOR,
    marginLeft: 5,
    fontWeight: "500",
  },
  imageContainer: {
    marginTop: 5,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default Post;