import axiosClient from "./axiosClient";

const login = ({phone, password}) => {
  const url = `/auth/login?phonenumber=${phone}&password=${password}`;
  return axiosClient.post(url, {});
}

export {
  login,
}