import React from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import {
  AntDesign,
  Entypo,
  FontAwesome5,
} from "@expo/vector-icons";
import { GREY_COLOR, BLACK_COLOR, BLUE_COLOR } from '../../constants/constants';
import Avatar from "../../components/Avatar";

export default function PostDetailScreen({ navigation }) {
  const post =
    {
      author: {
        id: "63b4d6871870e51c9354c506",
        userName: 'Abc',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
      },
      described: 'Merry Christmas',
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

  const time = Date.now() - post.created;

  return (
      <ScrollView style={styles.post}>
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
          <TouchableOpacity style={styles.icon}>
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
                    <Text style={styles.describedSupport}> ...Xem thêm</Text>
                    </Text>
                  : <Text style={styles.description}>{post.described}
                    <Text style={styles.describedSupport}> Ẩn Bớt</Text>
                    </Text>
              )
              : <Text style={styles.description}>{post.described}</Text>
          )
        : (null)
      }

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.statsRow}>
          <Image source={require('../../assets/like.png')} style={styles.likeIcon} />
          {
            (post.is_liked === '1')
            ? <Text style={styles.likedBy}>Bạn và {parseInt(post.like) - 1} người khác</Text>
            : <Text style={styles.likedBy}>{post.like}</Text>
          }
          <Text style={styles.shares}>{post.comment} bình luận</Text>
        </View>

        <View style={styles.buttonsRow}>
          <View style={styles.iconButton} >
            <AntDesign name="like2" size={18} color={GREY_COLOR} />
            <Text style={styles.iconButtonText}>Thích</Text>
          </View>
          <View style={styles.iconButton}>
            <FontAwesome5 name="comment-alt" size={16} color={GREY_COLOR} />
            <Text style={styles.iconButtonText}>Bình luận</Text>
          </View>
        </View>
      </View>
      {post.image && (
          post.image.map((image, key) => (
            <View>
              <View style={styles.seperatorLine}></View>
              <Image
              source={{ uri: image.url}}
              style={styles.image}
              resizeMode="cover"
              key={key}
              />

          <View style={styles.buttonsRow}>
            <View style={styles.iconButton} >
              <AntDesign name="like2" size={18} color={GREY_COLOR} />
              <Text style={styles.iconButtonText}>Thích</Text>
            </View>
            <View style={styles.iconButton}>
              <FontAwesome5 name="comment-alt" size={16} color={GREY_COLOR} />
              <Text style={styles.iconButtonText}>Bình luận</Text>
            </View>
          </View>
          </View>
          ))
        )}
    </ScrollView>
  );
}

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
  seperatorLine: {
    width: '100%',
    backgroundColor: 'lightgrey',
    height: 10,
  }
});