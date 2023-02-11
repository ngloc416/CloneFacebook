import axiosClient from "./axiosClient";

const getUserInfo = ({userId, token}) => {
  const url = `/user/get_user_info?token=${token}&user_id=${userId}`;
  return axiosClient.post(url, {});
}

export {
  getUserInfo,
}