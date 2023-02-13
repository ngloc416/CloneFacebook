import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, { useState } from 'react';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import {
  LIGHT_GREY_COLOR,
  GREY_COLOR,
  LIGHT_BLUE_COLOR,
} from '../../constants/constants';

export default function Notification({ navigation }) {
  const notifications = {
    data: [
      {
        notificationId: 1,
        objectId: 1,
        type: '',
        title: 'Bạn có một gợi ý kết bạn mới: Trang Le.',
        created: '1667879991',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
        group: '',
        read: '0',
      },
      {
        notificationId: 2,
        objectId: 2,
        type: '',
        title: 'Bạn có một gợi ý kết bạn mới: Trang Le.',
        created: '1667879992',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
        group: '',
        read: '0',
      },
      {
        notificationId: 3,
        objectId: 3,
        type: '',
        title: 'Bạn có một gợi ý kết bạn mới: Trang Le.',
        created: '1667879993',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
        group: '',
        read: '0',
      },
      {
        notificationId: 4,
        objectId: 4,
        type: '',
        title: 'Bạn có một gợi ý kết bạn mới: Trang Le.',
        created: '1667879994',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
        group: '',
        read: '0',
      },
      {
        notificationId: 5,
        objectId: 5,
        type: '',
        title: 'Bạn có một gợi ý kết bạn mới: Trang Le.',
        created: '1667879989',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
        group: '',
        read: '0',
      },
      {
        notificationId: 6,
        objectId: 6,
        type: '',
        title: 'Bạn có một gợi ý kết bạn mới: Trang Le.',
        created: '1667879988',
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRN0wR21lrB1tZAW3ihK1Zy3CXpXy4PazEU1w&usqp=CAU',
        group: '',
        read: '1',
      },
    ],
    badge: '4',
    lastUpdate: '1667879990',
  };

  let time = null;
  const badge = notifications.badge;
  const [options, setOptions] = useState(false);
  const calTime = (item) => {
    time = Date.now() / 1000 - parseInt(item.created);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.textHeader}>Thông báo</Text>
          <TouchableOpacity
            style={styles.buttonSearch}
            onPress={() =>
              navigation.navigate('SearchScreen', { userId: null })
            }
          >
            <FontAwesome5 name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {Number(notifications.badge) > 0 ? (
          <Text
            style={{
              marginLeft: 15,
              marginBottom: 10,
              fontWeight: '700',
              fontSize: 17,
            }}
          >
            Mới
          </Text>
        ) : null}

        {notifications.data.map((item, index) =>
          index < badge ? (
            <TouchableOpacity
              key={index}
              style={{
                ...styles.main,
                backgroundColor: item.read == 1 ? '#fff' : LIGHT_BLUE_COLOR,
              }}
              activeOpacity={0.5}
            >
              <Image style={styles.img} source={{ uri: item.avatar }} />
              <View style={styles.content}>
                <Text style={styles.item}>
                  <Text style={styles.name}>{item.title}</Text> {item.content}
                </Text>
                {calTime(item)}
                <Text style={styles.time}>
                  {time < 1 * 60 ? 'Vừa xong' : null}
                  {time >= 1 * 60 && time < 60 * 60
                    ? `${Math.floor(time / 60)} phút`
                    : null}
                  {time >= 1 * 60 * 60 && time < 24 * 60 * 60
                    ? `${Math.floor(time / 3600)} giờ`
                    : null}
                  {time >= 24 * 60 * 60 && time < 30 * 24 * 60 * 60
                    ? `${Math.floor(time / 86400)} ngày`
                    : null}
                  {time >= 30 * 24 * 60 * 60 && time < 12 * 30 * 24 * 60 * 60
                    ? `${Math.floor(time / 2592000)} tháng`
                    : null}
                  {time >= 12 * 30 * 24 * 60 * 60
                    ? `${Math.floor(time / 31104000)} năm`
                    : null}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setOptions(true)}
              >
                <AntDesign
                  name="ellipsis1"
                  size={20}
                  color="#000"
                  style={{ marginRight: 0 }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ) : null
        )}

        <Text
          style={{
            marginLeft: 15,
            marginTop: 15,
            marginBottom: 10,
            fontWeight: '700',
            fontSize: 17,
          }}
        >
          Trước đó
        </Text>
        {notifications.data.map((item, index) =>
          index >= badge ? (
            <TouchableOpacity
              key={index}
              style={{
                ...styles.main,
                backgroundColor: item.read == 1 ? '#fff' : LIGHT_BLUE_COLOR,
              }}
              activeOpacity={0.5}
            >
              <Image style={styles.img} source={{ uri: item.avatar }} />
              <View style={styles.content}>
                <Text style={styles.item}>
                  <Text style={styles.name}>{item.title}</Text> {item.content}
                </Text>
                {calTime(item)}
                <Text style={styles.time}>
                  {time < 1 * 60 ? 'Vừa xong' : null}
                  {time >= 1 * 60 && time < 60 * 60
                    ? `${Math.floor(time / 60)} phút`
                    : null}
                  {time >= 1 * 60 * 60 && time < 24 * 60 * 60
                    ? `${Math.floor(time / 3600)} giờ`
                    : null}
                  {time >= 24 * 60 * 60 && time < 30 * 24 * 60 * 60
                    ? `${Math.floor(time / 86400)} ngày`
                    : null}
                  {time >= 30 * 24 * 60 * 60 && time < 12 * 30 * 24 * 60 * 60
                    ? `${Math.floor(time / 2592000)} tháng`
                    : null}
                  {time >= 12 * 30 * 24 * 60 * 60
                    ? `${Math.floor(time / 31104000)} năm`
                    : null}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  width: 30,
                  height: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => setOptions(true)}
              >
                <AntDesign
                  name="ellipsis1"
                  size={20}
                  color="#000"
                  style={{ marginRight: 0 }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          ) : null
        )}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={options}
        onRequestClose={() => {
          setOptions(!options);
        }}
        style={styles.avatarOptionsContainer}
      >
        <View style={styles.backdrop}>
          <TouchableOpacity
            onPress={() => {
              setOptions(!options);
            }}
            style={{ width: '100%', height: '100%' }}
          ></TouchableOpacity>
        </View>
        <View style={styles.postOptionsWrapper}>
          <TouchableOpacity
            style={styles.postOptionItemWrapper}
            onPress={() => {
              setOptions(!options);
            }}
          >
            <View style={styles.postOptionItem}>
              <View style={styles.optionIcon}>
                <AntDesign name="closesquare" size={24} color="black" />
              </View>
              <View>
                <Text style={styles.postOptionTitle}>Gỡ thông báo này</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  textHeader: {
    fontSize: 25,
    fontWeight: '700',
  },
  main: {
    height: 77,
    flexDirection: 'row',
    justifyContent: 'center', //Centered horizontally
    alignItems: 'center', //Centered vertically
    paddingRight: 15,
  },
  img: {
    marginLeft: 15,
    marginRight: 10,
    width: 60,
    height: 60,
    borderRadius: 50,
    borderWidth: 0.2,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 15,
  },
  time: {
    marginTop: 2,
    fontSize: 13,
    color: GREY_COLOR,
  },
  avatarOptionsContainer: {
    position: 'relative',
  },
  backdrop: {
    zIndex: 1,
  },
  postOptionsWrapper: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    zIndex: 2,
    paddingHorizontal: 15,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  postOptionItemWrapper: {
    paddingBottom: 20,
  },
  postOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: LIGHT_GREY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postOptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 15,
  },
});
