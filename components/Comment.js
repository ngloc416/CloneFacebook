import React from 'react'
import { View, Image, TouchableOpacity, Text, Dimensions, StyleSheet } from 'react-native'

import Avatar from './Avatar.js'
const screenWidth = Dimensions.get('screen').width;

const Comment = ({comment}) => {
  const time = Date.now()/1000 - parseInt(comment.created);
  return (
    <View style={styles.container}>
                <Avatar source={{ uri: comment.poster.avatar }}/>
                <View style={styles.centerContainer}>
                    <View style={styles.contentContainer}>
                        <TouchableOpacity><Text style={styles.name}>{comment.poster.name}</Text></TouchableOpacity>
                        <Text style={styles.content}>{comment.comment}</Text>
                    </View>
                    {/* <ScaledImage width={screenWidth * 0.7} style={styles.image} source={comment.image}></ScaledImage> */}
                    <View style={styles.toolContainer}>
                        {
                          (time < 1*60*60) ? <Text style={styles.createAt}>Vừa xong</Text>: null
                        }
                        {
                          (time >= 1*60*60 && time < 24*60*60) ? <Text style={styles.createAt}>{Math.floor(time/3600)} giờ</Text>: null
                        }
                        {
                          (time >= 24*60*60 && time < 30*24*60*60) ? <Text style={styles.createAt}>{Math.floor(time/86400)} ngày</Text>: null
                        }
                        {
                          (time >= 30*24*60*60 && time < 12*30*24*60*60) ? <Text style={styles.createAt}>{Math.floor(time/2592000)} tháng</Text>: null
                        }
                        {
                          (time >= 12*30*24*60*60) ? <Text style={styles.createAt}>{Math.floor(time/31104000)} năm</Text>: null
                        }
                        <TouchableOpacity style={styles.likeBtn}><Text style={{fontWeight: 'bold'}}>Thích</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.replyBtn}><Text style={{fontWeight: 'bold'}}>Phản hồi</Text></TouchableOpacity>
                    </View>
                </View>
            </View>
  );
}

export default Comment;

const styles = StyleSheet.create({
  container: {
      flexDirection: 'row',
      marginBottom: 15
  },
  avatar: {
      width: 40,
      height: 40,
      borderRadius: 50,
      marginRight: 10
  },
  centerContainer: {
      width: screenWidth * 0.7,
      marginLeft: 10,
  },
  contentContainer: {
      marginBottom: 5,
      padding: 10,
      paddingTop: 5,
      backgroundColor: '#e9ebee',
      borderRadius: 10,
  },
  name: {
      fontWeight: 'bold'
  },
  content: {

  },
  image: {
      borderRadius: 10
  },
  toolContainer: {
      flexDirection: 'row',
      width: 0.6 * screenWidth,
  },
  createAt: {
      width: '30%',
  },
  likeBtn: {
      textAlign: 'center',
      marginLeft: 20,
  },
  replyBtn: {
      textAlign: 'center',
      marginLeft: 20,
  }
})