import axiosClient from "./axiosClient";

const getRequestFriendList = ({index, count, token}) => {
  const url = `/friend/get_requested_friends?index=${index}&count=${count}&token=${token}`;
  return axiosClient.post(url, {});
}

const setAcceptFriend = ({userId, isAccept, token}) => {
  const url = `/friend/set_accept_friend?user_id=${userId}&is_accept=${isAccept}&token=${token}`;
  return axiosClient.post(url, {token, user_id: userId, is_accept: isAccept});
}

const getUserListFriend = ({userId, index, count, token}) => {
  const url = `/friend/get_user_friends?user_id=${userId}&index=${index}&count=${count}&token=${token}`;
  return axiosClient.post(url, {token, user_id: userId, index, count });
}

const getSuggestedFriendList = ({index, count, token}) => {
  const url = `/friend/get_list_suggested_friends?&index=${index}&count=${count}&token=${token}`;
  return axiosClient.post(url, {token, index, count });
}

export {
  getRequestFriendList,
  setAcceptFriend,
  getUserListFriend,
  getSuggestedFriendList,
}