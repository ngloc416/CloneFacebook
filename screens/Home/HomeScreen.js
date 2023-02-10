import React from 'react';
import { View, ScrollView } from 'react-native';
import Item from './Item';

import PostTool from './PostTool';

export default function HomeScreen({ navigation }) {
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
  if (posts.length === 0) return <View></View>;
  return (
    <View>
      <ScrollView
        bounces={false}
        style={{ backgroundColor: '#cacad2' }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <PostTool navigation={navigation}></PostTool>
        <View>
          {posts.map((item, index) => (
            <View key={index}>
              <Item item={item} key={index} navigation={navigation}></Item>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
