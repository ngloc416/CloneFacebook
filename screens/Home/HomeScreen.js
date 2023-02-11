import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ScrollView } from 'react-native';
import Item from './Item';

import { getListPost } from '../../services/post.service';
import PostTool from './PostTool';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    async function fetchPostList () {
      // let response;
      // const postList = await AsyncStorage.getItem('post_list');
      // if (postList) {
      //   setPosts(JSON.parse(postList));
      //   response = await getListPost({ last_id: lastId, index, count: 20});
      //   await AsyncStorage.setItem('post_list', JSON.stringify(response.data.posts));
      // } else {
      //   if (response.code === '1000') {
      //     response = await getListPost({ last_id: lastId, index, count: 20});
      //     setPosts(response.data.posts);
      //     setTimeout(async () => await AsyncStorage.setItem('post_list', JSON.stringify(response.data.posts)), 100);
      //   }
      // }

      const token = await AsyncStorage.getItem('token');
      const response = await getListPost({ last_id: lastId, index, count: 20, token});
      if (response.code === '1000') {
        setPosts(response.data.posts);
      }
    }
    fetchPostList();
  }, []);

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
