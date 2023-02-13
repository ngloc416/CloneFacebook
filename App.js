import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useSelector, Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  Entypo,
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  Octicons,
} from '@expo/vector-icons';
import { Alert, View } from 'react-native';
import {
  BLUE_COLOR,
  GREY_COLOR,
  STATUSBAR_HEIGHT,
} from './constants/constants';

import FirstLoginScreen from './screens/Login/FirstLoginScreen';
import LoginScreen from './screens/Login/LoginScreen';
import NextLoginScreen from './screens/Login/NextLoginScreen';

import BeginSignUp from './screens/Signup/BeginSignup';
import SignupScreen from './screens/Signup/SignupScreen';
import CheckVerify from './screens/Signup/CheckVerify';
import ChangeInfoAfterSignup from './screens/Signup/ChangeInfoAfterSignup';

import HomeScreen from './screens/Home/HomeScreen';
import Header from './screens/Home/Header';

import PostDetailScreen from './screens/Post/PostDetailScreen';
import PostImageScreen from './screens/Post/PostImageScreen';
import PostCommentScreen from './screens/Post/PostCommentScreen';
import EditPostScreen from './screens/Post/EditPostScreen';

import AllFriend from './screens/Friend/AllFriend';
import FriendScreen from './screens/Friend/FriendScreen';
import SuggestFriend from './screens/Friend/SuggestFriend';
import store from './redux/store';

import SearchScreen from './screens/Search/SearchScreen';
import SearchHistory from './screens/Search/SearchHistory';

import ProfileScreen from './screens/Profile/ProfileScreen';
import ProfileSetting from './screens/Profile/ProfileSetting';
import ShowCoverImage from './screens/Profile/ShowCoverImage';
import EditPublicInfo from './screens/Profile/EditPublicInfo';

import SettingScreen from './screens/Setting/SettingScreen';

import AddPostScreen from './screens/AddPost.js/AddPostScreen';

import NotificationScreen from './screens/Notification/NotificationScreen';

import VideoScreen from './screens/Video/VideoScreen';
import VideoDetailList from './screens/Video/VideoDetailList';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const rootStack = createNativeStackNavigator();
const AppComponent = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [token, setToken] = useState(null);

const AppComponent = () => {
  const [isSignIn, setIsSignIn] = useState(false);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchToken = async () => {
      const tokenValue = await AsyncStorage.getItem('token');
      const user = await AsyncStorage.getItem('user');
      if (tokenValue) {
        setToken(tokenValue);
      }
      if (user) {
        setUser(JSON.parse(user));
      }
    };
    fetchToken();
  }, [token]);

  const HomeTab = () => {
    return (
      <>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </Stack.Navigator>
      </>
    );
  };
  const FriendTab = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="FriendScreen" component={FriendScreen} />
      </Stack.Navigator>
    );
  };
  const VideoTab = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="VideoScreen" component={VideoScreen} />
      </Stack.Navigator>
    );
  };
  const NotificationTab = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="NotificationScreen"
          component={NotificationScreen}
        />
      </Stack.Navigator>
    );
  };
  const SettingTab = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SettingScreen" component={SettingScreen} />
      </Stack.Navigator>
    );
  };

  const MainTab = ({ navigation }) => {
    return (
      <>
        <Header navigation={navigation}></Header>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
            tabBarShowIcon: true,
            tabBarPressColor: '#fff',
          }}
        >
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => (
                <Entypo
                  name="home"
                  size={27}
                  style={{ width: 28, height: 28, alignSelf: 'center' }}
                  color={focused ? BLUE_COLOR : GREY_COLOR}
                />
              ),
            }}
            name="Home"
            component={HomeTab}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => (
                <FontAwesome5
                  name="user-friends"
                  size={25}
                  style={{ width: 32, height: 32, alignSelf: 'center' }}
                  color={focused ? BLUE_COLOR : GREY_COLOR}
                />
              ),
            }}
            name="Friend"
            component={FriendTab}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => (
                <MaterialIcons
                  name="ondemand-video"
                  size={28}
                  style={{ width: 28, height: 28, alignSelf: 'center' }}
                  color={focused ? BLUE_COLOR : GREY_COLOR}
                />
              ),
            }}
            name="Video"
            component={VideoTab}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  name="md-notifications"
                  size={27}
                  style={{ width: 27, height: 27, alignSelf: 'center' }}
                  color={focused ? BLUE_COLOR : GREY_COLOR}
                />
              ),
            }}
            name="Notification"
            component={NotificationTab}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ focused }) => (
                <Octicons
                  name="three-bars"
                  size={27}
                  style={{ width: 27, height: 27, alignSelf: 'center' }}
                  color={focused ? BLUE_COLOR : GREY_COLOR}
                />
              ),
            }}
            name="Setting"
            component={SettingTab}
          />
        </Tab.Navigator>
      </>
    );
  };
  const notice = useSelector((state) => state.notice);

  return (
    <View
      style={{
        height: '100%',
        paddingTop: STATUSBAR_HEIGHT,
      }}
    >
      {notice.show
        ? Alert.alert('', `${notice.notice}`, [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ])
        : null}
      <NavigationContainer>
        <rootStack.Navigator screenOptions={{ headerShown: false }}>
          {!token ? (
            <>
              <rootStack.Screen name="LoginScreen" component={LoginScreen} />
              <rootStack.Screen name="MainTab" component={MainTab} />
            </>
          ) : (
            <>
              <rootStack.Screen name="MainTab" component={MainTab} />
              <rootStack.Screen name="LoginScreen" component={LoginScreen} />
            </>
          )}
          <rootStack.Screen
            name="NextLoginScreen"
            component={NextLoginScreen}
          />
          <rootStack.Screen
            name="FirstLoginScreen"
            component={FirstLoginScreen}
          />

          <rootStack.Screen name="BeginSignup" component={BeginSignUp} />
          <rootStack.Screen name="SignupScreen" component={SignupScreen} />
          <rootStack.Screen name="CheckVerify" component={CheckVerify} />
          <rootStack.Screen
            name="ChangeInfoAfterSignup"
            component={ChangeInfoAfterSignup}
          />

          <rootStack.Screen
            name="PostDetailScreen"
            component={PostDetailScreen}
          />
          <rootStack.Screen
            name="PostImageScreen"
            component={PostImageScreen}
          />
          <rootStack.Screen
            name="PostCommentScreen"
            component={PostCommentScreen}
          />
          <rootStack.Screen name="EditPostScreen" component={EditPostScreen} />
          <rootStack.Screen name="AllFriend" component={AllFriend} />
          <rootStack.Screen name="SuggestFriend" component={SuggestFriend} />
          <rootStack.Screen name="SearchScreen" component={SearchScreen} />
          <rootStack.Screen name="SearchHistory" component={SearchHistory} />
          <rootStack.Screen name="ProfileScreen" component={ProfileScreen} />
          <rootStack.Screen name="ProfileSetting" component={ProfileSetting} />
          <rootStack.Screen name="ShowCoverImage" component={ShowCoverImage} />
          <rootStack.Screen name="EditPublicInfo" component={EditPublicInfo} />
          <rootStack.Screen name="AddPostScreen" component={AddPostScreen} />
          <rootStack.Screen name="VideoScreen" component={VideoScreen} />
          <rootStack.Screen
            name="VideoDetailList"
            component={VideoDetailList}
          />
        </rootStack.Navigator>
      </NavigationContainer>

      <StatusBar style="dark" />
    </View>
  );
};
export default App = () => {
  return (
    <Provider store={store}>
      <AppComponent />
    </Provider>
  );
};