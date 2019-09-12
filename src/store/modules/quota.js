const state = {
  quotaOne: {},
  quotaTwo: {},
  isSelect: false
}

const mutations = {
  SELECT_QUOTA(state, payLoad) {
    state.quotaOne = payLoad.quotaOne
    state.quotaTwo = payLoad.quotaTwo
    state.isSelect = true
  },
  TOGGLE_STATUS(state) {
    state.isSelect = !state.isSelect
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}