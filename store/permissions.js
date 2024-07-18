const state = () => ({
    showLoader: Boolean,
    permissions: null
  })
  
  const mutations = {
    ['GET_PERMISSIONS'] () {
      state.showLoader = true
    },
    ['GET_PERMISSIONS_SUCCESS'] (state, payload) {
      state.showLoader = false
      state.permissions = payload
    },
    ['GET_PERMISSIONS_ERROR'] (state) {
      state.showLoader = false
    }
  }
  const actions = {
    async _fetchpermissions ({ commit }) {
      commit('GET_PERMISSIONS')
      await this.$api.$get('/permissions')
        .then((response) => {
          commit('GET_PERMISSIONS_SUCCESS', response)
        }).catch((err) => {
          commit('GET_PERMISSIONS_ERROR', err)
        })
    },
 

  }
  
  const getters = {
    permissions: (state) => { return state.permissions }
  
  }
  
  export default {
    namespaced: false,
    state,
    mutations,
    actions,
    getters
  }
  