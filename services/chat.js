import axiosClient from "./axiosClient";

const getListChat = ({token, index, count}) => {
  const url = `/chat/get_list_conversation?token=${token}&&index=${index}&count=${count}`;
  return axiosClient.post(url, {});
}

const getComment = ({postId, token, index, count}) => {
  const url = `/comment/get_comment?token=${token}&id=${postId}&index=${index}&count=${count}`;
  return axiosClient.post(url, {});
}

export {
  getListChat,
}