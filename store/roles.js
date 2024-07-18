const state = () => ({
    showLoader: Boolean,
    roles: null
  })
  
  const mutations = {
    ['GET_ROLES'] () {
      state.showLoader = true
    },
    ['GET_ROLES_SUCCESS'] (state, payload) {
      state.showLoader = false
      state.roles = payload
    },
    ['GET_ROLES_ERROR'] (state) {
      state.showLoader = false
    }
  }
  const actions = {
    async _fetchroles ({ commit }) {
      commit('GET_ROLES')
      await this.$api.$get('/roles')
        .then((response) => {
          commit('GET_ROLES_SUCCESS', response)
        }).catch((err) => {
          commit('GET_ROLES_ERROR', err)
        })
    },
  
    async _createrole({ dispatch }, payload) {
        await this.$api.$post('/roles', payload)
          .then((response) => {
            dispatch("_fetchroles", null, { root: true });
          }).catch((err) => {
          })
      },
    async _updaterole ({ dispatch }, payload) {
      await this.$api.$put(`/roles/${payload.id}`, payload)
        .then((response) => {
          dispatch("_fetchroles", null, { root: true });
        }).catch((err) => {
        })
    },
    async _activaterole ({ dispatch }, payload) {
        await this.$api.$put(`/roles/activate`, payload)
          .then((response) => {
            dispatch("_fetchroles", null, { root: true });
          }).catch((err) => {
          })
      },
      async _addpermissions ({ dispatch }, payload) {
        await this.$api.$post(`/roles/${payload.id}/permissions`, payload.data)
          .then((response) => {
            dispatch("_fetchroles", null, { root: true });
          }).catch((err) => {
          })
      },
      async _removepermission ({ dispatch }, payload) {
        await this.$api.$delete(`/roles/${payload.id}/${payload.data}`)
          .then((response) => {
            dispatch("_fetchroles", null, { root: true });
          }).catch((err) => {
          })
      },
  }
  
  const getters = {
    roles: (state) => { return state.roles }
  
  }
  
  export default {
    namespaced: false,
    state,
    mutations,
    actions,
    getters
  }
  