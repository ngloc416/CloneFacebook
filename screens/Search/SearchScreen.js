import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { AntDesign } from '@expo/vector-icons';

import {
  LIGHT_GREY_COLOR,
  GREY_COLOR,
  STATUSBAR_HEIGHT,
} from '../../constants/constants';
import Item from '../Home/Item';

export default function SearchScreen({ navigation, route }) {
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
  ];
  const searchHistory = [
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'quán ăn',
      created: '1672797164',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'lộc',
      created: '1672797165',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'phim hay',
      created: '1672797166',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'món ăn ngon',
      created: '1672797167',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'abc',
      created: '1672797168',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'abc',
      created: '1672797168',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'abc',
      created: '1672797168',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'abc',
      created: '1672797168',
    },

    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'abc',
      created: '1672797168',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'abc',
      created: '1672797168',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'abc',
      created: '1672797168',
    },

    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'abc',
      created: '1672797168',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'abc',
      created: '1672797168',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'abc',
      created: '1672797168',
    },

    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'abc',
      created: '1672797168',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'abc',
      created: '1672797168',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'abc',
      created: '1672797168',
    },
  ];

  const searchUserId = route.params.userId;
  const [keyword, setKeyword] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.searchToolWrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.btnBack}
        >
          <FontAwesome5Icon name="arrow-left" size={20} />
        </TouchableOpacity>
        <TextInput
          value={keyword}
          onChangeText={(text) => {
            if (text) {
              setKeyword(text);
            } else setKeyword(null);
          }}
          style={styles.searchInput}
          placeholder={
            searchUserId ? 'Tìm kiếm trên trang cá nhân' : 'Tìm kiếm'
          }
          placeholderTextColor={GREY_COLOR}
          autoFocus={true}
        />
        {keyword ? (
          <TouchableOpacity
            style={{ position: 'absolute', right: 25 }}
            onPress={() => {
              setKeyword(null);
            }}
          >
            <AntDesign name="close" size={23} color={GREY_COLOR} />
          </TouchableOpacity>
        ) : null}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        style={{ height: SCREEN_HEIGHT - 60 - STATUSBAR_HEIGHT }}
      >
        {keyword ? (
          posts.map((item, index) => (
            <View key={index}>
              <Item item={item} key={index} navigation={navigation}></Item>
            </View>
          ))
        ) : (
          <>
            <View style={styles.titleWrapper}>
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                Tìm kiếm gần đây
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SearchHistory');
                }}
              >
                <Text style={styles.btnModify}>CHỈNH SỬA</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.recentSearchWrapper}>
              {searchHistory.map((searching, index) => (
                <TouchableOpacity
                  onPress={() => {
                    setKeyword(searching.keyword);
                  }}
                  key={index}
                  style={styles.recentSearchItem}
                  activeOpacity={0.8}
                >
                  <View style={styles.searchIconWrapper}>
                    <FontAwesome5Icon name="search" size={16} color="gray" />
                  </View>

                  <Text style={{ fontSize: 16, marginLeft: 15 }}>
                    {searching.keyword}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const SCREEN_WIDTH = Math.round(Dimensions.get('window').width);
const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cacad2',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
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
  titleWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    height: 45,
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  btnModify: {
    fontSize: 18,
    color: GREY_COLOR,
  },
  recentSearchWrapper: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  recentSearchItem: {
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
  },
  searchIconWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
