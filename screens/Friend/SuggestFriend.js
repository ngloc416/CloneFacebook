import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

import { LIGHT_GREY_COLOR } from '../../constants/constants.js';
import FriendItem from '../../components/FriendItem';
import { getSuggestedFriendList } from '../../services/friend.service';
import { openNotice, closeNotice } from '../../redux/actions/notice.action';
import { authMsg } from '../../constants/message';

function SuggestFriend({ navigation }) {
  const [friendList, setFriendList] = useState([]);
  const [reloadSuggested, setReloadSuggested] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchFriendList = async () => {
      const token = await AsyncStorage.getItem('token');
      const response = await getSuggestedFriendList({
        token,
        index: 0,
        count: 20,
      });
      if (response.code === '1000') {
        setFriendList(response.data.list_users);
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
        } else {
          dispatch(
            openNotice({ notice: response.message, typeNotice: 'warning' })
          );
          setTimeout(() => dispatch(closeNotice()), 2000);
        }
      }
    };
    fetchFriendList();
  }, [reloadSuggested]);

  const changeReloadSuggested = () => {
    if (reloadSuggested) {
      setReloadSuggested(false);
    } else {
      setReloadSuggested(false);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={styles.buttonReturn}
              onPress={() => navigation.goBack()}
            >
              <Ionicons
                name="arrow-back"
                size={28}
                color="black"
                style={styles.iconReturn}
              />
            </TouchableOpacity>
            <Text style={styles.textHeader}>Gợi ý</Text>
          </View>
          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={() =>
              navigation.navigate('SearchScreen', { userId: null })
            }
          >
            <FontAwesome5 name="search" size={21} color="black" />
          </TouchableOpacity>
        </View>

        <View
          style={{
            borderTopColor: LIGHT_GREY_COLOR,
            borderTopWidth: 1,
            height: 1,
          }}
        ></View>

        <View
          style={{
            paddingHorizontal: 15,
            height: '93%',
          }}
        >
          <ScrollView
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.textSubtitle}>Những người bạn có thể biết</Text>
            <View>
              {friendList.map((item, index) => (
                <View style={styles.friend} key={index}>
                  <FriendItem
                    userId={item.user_id}
                    setReloadSuggested={changeReloadSuggested}
                    urlAvatar={item.avatar}
                    mutual={item.same_friends}
                    name={item.username}
                    firstLabel="Thêm bạn bè"
                    secondLabel="Gỡ"
                    navigation={navigation}
                  ></FriendItem>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

export default SuggestFriend;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '7%',
    paddingHorizontal: 15,
  },

  textHeader: {
    fontSize: 18,
    marginLeft: '8%',
  },

  textSubtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 13,
    paddingBottom: 8,
  },
});
