import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
  TextInput,
  Modal,
} from 'react-native';
import {
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  STATUSBAR_HEIGHT,
  LIGHT_GREY_COLOR,
  GREY_COLOR,
  BLUE_COLOR,
  LIGHT_BLUE_COLOR,
  WHITE_COLOR,
} from '../../constants/constants';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import FriendsShowing from './FriendsShowing';
import Item from '../Home/Item';

export default function ProfileScreen({ navigation }) {
  const user = {
    id: '1',
    username: 'Nguyễn Đình Lộc',
    created: '',
    description: 'ABCDEF',
    avatar:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
    coverImage:
      'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191104/Facebook/Post/img3_oc50v7.jpg',
    link: 'https://abcddfsdsfdsfdsfdsfsdfsdfdsfdsfsdffsfd',
    address: 'Hải Dương',
    city: 'Hải Dương',
    country: 'Việt Nam',
    listing: '',
    isFriend: '',
    online: '',
  };
  const friends = [
    {
      friend: {
        id: '2',
        username: 'Nguyễn Đình Lộc',
        created: '',
        description: 'ABCDEF',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
        coverImage:
          'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191104/Facebook/Post/img3_oc50v7.jpg',
        link: 'https://abcddfsdsfdsfdsfdsfsdfsdfdsfdsfsdffsfd',
        address: 'Hải Dương',
        city: 'Hải Dương',
        country: 'Việt Nam',
        listing: '',
        isFriend: '',
        online: '',
      },
      createdAt: '1672797164',
    },
    {
      friend: {
        id: '3',
        username: 'Nguyễn Văn Khoa',
        created: '',
        description: 'ABCDEF',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
        coverImage:
          'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191104/Facebook/Post/img3_oc50v7.jpg',
        link: 'https://abcddfsdsfdsfdsfdsfsdfsdfdsfdsfsdffsfd',
        address: 'Hải Dương',
        city: 'Hải Dương',
        country: 'Việt Nam',
        listing: '',
        isFriend: '',
        online: '',
      },
      createdAt: '1672797165',
    },
    {
      friend: {
        id: '4',
        username: 'Vũ Hoàng Long',
        created: '',
        description: 'ABCDEF',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
        coverImage:
          'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191104/Facebook/Post/img3_oc50v7.jpg',
        link: 'https://abcddfsdsfdsfdsfdsfsdfsdfdsfdsfsdffsfd',
        address: 'Hải Dương',
        city: 'Hải Dương',
        country: 'Việt Nam',
        listing: '',
        isFriend: '',
        online: '',
      },
      createdAt: '1672797166',
    },
    {
      friend: {
        id: '5',
        username: 'Nguyễn Đức Thắng',
        created: '',
        description: 'ABCDEF',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
        coverImage:
          'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191104/Facebook/Post/img3_oc50v7.jpg',
        link: 'https://abcddfsdsfdsfdsfdsfsdfsdfdsfdsfsdffsfd',
        address: 'Hải Dương',
        city: 'Hải Dương',
        country: 'Việt Nam',
        listing: '',
        isFriend: '',
        online: '',
      },
      createdAt: '1672797167',
    },
    {
      friend: {
        id: '6',
        username: 'Võ Tiến Bắc',
        created: '',
        description: 'ABCDEF',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
        coverImage:
          'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191104/Facebook/Post/img3_oc50v7.jpg',
        link: 'https://abcddfsdsfdsfdsfdsfsdfsdfdsfdsfsdffsfd',
        address: 'Hải Dương',
        city: 'Hải Dương',
        country: 'Việt Nam',
        listing: '',
        isFriend: '',
        online: '',
      },
      createdAt: '1672797168',
    },
    {
      friend: {
        id: '7',
        username: 'Hoàng Lan Hương',
        created: '',
        description: 'ABCDEF',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
        coverImage:
          'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191104/Facebook/Post/img3_oc50v7.jpg',
        link: 'https://abcddfsdsfdsfdsfdsfsdfsdfdsfdsfsdffsfd',
        address: 'Hải Dương',
        city: 'Hải Dương',
        country: 'Việt Nam',
        listing: '',
        isFriend: '',
        online: '',
      },
      createdAt: '1672797169',
    },
  ];
  const posts = [
    {
      author: {
        id: '63b4d6871870e51c9354c506',
        userName: 'Nguyễn Đình Lộc',
        avatar:
          'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191501/Facebook/Login/Avatar_px9tag.jpg',
      },
      described:
        'Giáng sinh vừa qua, Tết đã đến chân rồi, lên đồ đi chụp ảnh Tết đi các bồ ơi ^^ Vẫn quán mình quen thì mình ghé chơi thôi, qua một tuần lại thay áo mới, Seeu Coffee giờ đã ngập tràn không khí tết đến xuân về. Concept lần này theo tone đỏ cổ truyền, hoạ tiết chính xuyên suốt là quạt xếp nan, đủ hiện đại, đủ Việt Nam nha. Khá khuyến khích các bạn chụp ảnh khu tầng 2 cho rộng rãi, quán để bàn trà tết nom cũng ưng mắt và giống studio.',
      image: [
        {
          url: 'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191101/Facebook/Post/img2_vjqtfl.jpg',
          id: '63b4d6871870e51c9354c506',
        },
      ],
      video: null,
      created: '1672797164',
      like: '123',
      comment: '36',
      is_liked: '0',
      is_blocked: '0',
      can_comment: '1',
      can_edit: '0',
      state: 'hạnh phúc',
    },
    {
      author: {
        id: '63b4d6871870e51c9354c506',
        userName: 'Nguyễn Đình Lộc',
        avatar:
          'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191501/Facebook/Login/Avatar_px9tag.jpg',
      },
      described:
        'Trong các bộ phim, vai phản diện hầu như đều có yêu cầu cao hơn về mặt diễn xuất và không phải ai cũng có thể diễn một cách mượt mà được. Đều sở hữu nét đẹp được đo ni đóng giày cho vai chính diện, nhiều diễn viên Hàn Quốc gây bất ngờ bởi độ hợp vai khi hoá thân vào phe “ác”.',
      image: [
        {
          url: 'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191076/Facebook/Post/img1_mndcns.jpg',
          id: '63b4d6871870e51c9354c506',
        },
      ],
      video: null,
      created: '1672797164',
      like: '123',
      comment: '36',
      is_liked: '0',
      is_blocked: '0',
      can_comment: '1',
      can_edit: '0',
      state: 'hạnh phúc',
    },
    {
      author: {
        id: '63b4d6871870e51c9354c506',
        userName: 'Nguyễn Đình Lộc',
        avatar:
          'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191501/Facebook/Login/Avatar_px9tag.jpg',
      },
      described: `Quán đồ Hàn xinh nhất quận Cầu Giấy Đủ món Korea ngon rẻ chỉ từ 25k cho team Nghĩa Tân, Tô Hiệu.
      Nguyên phố Tô Hiệu, Nghĩa Tân thì độc mỗi hàng này là bán đồ Hàn mà giá hợp túi tiền học sinh sinh viên lắm nè`,
      image: [
        {
          url: 'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191104/Facebook/Post/img3_oc50v7.jpg',
          id: '63b4d6871870e51c9354c506',
        },
      ],
      video: null,
      created: '1672797164',
      like: '123',
      comment: '36',
      is_liked: '0',
      is_blocked: '0',
      can_comment: '1',
      can_edit: '0',
      state: 'hạnh phúc',
    },
    {
      author: {
        id: '63b4d6871870e51c9354c506',
        userName: 'Hoàng',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
      },
      described:
        'Mùa xuân là mùa cây cối đâm chồi nảy lộc. Những mầm non xanh tươi mơn mởn tràn đầy nhựa sống.' +
        ' Thời tiết se se lạnh và có mưa phùn. Trên bầu trời, những đám mây trắng đang trôi lờ lững. Đến tầm trưa, có những tia nắng và ông mặt trời xuất hiện.' +
        ' Những chú chim cất tiếng hót líu lo. Đây là mùa mà các loài hoa đua nhau khoe sắc thắm. Mùa xuân, em háo hức nhất là dịp Tết để được nhận được lì xì. ' +
        'Em rất yêu quý mùa xuân và em mong chờ mùa xuân nhanh đến.',
      image: [
        {
          url: 'https://hinhanhdephd.com/wp-content/uploads/2017/10/hinh-anh-mua-xuan-dep-canh-dep-thien-nhien-trong-mua-xuan-5.jpg',
          id: '63b4d6871870e51c9354c506',
        },
        {
          url: 'https://hinhanhdephd.com/wp-content/uploads/2017/10/hinh-anh-mua-xuan-dep-canh-dep-thien-nhien-trong-mua-xuan-5.jpg',
          id: '63b4d6871870e51c9354c506',
        },
      ],
      video: null,
      created: '1672797164',
      like: '5',
      comment: '3',
      is_liked: '0',
      is_blocked: '0',
      can_comment: '1',
      can_edit: '0',
      state: 'hạnh phúc',
    },
    {
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
    },
    {
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
        {
          url: 'https://hinhanhdephd.com/wp-content/uploads/2017/10/hinh-anh-mua-xuan-dep-canh-dep-thien-nhien-trong-mua-xuan-5.jpg',
          id: '63b4d6871870e51c9354c506',
        },
        {
          url: 'https://images.baodantoc.vn/uploads/2021/Th%C3%A1ng_12/Ng%C3%A0y_23/%C3%81nh/Giang%20sinh/m%E1%BB%B9.jpg',
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
    },
  ];

  const [isMe, setIsMe] = useState(true);
  const [avatarOptions, setAvatarOptions] = useState(false);

  return (
    <View>
      <View style={styles.searchToolWrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.btnBack}
        >
          <FontAwesome5Icon name="arrow-left" size={20} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            placeholderTextColor={GREY_COLOR}
            editable={false}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        bounces={false}
        style={{
          height: SCREEN_HEIGHT - 60 - STATUSBAR_HEIGHT,
          backgroundColor: '#cacad2',
        }}
      >
        <View style={styles.infoWrapper}>
          <View style={styles.avatarCoverWrapper}>
            <TouchableOpacity activeOpacity={0.8}>
              <Image style={styles.cover} source={{ uri: user.coverImage }} />
            </TouchableOpacity>
            {isMe ? (
              <TouchableOpacity style={styles.btnChangeCover}>
                <FontAwesome5Icon size={18} name="camera" />
              </TouchableOpacity>
            ) : null}
            <View style={styles.avatarWrapper}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setAvatarOptions(true)}
              >
                <Image style={styles.avatar} source={{ uri: user.avatar }} />
              </TouchableOpacity>
              {isMe ? (
                <TouchableOpacity
                  onPress={() => {}}
                  style={styles.btnChangeAvatar}
                >
                  <FontAwesome5Icon size={18} name="camera" />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          <View style={styles.introWrapper}>
            <Text style={styles.name}>{user.username}</Text>
            <Text style={styles.introTxt}>{user.description}</Text>
            <View style={styles.introOptionsWrapper}>
              <TouchableOpacity activeOpacity={0.8} style={styles.btnAddStory}>
                <FontAwesome5Icon size={20} color="#fff" name="plus-circle" />
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#fff',
                    marginLeft: 10,
                  }}
                >
                  Thêm vào tin
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ProfileSetting');
                }}
                activeOpacity={0.8}
                style={styles.btnOption}
              >
                <FontAwesome5Icon size={18} color="#000" name="ellipsis-h" />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.introListWrapper}>
            <View style={styles.introLine}>
              <FontAwesome5Icon
                size={23}
                color={GREY_COLOR}
                style={styles.introIcon}
                name="home"
              />
              <Text style={styles.introLineText}>
                Sống tại <Text style={styles.introHightLight}>{user.city}</Text>
              </Text>
            </View>
            <View style={styles.introLine}>
              <FontAwesome5Icon
                size={24}
                color={GREY_COLOR}
                style={{ ...styles.introIcon, paddingLeft: 3 }}
                name="map-marker-alt"
              />
              <Text style={styles.introLineText}>
                Đến từ <Text style={styles.introHightLight}>{user.city}</Text>
              </Text>
            </View>
          </View>
          <View
            style={{
              paddingTop: 10,
              paddingBottom: 25,
              borderBottomWidth: 0.5,
              borderBottomColor: '#ddd',
            }}
          >
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.8}
              style={styles.btnEditPublicDetail}
            >
              <Text
                style={{ color: BLUE_COLOR, fontSize: 16, fontWeight: '500' }}
              >
                Chỉnh sửa chi tiết công khai
              </Text>
            </TouchableOpacity>
          </View>
          <FriendsShowing friends={friends} isMe={isMe} />
        </View>
        <TouchableHighlight
          style={styles.container}
          onPress={() => {
            navigation.navigate('AddPostScreen');
          }}
          underlayColor={LIGHT_GREY_COLOR}
        >
          <>
            <Text
              style={{
                fontWeight: '700',
                fontSize: 20,
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              Bài viết
            </Text>
            <View style={styles.postToolWrapper}>
              <Image
                source={require('../../assets/Login/Avatar.jpg')}
                style={styles.userAvatar}
              ></Image>
              <View style={styles.postInputWrapper}>
                <View style={styles.postInput}>
                  <Text
                    style={{
                      fontSize: 17,
                    }}
                  >
                    Bạn đang nghĩ gì?
                  </Text>
                </View>
              </View>
            </View>
          </>
        </TouchableHighlight>

        {posts.map((item, index) => (
          <View key={index}>
            <Item item={item} key={index} navigation={navigation}></Item>
          </View>
        ))}

        <Modal
          animationType="slide"
          transparent={true}
          visible={avatarOptions}
          onRequestClose={() => {
            setAvatarOptions(!avatarOptions);
          }}
          style={styles.avatarOptionsContainer}
        >
          <View style={styles.backdrop}>
            <TouchableOpacity
              onPress={() => {
                setAvatarOptions(!avatarOptions);
              }}
              style={{ width: '100%', height: '100%' }}
            ></TouchableOpacity>
          </View>
          <View style={styles.postOptionsWrapper}>
            <TouchableOpacity
              style={styles.postOptionItemWrapper}
              onPress={() => {
                setAvatarOptions(!avatarOptions);
              }}
            >
              <View style={styles.postOptionItem}>
                <View style={styles.optionIcon}>
                  <FontAwesome5Icon name="images" size={20}></FontAwesome5Icon>
                </View>
                <View>
                  <Text style={styles.postOptionTitle}>Chọn ảnh đại diện</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  searchToolWrapper: {
    backgroundColor: '#fff',
    paddingTop: 5,
    flexDirection: 'row',
    height: 60,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  btnBack: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    height: 38,
    width: SCREEN_WIDTH - 40 - 15,
    borderRadius: 40,
    backgroundColor: LIGHT_GREY_COLOR,
    paddingHorizontal: 20,
    fontSize: 18,
  },
  infoWrapper: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  avatarCoverWrapper: {
    paddingBottom: 90,
    position: 'relative',
  },
  cover: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  avatarWrapper: {
    position: 'absolute',
    borderRadius: 2000,
    left: (SCREEN_WIDTH - 30 - 180) / 2,
    bottom: 0,
  },
  avatar: {
    height: 180,
    width: 180,
    borderRadius: 2000,
    borderColor: '#fff',
    borderWidth: 5,
  },
  btnChangeCover: {
    backgroundColor: LIGHT_GREY_COLOR,
    position: 'absolute',
    borderRadius: 50,
    bottom: 100,
    right: 10,
    width: 38,
    height: 38,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnChangeAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 50,
    width: 45,
    height: 45,
    borderWidth: 2.5,
    borderColor: '#fff',
    backgroundColor: LIGHT_GREY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introWrapper: {
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
  },
  name: {
    fontSize: 24,
    fontWeight: '700',
  },
  introTxt: {
    color: 'rgba(0,0,0,0.7)',
    marginTop: 10,
    fontSize: 15,
  },
  introOptionsWrapper: {
    marginTop: 15,
    flexDirection: 'row',
  },
  btnAddStory: {
    backgroundColor: BLUE_COLOR,
    borderRadius: 5,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: SCREEN_WIDTH - 90,
  },
  btnOption: {
    marginLeft: 10,
    borderRadius: 5,
    height: 40,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: LIGHT_GREY_COLOR,
  },
  introListWrapper: {
    paddingVertical: 10,
  },
  introLine: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
  },
  introIcon: {
    width: 30,
  },
  introLineText: {
    fontSize: 16,
    fontWeight: '400',
    marginLeft: 8,
  },
  introHightLight: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  btnEditPublicDetail: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: LIGHT_BLUE_COLOR,
    width: '100%',
    height: 40,
    borderRadius: 5,
  },
  container: {
    borderTopColor: '#cacad2',
    borderTopWidth: 10,
    backgroundColor: WHITE_COLOR,
  },
  postToolWrapper: {
    padding: 15,
    flexDirection: 'row',
  },

  postInputWrapper: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
    height: 36,
  },
  postInput: {
    justifyContent: 'center',
    height: 36,
    width: '100%',
    paddingHorizontal: 20,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 50,
  },
  avatarOptionsContainer: {
    position: 'relative',
  },
  backdrop: {
    zIndex: 1,
  },
  postOptionsWrapper: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
