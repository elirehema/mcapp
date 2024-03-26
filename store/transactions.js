const state = () => ({
    transactiontypes: null
  })
  
  const mutations = {
    'GET_TRANSACTION_TYPES' (state) {
      state.showLoader = true
    },
    'GET_TRANSACTION_TYPES_FAILED' (state) {
      state.showLoader = false
    },
    'GET_TRANSACTION_TYPES_ERROR' (state) {
      state.showLoader = false
    },
    'GET_TRANSACTION_TYPES_SUCCESS' (state, payload) {
      state.showLoader = false
      state.transactiontypes = payload
    }
  }
  
  const actions = {
    async _fetchtransactiontypes ({ commit }) {
      commit('GET_TRANSACTION_TYPES')
      await this.$api
        .$get('/transactions/types')
        .then((response) => {
          commit('GET_TRANSACTION_TYPES_SUCCESS', response)
        })
        .catch(() => {
          commit('GET_TRANSACTION_TYPES_ERROR')
        })
    }
  }
  
  const getters = {
    transactiontypes: (state) => {
      return state.transactiontypes
    }
  }
  
  export default {
    namespaced: false,
    state,
    mutations,
    actions,
    getters
  }
  