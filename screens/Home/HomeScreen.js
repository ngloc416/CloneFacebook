import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ScrollView, BackHandler } from 'react-native';
import { useDispatch } from 'react-redux';
import Item from './Item';

import { getListPost } from '../../services/post.service';
import PostTool from './PostTool';
import { openNotice, closeNotice } from '../../redux/actions/notice.action';
import { networkErrorMsg, authMsg } from '../../constants/message.js';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [index, setIndex] = useState(0);
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();

  const reloadWhenChange = () => {
    setReload(!reload);
  }
  useEffect(() => {
    async function fetchPostList() {
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
      const response = await getListPost({
        last_id: lastId,
        index,
        count: 20,
        token,
      });
      if (response.code === '1000') {
        setPosts(response.data.posts);
      } else {
        if (response.code === '9995' || response.code === '9998') {
          await AsyncStorage.removeItem('token');
          navigation.navigate('LoginScreen');
          dispatch(
            openNotice({ notice: authMsg.badToken, typeNotice: 'warning' })
          );
          setTimeout(() => dispatch(closeNotice()), 2000);
        } else if (response.code === 'ERR_NETWORK') {
          dispatch(
            openNotice({ notice: networkErrorMsg, typeNotice: 'warning' })
          );
          setTimeout(() => dispatch(closeNotice()), 2000);
        }
      }
    }
    fetchPostList();
  }, [reload]);

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
              <Item item={item} key={index} navigation={navigation} reload={reloadWhenChange}></Item>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
