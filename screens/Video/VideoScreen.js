import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TouchableHighlight
  } from 'react-native';

import { FontAwesome5 } from '@expo/vector-icons';
import { Video } from 'expo-av'
import VideoItem from '../../components/VideoItem';

function VideoScreen({ navigation }) {
  const video = React.useRef(null);
  const videos = [
    {
      author: {
        id: '63b4d6871870e51c9354c506',
        username: 'Nguyễn Đình Lộc',
        avatar:
          'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191501/Facebook/Login/Avatar_px9tag.jpg'
      },
      described: 
        'Test video',
      video: {
        url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        thumb: 'https://vidinhnghia.com/wp-content/uploads/2019/07/sai-lam-cua-cua-nha-sang-tao-noi-dung-voi-thumbnail-hinh-hien-thi-cua-video-youtube-1140x570.jpg'
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
          'https://res.cloudinary.com/dlfm9yjiq/image/upload/v1673191501/Facebook/Login/Avatar_px9tag.jpg'
      },
      described: 
        'Test video',
      video: {
        url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
        thumb: 'https://vidinhnghia.com/wp-content/uploads/2019/07/sai-lam-cua-cua-nha-sang-tao-noi-dung-voi-thumbnail-hinh-hien-thi-cua-video-youtube-1140x570.jpg'
      },
      created: '1672797164',
      like: '123',
      comment: '36',
      is_liked: '0',
      is_blocked: '0',
      can_comment: '1',
      can_edit: '0',
      banned: '0',
      state: 'hạnh phúc'
    }
  ];

  return (
    <View style={{ position: 'relative'}}>
       <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Watch</Text>
          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={() => {
              navigation.navigate('VideoDetailList');
            }}
          >
            <FontAwesome5 name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView bounces={false} style={{ backgroundColor: '#cacad2' }}>
          <View>
            {videos.map((item, index) => (
              <View key={index}>
                <VideoItem item={item} key={index} />
              </View>
            ))}
          </View>
        </ScrollView>
       </ScrollView>
       
    </View>
  )
}

export default VideoScreen 

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingTop: 15,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },

  textHeader: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  buttonSearch: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  video: {
    height: 200,
    width: 250
  }
  });
  