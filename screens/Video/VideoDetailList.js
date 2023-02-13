import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { SCREEN_HEIGHT } from '../../constants/constants';
import VideoDetailItem from './VideoDetailItem';

function VideoDetailList({ navigation }) {
  const video = React.useRef(null);
  const videos = [
    {
      author: {
        id: '63b4d6871870e51c9354c506',
        username: 'Nguyễn Đình Lộc',
        avatar:
          'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191501/Facebook/Login/Avatar_px9tag.jpg',
      },
      described: 'Test video',
      video: {
        url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        thumb:
          'https://vidinhnghia.com/wp-content/uploads/2019/07/sai-lam-cua-cua-nha-sang-tao-noi-dung-voi-thumbnail-hinh-hien-thi-cua-video-youtube-1140x570.jpg',
      },
      created: '1672797164',
      like: '123',
      comment: '36',
      is_liked: '0',
      is_blocked: '0',
      can_comment: '1',
      can_edit: '0',
      banned: '0',
      state: 'hạnh phúc',
    },
    {
      author: {
        id: '63b4d6871870e51c9354c506',
        username: 'Nguyễn Đức Thắng',
        avatar:
          'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191501/Facebook/Login/Avatar_px9tag.jpg',
      },
      described: 'Test video',
      video: {
        url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        thumb:
          'https://vidinhnghia.com/wp-content/uploads/2019/07/sai-lam-cua-cua-nha-sang-tao-noi-dung-voi-thumbnail-hinh-hien-thi-cua-video-youtube-1140x570.jpg',
      },
      created: '1672797164',
      like: '123',
      comment: '36',
      is_liked: '0',
      is_blocked: '0',
      can_comment: '1',
      can_edit: '0',
      banned: '0',
      state: 'hạnh phúc',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.topOptiions}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Ionicons name="arrow-back" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('SearchScreen', { userId: null });
          }}
        >
          <FontAwesome5 name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View>
        <ScrollView style={styles.container}>
          <ScrollView bounces={false} style={{ backgroundColor: '#cacad2' }}>
            <View>
              {videos.map((item, index) => (
                <View key={index}>
                  <VideoDetailItem
                    navigation={navigation}
                    item={item}
                    key={index}
                  />
                </View>
              ))}
            </View>
          </ScrollView>
        </ScrollView>
      </View>
    </View>
  );
}

export default VideoDetailList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: SCREEN_HEIGHT - 80,
  },
  topOptiions: {
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
});

