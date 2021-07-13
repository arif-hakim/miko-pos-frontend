import axios from '@axios'

export default {
  namespaced: true,
  state: {
    unit: null,
    units: [],
    activeUnit: null,
  },
  mutations: {
    setUnit: (state, payload) => state.unit = payload,
    setUnits: (state, payload) => state.units = payload,
    setActiveUnit: (state, payload) => state.activeUnit = payload
  },
  actions: {
    fetchUnits: async ({ commit, dispatch }, payload) => {
      const [response, error] = await axios.get('/unit', payload)
      if(response) commit('setUnits', response.data)
      return [response, error]
    },
    fetchUnitByID: async ({ commit, dispatch }, id) => {
      const [response, error] = await axios.get(`/unit/${id}`)
      if(response) commit('setUnit', response.data)
      return [response, error]
    },
    createUnit: async ({ commit, dispatch, rootState }, payload) => {
      const currentUser = rootState.user.currentUser
      payload.company_id = currentUser.company_id
      const [response, error] = await axios.post('/unit', payload)
      if (response) await dispatch('user/loginByToken', null, { root: true })
      return [response, error]
    },
    updateUnit: async ({ commit, dispatch }, payload) => {
      const { id } = payload
      const [response, error] = await axios.put(`/unit/${id}`, payload)
      if (response) dispatch('fetchUnitByID', id)
      return [response, error]
    },
    deleteUnit: async ({ commit, dispatch }, id) => {
      const [response, error] = await axios.delete(`/unit/${id}`)
      return [response, error]
    },
    setActiveUnit: async ({ commit, dispatch }, payload) => {
      commit('setActiveUnit', payload)
    }
  },
}
