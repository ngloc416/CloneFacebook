import axiosClient from "./axiosClient";

const likePost = ({postId, token}) => {
  const url = `/like/like?id=${postId}&token=${token}`;
  return axiosClient.post(url, {});
}

export {
  likePost,
}