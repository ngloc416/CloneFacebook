import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  ScrollView,
  BackHandler,
  RefreshControl,
  FlatList,
} from 'react-native';
import { useDispatch } from 'react-redux';
import Item from './Item';
import { SCREEN_HEIGHT } from '../../constants/constants';

import { getListPost } from '../../services/post.service';
import PostTool from './PostTool';
import { openNotice, closeNotice } from '../../components/notice.action';
import { networkErrorMsg, authMsg } from '../../constants/message.js';

export default function HomeScreen({ navigation }) {
  const [posts, setPosts] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [index, setIndex] = useState(0);
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = React.useState(false);
  useEffect(() => {
    async function fetchPostList() {
      const token = await AsyncStorage.getItem('token');
      const response = await getListPost({
        last_id: 0,
        index,
        count: 10,
        token,
      });
      if (response.code === '1000') {
        setPosts(response.data.posts);
        return response.data.posts;
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
    console.log(posts);
    return () => setPosts(fetchPostList);
  }, []);

  // pull down to reload
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    async function fetchPostList() {
      const token = await AsyncStorage.getItem('token');
      const response = await getListPost({
        last_id: 0,
        index,
        count: 10,
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

    setRefreshing(false);
  }, []);

  // pull up to load more
  const handleLoadMore = React.useCallback(() => {
    async function fetchPostList() {
      const token = await AsyncStorage.getItem('token');
      console.log(posts);
      const response = await getListPost({
        last_id:
          posts[posts.length - 1] != undefined ? posts[posts.length - 1].id : 0,
        index,
        count: 10,
        token,
      });
      if (response.code === '1000') {
        console.log(response);
        if (response.data.new_items > posts.length - 1 || lastId == 0) {
          console.log(posts);
          if (posts.length == 0) posts.push(response.data.posts[0]);
          console.log(posts);
          const rs = response.data.posts.splice(1);
          rs.map((item) => posts.push(item));
          setPosts(posts);
        } else setPosts(posts);
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
  }, []);

  if (posts && posts.length === 0) return <View></View>;

  return (
    <View>
      <PostTool navigation={navigation}></PostTool>
      <FlatList
        bounces={false}
        style={{ backgroundColor: '#cacad2', height: SCREEN_HEIGHT - 195 }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Item item={item} key={index} navigation={navigation}></Item>
        )}
        initialNumToRender={5}
        onEndReachedThreshold={4}
        onEndReached={() => {
          handleLoadMore();
        }}
      ></FlatList>
    </View>
  );
}
