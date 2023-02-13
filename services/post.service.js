import axiosClient from "./axiosClient";

const getListPost = ({last_id, index, count, token}) => {
  const url = `/post/get_list_posts?last_id=${last_id}&index=${index}&count=${count}&token=${token}`;
  return axiosClient.post(url, {});
}

const getPostById = ({ postId, token }) => {
  const url = `/post/get_post?id=${postId}&token=${token}`;
  return axiosClient.post(url, {});
}

export {
  getListPost,
  getPostById,
}