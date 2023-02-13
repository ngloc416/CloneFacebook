import axiosClient from "./axiosClient";
import axiosFile from './axiosFile';

const login = ({phone, password}) => {
  const url = `/auth/login?phonenumber=${phone}&password=${password}`;
  return axiosClient.post(url, {});
}

const logout = (token) => {
  const url = `/auth/logout?token=${token}`;
  return axiosClient.post(url, {});
}

const signUp = ({phone, passWord}) => {
  const url = `/auth/signup?phonenumber=${phone}&password=${passWord}`;
  return axiosClient.post(url, {});
}

const getVerifyCode = ({phone}) => {
  const url = `/auth/get_verify_code?phonenumber=${phone}`;
  return axiosClient.post(url, {});
}

const checkVerifyCode = ({phone, codeVerify}) => {
  const url = `/auth/check_verify_code?phonenumber=${phone}&code_verify=${codeVerify}`;
  return axiosClient.post(url, {});
}

const changeUserInfoAfterSignUp = ({token, userName, formData}) => {
  const url = `/auth/change_info_after_signup?token=${token}&username=${userName}`;
  return axiosFile.post(url, formData);
}

export {
  login,
  logout,
  signUp,
  getVerifyCode,
  checkVerifyCode,
  changeUserInfoAfterSignUp,
}