import axiosClient from "./axiosClient";

const getListPost = ({last_id, index, count}) => {
  const url = `/post/get_list_posts?last_id=${last_id}&index=${index}&count=${count}`;
  return axiosClient.post(url, {});
}

export {
  getListPost,
}