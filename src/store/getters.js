const getters = {
  userCode: state => state.user.userCode,
  userInfo: state => state.user.userInfo,
  quotaOne: state => state.quota.quotaOne,
  quotaTwo: state => state.quota.quotaTwo,
  isSelect: state => state.quota.isSelect,
}
export default getters
