import React from 'react'
import { Animated, View, Text, StyleSheet, TouchableOpacity, Dimensions, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5'
import { getStatusBarHeight } from 'react-native-status-bar-height';

import Comment from '../../components/Comment'

const PostCommentScreen = () => {
  const comments = [
    {
      "id": "63bc1891008c6e79573d08d1",
      "comment": "Happy happy Happy",
      "created": "1673271441",
      "poster": {
          "id": "63b4d6871870e51c9354c506",
          "name": 'Hoang',
          "avatar": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
      },
      "is_blocked": "0"
  },
  {
    "id": "63bc1891008c6e79573d08d1",
    "comment": "Happy happy Happy",
    "created": "1673271441",
    "poster": {
        "id": "63b4d6871870e51c9354c506",
        "name": 'Hoang',
        "avatar": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
    },
    "is_blocked": "0"
},
{
  "id": "63bc1891008c6e79573d08d1",
  "comment": "Happy happy Happy",
  "created": "1673271441",
  "poster": {
      "id": "63b4d6871870e51c9354c506",
      "name": 'Hoang',
      "avatar": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
  },
  "is_blocked": "0"
},
{
  "id": "63bc1891008c6e79573d08d1",
  "comment": "Happy happy Happy",
  "created": "1673271441",
  "poster": {
      "id": "63b4d6871870e51c9354c506",
      "name": 'Hoang',
      "avatar": 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
  },
  "is_blocked": "0"
},
  ];

  return (
    <View>
                <View style={styles.backdrop}>
                </View>
                <KeyboardAvoidingView behavior="height" enabled style={{ ...styles.keyboardAvoidingContainer }}>
                    <Animated.View style={styles.wrapper } >
                        <View style={styles.navigationStackBar}>
                            <TouchableOpacity style={styles.btnBack}>
                                <FontAwesome5Icon name="arrow-left" size={24}></FontAwesome5Icon>
                            </TouchableOpacity>
                            <View style={styles.stackBarTitle}>
                                <Text style={{ fontSize: 16 }}>Bình luận</Text>
                            </View>
                        </View>
                            <ScrollView
                                ref={React.createRef()}
                                scrollEventThrottle={40}
                                style={styles.container}
                            >
                                {comments.map((comment, index) => (
                                    <Comment key={index} comment={comment}>Detail</Comment>
                                ))}
                            </ScrollView>
                        <View style={styles.commentInputWrapper}>
                            <TouchableOpacity style={styles.cameraIconWrapper}>
                                <FontAwesome5Icon name="camera" size={20}></FontAwesome5Icon>
                            </TouchableOpacity>
                            <View style={styles.textInputWrapper}>
                                <TextInput autoFocus={true} style={styles.textInput}>

                                </TextInput>
                            </View>
                            <View style={styles.iconWrapper}>
                                <TouchableOpacity style={styles.iconItem}>
                                    <FontAwesome5Icon name="grip-horizontal" size={20}></FontAwesome5Icon>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.iconItem}>
                                    <FontAwesome5Icon name="grin-wink" size={20}></FontAwesome5Icon>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Animated.View>
                </KeyboardAvoidingView>
            </View>
  )
}

export default PostCommentScreen;

const STACK_NAVBAR_HEIGHT = 48;
const FIXED_STATUSBAR_HEIGHT = 44;
const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
      height: screenHeight,
      zIndex: 2
  },
  wrapper: {
      position: 'absolute',
      left: 0,
      width: '100%',
      height: '100%'
  },
  backdrop: {
      backgroundColor: 'rgba(0,0,0,0)',
      width: '100%',
      height: '100%',
      position: 'absolute',
      zIndex: 1
  },
  container: {
      padding: 10,
      marginBottom: FIXED_STATUSBAR_HEIGHT + STACK_NAVBAR_HEIGHT + 50,
      backgroundColor: '#ffffff',
  },
  commentInputWrapper: {
      borderWidth: 1,
      borderBottomWidth: 0,
      borderColor: '#ddd',
      position: 'absolute',
      bottom: FIXED_STATUSBAR_HEIGHT + STACK_NAVBAR_HEIGHT,
      left: 0,
      paddingHorizontal: 15,
      height: 50,
      backgroundColor: '#fff',
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center'
  },
  iconItem: {
      width: 30,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center'
  },
  cameraIconWrapper: {
      backgroundColor: '#ddd',
      borderRadius: 50,
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center'
  },
  textInputWrapper: {
      height: 40,
      borderTopLeftRadius: 48,
      borderBottomLeftRadius: 48,
      backgroundColor: '#ddd',
      marginLeft: 10,
      width: screenWidth - 40 - 80 - 30 - 10,
      borderRightWidth: 0
  },
  textInput: {
      width: "100%",
      height: 40,
      paddingHorizontal: 15,
      alignItems: 'center'
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
      borderLeftWidth: 0
  },
  navigationStackBar: {
      flexDirection: 'row',
      height: 40,
      alignItems: 'center',
      paddingHorizontal: 10
  },
  btnBack: {
      zIndex: 99
  },
  stackBarTitle: {
      position: 'absolute',
      width: screenWidth,
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      height: 40,
      borderBottomColor: '#ddd',
      borderBottomWidth: 1
  }
})