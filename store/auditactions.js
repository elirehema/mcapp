const state = () => ({
    auditevents: null
  })
  
  const mutations = {
    'GET_AUDIT_EVENTS' (state) {
      state.showLoader = true
    },
    'GET_AUDIT_EVENTS_FAILED' (state) {
      state.showLoader = false
    },
    'GET_AUDIT_EVENTS_ERROR' (state) {
      state.showLoader = false
    },
    'GET_AUDIT_EVENTS_SUCCESS' (state, payload) {
      state.showLoader = false
      state.auditevents = payload
    }
  }
  
  const actions = {
    async _fetchauditevents ({ commit }) {
      commit('GET_AUDIT_EVENTS')
      await this.$api
        .$get('settings/auditevents')
        .then((response) => {
          commit('GET_AUDIT_EVENTS_SUCCESS', response)
        })
        .catch(() => {
          commit('GET_AUDIT_EVENTS_ERROR')
        })
    }
  }
  
  const getters = {
    auditevents: (state) => {
      return state.auditevents
    }
  }
  
  export default {
    namespaced: false,
    state,
    mutations,
    actions,
    getters
  }
  