export const openNotice = ({notice, typeNotice}) => {
  return {
    type: 'OPEN_WARNING',
    notice,
    typeNotice,
  }
}

export const closeNotice = () => {
  return {
    type: 'CLOSE_WARNING',
  }
}