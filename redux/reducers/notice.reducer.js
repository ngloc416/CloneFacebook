const initialState = {
  notice: '',
  show: false,
  typeNotice: 'warning',
}

const notice = ( state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_WARNING':
      return {
        notice: action.notice,
        show: true,
        typeNotice: action.typeNotice,
      };
    case 'CLOSE_WARNING':
      return {
        notice: '',
        show: false,
        typeNotice: 'warning',
      };
    default:
      return state;
  }
}

export default notice;