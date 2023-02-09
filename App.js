import React, { useState } from 'react';
import { useSelector, Provider } from "react-redux";
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

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const rootStack = createNativeStackNavigator();
const AppComponent = () => {
  const [isHomeFocused, setIsHomeFocused] = useState(false);

  const HomeTab = () => {
    setIsHomeFocused(useIsFocused());
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
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
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    );
  };
  const NotificationTab = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    );
  };
  const SettingTab = () => {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    );
  };

  const MainTab = () => {
    return (
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarShowIcon: true,
          tabBarPressColor: '#fff',
        }}
        style={{ shadowOffset: 0 }}
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
    );
  };
  const notice = useSelector(state => state.notice);

  return (
      <View style={{ height: '100%' }}>
        {
          (notice.show) ? <Notice type={notice.type} notice={notice.notice}/> : null
        }
        <View style={{ height: STATUSBAR_HEIGHT }}></View>
        {isHomeFocused ? <Header></Header> : null}

        <NavigationContainer>
          <rootStack.Navigator screenOptions={{ headerShown: false }}>
            <rootStack.Screen name="LoginScreen" component={LoginScreen} />
            <rootStack.Screen
              name="NextLoginScreen"
              component={NextLoginScreen}
            />
            <rootStack.Screen
              name="FirstLoginScreen"
              component={FirstLoginScreen}
            />
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
            <rootStack.Screen name="SuggestFriend" component={SuggestFriend} />
          </rootStack.Navigator>
        </NavigationContainer>
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
