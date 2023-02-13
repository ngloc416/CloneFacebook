import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { AntDesign } from '@expo/vector-icons';
import {
  STATUSBAR_HEIGHT,
  BLUE_COLOR,
  GREY_COLOR,
} from '../../constants/constants';

export default function SearchHistory({ navigation }) {
  const searchHistory = [
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'quán ăn',
      created: '1675238858',
      date: '',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'quán ăn',
      created: '1675238858',
      date: '',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'quán ăn',
      created: '1675238858',
      date: '',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'quán ăn',
      created: '1675238858',
      date: '',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'quán ăn',
      created: '1675238858',
      date: '',
    },
    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'quán ăn',
      created: '1672797164',
      date: '',
    },

    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'quán ăn',
      created: '1672797164',
      date: '',
    },

    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'quán ăn',
      created: '1672797164',
      date: '',
    },

    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'quán ăn',
      created: '1672797164',
      date: '',
    },

    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'quán ăn',
      created: '1672797164',
      date: '',
    },

    {
      id: '63b4d6871870e51c9354c506',
      keyword: 'quán ăn',
      created: '1672797164',
      date: '',
    },
  ];
  let previousDate = '';
  const getCreatedDate = (searching) => {
    const date = new Date(Number(searching.created) * 1000);
    searching.date =
      date.getDate() +
      ' Tháng ' +
      (date.getMonth() + 1) +
      ' ' +
      date.getFullYear();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={styles.btnBack}
        >
          <FontAwesome5Icon name="arrow-left" size={20} />
        </TouchableOpacity>

        <Text style={{ fontWeight: '700', fontSize: 20, marginLeft: 15 }}>
          Nhật ký hoạt động
        </Text>
      </View>
      <ScrollView
        style={{
          backgroundColor: '#fff',
          height: SCREEN_HEIGHT - 60 - STATUSBAR_HEIGHT,
        }}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.titleWrapper}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={{ color: BLUE_COLOR, fontSize: 15 }}>
              Xóa các tìm kiếm
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: '#fff', paddingHorizontal: 10 }}>
          {searchHistory.map((searching, index) => (
            <View
              onPress={() => {}}
              key={index}
              style={styles.recentSearchItem}
            >
              {getCreatedDate(searching)}
              {searching.date !== previousDate ? (
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 16,
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  {(previousDate = searching.date)}
                </Text>
              ) : null}

              <View
                style={{
                  paddingTop: 9,
                  paddingBottom: 9,
                  flexDirection: 'row',
                  height: 80,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 3,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={styles.searchIconWrapper}>
                    <FontAwesome5Icon name="search" size={16} color="white" />
                  </View>
                  <Text style={{ fontSize: 18, marginLeft: 20 }}>
                    {searching.keyword}
                  </Text>
                </View>
                <TouchableOpacity>
                  <AntDesign name="close" size={30} color={GREY_COLOR} />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const SCREEN_HEIGHT = Math.round(Dimensions.get('window').height);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  headerWrapper: {
    paddingTop: 5,
    flexDirection: 'row',
    height: 60,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    alignItems: 'center',
  },
  btnBack: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 15,
    height: 45,
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },
  recentSearchWrapper: {
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  searchIconWrapper: {
    width: 55,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BLUE_COLOR,
    borderRadius: 50,
  },
});
