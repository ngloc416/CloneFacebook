import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import {
  SCREEN_WIDTH,
  GREY_COLOR,
  BLUE_COLOR,
  LIGHT_GREY_COLOR,
} from '../../constants/constants';
export default function FriendsShowing(props) {
  return (
    <View style={styles.friendsWrapper}>
      <View style={{ backgroundColor: '#fff' }}>
        <TouchableOpacity
          onPress={() => {}}
          activeOpacity={0.8}
          style={styles.friendsBar}
        >
          <View>
            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>Bạn bè</Text>
            <Text
              style={{ fontSize: 17, fontWeight: '500', color: GREY_COLOR }}
            >
              {props.friends.length} người bạn
              {!props.isMe ? ` (${'30'} bạn chung)` : ''}
            </Text>
          </View>
          {props.isMe && (
            <TouchableOpacity
              onPress={() => {}}
              activeOpacity={0.8}
              style={styles.btnFindFriends}
            >
              <Text style={{ fontSize: 17, color: BLUE_COLOR }}>
                Tìm bạn bè
              </Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.friendGallery}>
        {props.friends.splice(0, 6).map((friend, index) => (
          <View key={index} style={styles.friendItem}>
            <TouchableOpacity onPress={() => {}} activeOpacity={0.8}>
              <Image
                source={{ uri: friend.friend.avatar }}
                style={styles.friendAvatar}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {}} style={{ marginTop: 5 }}>
              <Text style={{ fontSize: 15, fontWeight: '700' }}>
                {friend.friend.username}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => {}}
        activeOpacity={0.8}
        style={styles.btnViewAllFriends}
      >
        <Text style={{ fontSize: 15, fontWeight: '700' }}>
          Xem tất cả bạn bè
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  friendsWrapper: {
    paddingVertical: 15,
  },
  friendsBar: {
    paddingVertical: 10,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnFindFriends: {
    paddingHorizontal: 11,
  },
  friendGallery: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  friendItem: {
    width: (SCREEN_WIDTH - 30 - 20) / 3,
    marginBottom: 15,
  },
  friendAvatar: {
    width: (SCREEN_WIDTH - 30 - 20) / 3,
    height: (SCREEN_WIDTH - 30 - 20) / 3,
    borderRadius: 10,
  },
  btnViewAllFriends: {
    width: '100%',
    borderRadius: 5,
    height: 40,
    backgroundColor: LIGHT_GREY_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
