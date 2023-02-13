let initialState = {
  isLogin: false,
};

const auth = ( state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isLogin: true,
      };
    case 'LOGOUT':
      return {
        isLogin: false,
      };
    default:
      return state;
  }
}

export default auth;