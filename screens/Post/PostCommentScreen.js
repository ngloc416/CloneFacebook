import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Animated,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

import { openNotice, closeNotice } from '../../redux/actions/notice.action';
import Comment from '../../components/Comment';
import { setComment, getComment } from '../../services/comment.service';

const PostCommentScreen = ({ navigation, route }) => {
  const [index, setIndex] = useState(0);
  const [count, setCount] = useState(20);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
  const [noComment, setNoComment] = useState(false);

  const postId = route.params.postId;
  useEffect(() => {
    const fetchComment = async () => {
      const token = await AsyncStorage.getItem('token');
      const response = await getComment({ token, postId, index, count });
      if (response.code === '1000') {
        setNoComment(false);
        setComments(response.data);
      }
      if (
        response.code === '9994' &&
        response.message === 'No data or end of list data'
      ) {
        setNoComment(true);
      }
    };
    fetchComment();
  }, []);

  const acceptAddComment = async () => {
    if (commentText) {
      const token = await AsyncStorage.getItem('token');
      const response = await setComment({
        postId,
        token,
        commentText,
        index,
        count,
      });
      if (response.code === '1000') {
        setNoComment(false);
        setCommentText('');
        setComments(response.data);
      } else {
        dispatch(
          openNotice({ notice: response.message, typeNotice: 'warning' })
        );
        setTimeout(() => dispatch(closeNotice()), 2000);
      }
    }
  };

  return (
    <View>
      <View style={styles.backdrop}></View>
      <KeyboardAvoidingView
        behavior="height"
        enabled
        style={{ ...styles.keyboardAvoidingContainer }}
      >
        <Animated.View style={styles.wrapper}>
          <View style={styles.navigationStackBar}>
            <TouchableOpacity style={styles.btnBack}>
              <FontAwesome5Icon
                name="arrow-left"
                size={24}
                onPress={() => navigation.goBack()}
              ></FontAwesome5Icon>
            </TouchableOpacity>
            <View style={styles.stackBarTitle}>
              <Text style={{ fontSize: 18 }}>Bình luận</Text>
            </View>
          </View>
          <ScrollView
            ref={React.createRef()}
            scrollEventThrottle={40}
            style={styles.container}
          >
            {noComment ? (
              <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 18, alignSelf: 'center' }}>
                  Chưa có bình luận nào
                </Text>
                <Text style={{ fontSize: 15, alignSelf: 'center' }}>
                  Hãy là người đầu tiên bình luận
                </Text>
              </View>
            ) : null}
            {comments.map((comment, index) => (
              <Comment key={index} comment={comment} navigation={navigation}>
                Detail
              </Comment>
            ))}
          </ScrollView>
          <View style={styles.commentInputWrapper}>
            <View style={styles.textInputWrapper}>
              <TextInput
                autoFocus={true}
                style={styles.textInput}
                value={commentText}
                onChangeText={(text) => setCommentText(text)}
              ></TextInput>
            </View>
            <View style={styles.iconWrapper}>
              <TouchableOpacity style={styles.iconItem}>
                <FontAwesome5Icon name="grin-wink" size={20}></FontAwesome5Icon>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.iconItem}
                onPress={acceptAddComment}
              >
                <FontAwesome5Icon
                  name="paper-plane"
                  size={20}
                ></FontAwesome5Icon>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default PostCommentScreen;

const STACK_NAVBAR_HEIGHT = 48;
const FIXED_STATUSBAR_HEIGHT = 44;
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    height: screenHeight,
    zIndex: 2,
  },
  wrapper: {
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '100%',
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: 1,
  },
  container: {
    padding: 10,
    backgroundColor: '#ffffff',
  },
  commentInputWrapper: {
    borderWidth: 1,
    borderBottomWidth: 0,
    borderColor: '#ddd',
    position: 'absolute',
    bottom: 23,
    left: 0,
    paddingHorizontal: 15,
    height: 60,
    backgroundColor: '#fff',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconItem: {
    width: 30,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputWrapper: {
    height: 40,
    borderTopLeftRadius: 48,
    borderBottomLeftRadius: 48,
    backgroundColor: '#ddd',
    marginLeft: 10,
    width: screenWidth - 130,
    borderRightWidth: 0,
    alignSelf: 'center',
  },
  textInput: {
    width: '100%',
    height: 40,
    paddingHorizontal: 15,
    alignItems: 'center',
    fontSize: 16,
  },
  iconWrapper: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderTopRightRadius: 48,
    borderBottomRightRadius: 48,
    height: 40,
    backgroundColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
    borderLeftWidth: 0,
  },
  navigationStackBar: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  btnBack: {
    zIndex: 99,
  },
  stackBarTitle: {
    position: 'absolute',
    width: screenWidth,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height: 60,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
});
