import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Ionicons,
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
} from '@expo/vector-icons';
import { GREY_COLOR } from '../../constants/constants';

import { logout } from '../../services/auth.service';

export default function SettingScreen({ navigation }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await AsyncStorage.getItem('user');
      const userData = JSON.parse(currentUser);
      setUser(userData);
    };
    fetchUser();
  }, []);

  const acceptLogout = async () => {
    const token = await AsyncStorage.getItem('token');
    const response = await logout(token);
    if (response.code === '1000') {
      await AsyncStorage.removeItem('token');
      navigation.replace('LoginScreen');
    } else {
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView bounces={false}>
        <View
          style={{
            backgroundColor: '#fff',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            paddingTop: 15,
            paddingBottom: 5,
          }}
        >
          <Text
            style={{
              fontWeight: '700',
              fontSize: 25,
            }}
          >
            Menu
          </Text>
          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={() =>
              navigation.navigate('SearchScreen', { userId: null })
            }
          >
            <FontAwesome5 name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.btnProfile}
          onPress={() =>
            navigation.navigate('ProfileScreen', { userId: user.id })
          }
          activeOpacity={0.8}
        >
          <Image
            style={styles.avatar}
            source={{
              uri: user.avatar,
            }}
          />
          <View>
            <Text style={styles.name}>{user.username}</Text>
            <Text style={{ color: GREY_COLOR, fontSize: 15 }}>
              Xem trang c?? nh??n c???a b???n
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOption} activeOpacity={0.8}>
          <Entypo name="help-with-circle" size={27} color={GREY_COLOR} />
          <View>
            <Text style={styles.setting}>Tr??? gi??p v?? h??? tr???</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnOption} activeOpacity={0.8}>
          <Ionicons name="ios-settings" size={29} color={GREY_COLOR} />
          <View>
            <Text style={styles.setting}>C??i ?????t v?? quy???n ri??ng t??</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnOption}
          activeOpacity={0.8}
          onPress={() => acceptLogout()}
        >
          <MaterialCommunityIcons name="logout" size={30} color={GREY_COLOR} />
          <View>
            <Text style={styles.setting}>????ng xu???t </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  btnProfile: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  btnOption: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 15,
    paddingBottom: 5,
    paddingTop: 5,
  },
  avatar: {
    height: 45,
    width: 45,
    borderRadius: 50,
    marginRight: 15,
    borderColor: '#333',
    borderWidth: 0.2,
  },
  name: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  setting: {
    fontSize: 17,
    marginLeft: 15,
  },
});
