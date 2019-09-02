import * as dd from 'dingtalk-jsapi';
import { Toast } from 'mint-ui';

const state = {
    userCode: '',
    userInfo: {}
}

const mutations = {
    SET_USER_CODE: (state, code) => {
        state.userCode = code
    },
    SET_USER_INFO: (state, userInfo) => {
        state.userInfo = userInfo
    }
}

const actions = {
    // 从钉钉获取code
    fetchCode({ commit }) {
        return new Promise((resolve, reject) => {
            if (dd.version) {
                dd.ready(() => {
                    dd.runtime.permission.requestAuthCode({
                        corpId: "ding987bfd433a256d77", // 企业id
                        onSuccess: (info) => {
                            commit('SET_USER_CODE', info.code) // 通过该免登授权码可以获取用户身份
                            resolve()
                        },
                        onFail: function (err) {
                            reject(err)
                        }
                    });
                })
            }else {
                reject()
            }
            
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
