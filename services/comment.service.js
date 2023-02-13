import axiosClient from "./axiosClient";

const setComment = ({postId, token, commentText, index, count}) => {
  const url = `/comment/set_comment?token=${token}&id=${postId}&comment=${commentText}&index=${index}&count=${count}`;
  return axiosClient.post(url, {});
}

const getComment = ({postId, token, index, count}) => {
  const url = `/comment/get_comment?token=${token}&id=${postId}&index=${index}&count=${count}`;
  return axiosClient.post(url, {});
}

export {
  setComment,
  getComment,
}