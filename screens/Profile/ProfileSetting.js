import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { GREY_COLOR } from '../../constants/constants';

export default function ProfileSetting({ navigation, route }) {
  const user = route.params.user;
  return (
    <View style={styles.container}>
      <View style={styles.navigationBar}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.btnBack}
        >
          <FontAwesome5Icon name="arrow-left" size={20} />
        </TouchableOpacity>
        <View style={styles.navigationTitle}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            Cài đặt trang cá nhân
          </Text>
        </View>
      </View>
      <ScrollView>
        <View style={styles.groupSetting}>
          <TouchableOpacity
            style={styles.settingCategory}
            onPress={() =>
              navigation.navigate('EditPublicInfo', { userInfo: user })
            }
          >
            <View style={styles.settingIcon}>
              <FontAwesome5Icon name="edit" size={20} />
            </View>
            <Text style={styles.settingTxt}>Chỉnh sửa trang cá nhân</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ ...styles.settingCategory, borderBottomWidth: 0 }}
            onPress={() => {
              navigation.navigate('SearchScreen', { userId: user.id });
            }}
          >
            <View style={styles.settingIcon}>
              <FontAwesome5Icon name="search" size={20} />
            </View>
            <Text style={styles.settingTxt}>Tìm kiếm trên trang cá nhân</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.myProfile}>
          <View style={styles.topTitle}>
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 6 }}>
              Liên kết đến trang cá nhân của bạn
            </Text>
            <Text style={{ color: GREY_COLOR, fontSize: 15 }}>
              Liên kết của riêng bạn trên Facebook
            </Text>
          </View>
          <View>
            <Text style={{ fontWeight: '700', marginTop: 5, fontSize: 15 }}>
              abcdeffffff
            </Text>
            <TouchableOpacity style={styles.btnCopy}>
              <Text
                style={{
                  fontSize: 15,
                }}
              >
                SAO CHÉP LIÊN KẾT
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#cacad2', height: '100%' },
  navigationBar: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    marginBottom: 8,
  },
  btnBack: {
    zIndex: 1,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationTitle: {
    position: 'absolute',
    left: 0,
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupSetting: {
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  settingCategory: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
    width: '100%',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  settingIcon: {
    width: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingTxt: {
    fontSize: 16,
    marginLeft: 10,
  },
  myProfile: {
    backgroundColor: '#fff',
    padding: 10,
  },
  topTitle: {
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
    height: 65,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  btnCopy: {
    borderColor: GREY_COLOR,
    borderRadius: 5,
    borderWidth: 1,
    height: 40,
    width: '50%',
    marginTop: 18,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});
