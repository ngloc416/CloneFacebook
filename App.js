import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useSelector, Provider } from "react-redux";
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
import { View } from 'react-native';
import {
  BLUE_COLOR,
  GREY_COLOR,
  STATUSBAR_HEIGHT,
} from './constants/constants';

import FirstLoginScreen from './screens/Login/FirstLoginScreen';
import LoginScreen from './screens/Login/LoginScreen';
import NextLoginScreen from './screens/Login/NextLoginScreen';

import HomeScreen from './screens/Home/HomeScreen';
import Header from './screens/Home/Header';

import PostDetailScreen from './screens/Post/PostDetailScreen';
import PostImageScreen from './screens/Post/PostImageScreen';
import PostCommentScreen from './screens/Post/PostCommentScreen';

import AllFriend from './screens/Friend/AllFriend';
import FriendScreen from './screens/Friend/FriendScreen';
import SuggestFriend from './screens/Friend/SuggestFriend';
import Notice from './components/Notice';
import store from './redux/store';

import SearchScreen from './screens/Search/SearchScreen';
import SearchHistory from './screens/Search/SearchHistory';

import ProfileScreen from './screens/Profile/ProfileScreen';
import ProfileSetting from './screens/Profile/ProfileSetting';

import SettingScreen from './screens/Setting/SettingScreen';

import AddPostScreen from './screens/AddPost.js/AddPostScreen';

import NotificationScreen from './screens/Notification/NotificationScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const rootStack = createNativeStackNavigator();

const AppComponent = () => {
  const [isSignIn, setIsSignIn] = useState(false);

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
        <Stack.Screen name="VideoScreen" component={ProfileScreen} />
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
  const notice = useSelector(state => state.notice);
  const token = AsyncStorage.getItem('token');

  return (
    <View
      style={{
        height: '100%',
        paddingTop: STATUSBAR_HEIGHT,
      }}
    >
      {
          (notice.show) ? <Notice type={notice.type} notice={notice.notice}/> : null
        }
      <NavigationContainer>
        <rootStack.Navigator screenOptions={{ headerShown: false }}>
          {!token ? (
            <>
              <rootStack.Screen name="LoginScreen" component={LoginScreen} />
              <rootStack.Screen
                name="NextLoginScreen"
                component={NextLoginScreen}
              />
              <rootStack.Screen
                name="FirstLoginScreen"
                component={FirstLoginScreen}
              />
            </>
          ) : (
            <>
              <rootStack.Screen name="MainTab" component={MainTab} />
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
              <rootStack.Screen name="AllFriend" component={AllFriend} />
              <rootStack.Screen
                name="SuggestFriend"
                component={SuggestFriend}
              />
              <rootStack.Screen name="SearchScreen" component={SearchScreen} />
              <rootStack.Screen
                name="SearchHistory"
                component={SearchHistory}
              />
              <rootStack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
              />
              <rootStack.Screen
                name="ProfileSetting"
                component={ProfileSetting}
              />
              <rootStack.Screen
                name="AddPostScreen"
                component={AddPostScreen}
              />
            </>
          )}
        </rootStack.Navigator>
      </NavigationContainer>

      <StatusBar style="dark" />
    </View>
 );
}

export default App = () => {
  return(
    <Provider store={store}>
      <AppComponent />
    </Provider>
  )
}