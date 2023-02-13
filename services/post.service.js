import axiosClient from "./axiosClient";
import axiosFile from "./axiosFile";

const getListPost = ({last_id, index, count, token}) => {
  const url = `/post/get_list_posts?last_id=${last_id}&index=${index}&count=${count}&token=${token}`;
  return axiosClient.post(url, {});
}

const getPostById = ({ postId, token }) => {
  const url = `/post/get_post?id=${postId}&token=${token}`;
  return axiosClient.post(url, {});
}

const addPost = ({ token, described, status, formData }) => {
  let query='';
  if (described) {
    query = query.concat(`&described=${described}`);
  }
  if (status) {
    query = query.concat(`&status=${status}`);
  }
  const url = `/post/add_post?token=${token}${query}`;
  return axiosFile.post(url, {formData});
}

export {
  getListPost,
  getPostById,
  addPost,
}