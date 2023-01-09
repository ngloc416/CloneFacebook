import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import Post from '../../components/Post';
import PostOption from '../../components/PostOption';

export default function PostScreen({ navigation }) {
  const [option, setOption] = useState(false);

  const onPressOption = () => {
    if (option) {
      setOption(false);
    } else {
      setOption(true);
    }
  }
  const postList = [
    {
      author: {
        id: "63b4d6871870e51c9354c506",
        userName: 'Hoàng',
        avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
      },
      described: 'Mùa xuân là mùa cây cối đâm chồi nảy lộc. Những mầm non xanh tươi mơn mởn tràn đầy nhựa sống.' +
        ' Thời tiết se se lạnh và có mưa phùn. Trên bầu trời, những đám mây trắng đang trôi lờ lững. Đến tầm trưa, có những tia nắng và ông mặt trời xuất hiện.' +
        ' Những chú chim cất tiếng hót líu lo. Đây là mùa mà các loài hoa đua nhau khoe sắc thắm. Mùa xuân, em háo hức nhất là dịp Tết để được nhận được lì xì. ' + 
        'Em rất yêu quý mùa xuân và em mong chờ mùa xuân nhanh đến.',
      image: [{
        url: 'https://hinhanhdephd.com/wp-content/uploads/2017/10/hinh-anh-mua-xuan-dep-canh-dep-thien-nhien-trong-mua-xuan-5.jpg',
        id: "63b4d6871870e51c9354c506",
      }],
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
        url: 'https://hinhanhdephd.com/wp-content/uploads/2017/10/hinh-anh-mua-xuan-dep-canh-dep-thien-nhien-trong-mua-xuan-5.jpg',
        id: "63b4d6871870e51c9354c506",
      },
      {
        url: 'https://hinhanhdephd.com/wp-content/uploads/2017/10/hinh-anh-mua-xuan-dep-canh-dep-thien-nhien-trong-mua-xuan-5.jpg',
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
    },
  ]

  return (
    <View>
      <ScrollView>
          <View>
          {
            postList.map((post, key) => (
              <Post key={key} post={post}/>
            ))
          }
          </View>
      </ScrollView>
      <TouchableHighlight onPress={onPressOption}>
        <View>
          { option && <PostOption />}
        </View>
      </TouchableHighlight>
    </View>

  );
}