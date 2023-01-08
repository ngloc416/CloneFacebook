const Auth = {
  signup: 'auth/signup',
  get_verify_code: 'auth/get_verify_code',
  check_verify_code: 'auth/check_verify_code',
  login: 'auth/login',
  change_password: 'auth/change_password',
  logout: 'auth/logout',
  set_devtoken: 'auth/set_devtoken',
  change_info_after_signup: 'auth/change_info_after_signup',
  check_new_version: 'auth/check_new_version'
};
const Posts = {
  create: "posts/add_posts",
  list: "posts/list",
  delete: "posts/delete",
  like: 'postLike/action'
};

export default {
  Auth,
  Posts
};
