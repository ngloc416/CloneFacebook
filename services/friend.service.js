import axiosClient from "./axiosClient";

const getRequestFriendList = ({index, count, token}) => {
  const url = `/friend/get_requested_friends?index=${index}&count=${count}&token=${token}`;
  return axiosClient.post(url, {});
}

export {
  getRequestFriendList,
}