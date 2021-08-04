import axios from '@axios'

export default {
  namespaced: true,
  state: {
    unit: null,
    units: [],
    activeUnit: null,
    isLoading: false,
  },
  mutations: {
    setUnit: (state, payload) => state.unit = payload,
    setUnits: (state, payload) => state.units = payload,
    setActiveUnit: (state, payload) => {
      state.activeUnit = payload
      localStorage.setItem('activeUnit', JSON.stringify(payload))
    },
    setIsLoading: (state, payload) => state.isLoading = payload,
  },
  actions: {
    fetchUnits: async ({ commit, dispatch }, payload = { branch_id: null }) => {
      commit('setIsLoading', true)
      const [response, error] = await axios.get('/unit', {
        params: { ...payload }
      })
      if(response) commit('setUnits', response.data)
      commit('setIsLoading', false)
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
    updateTax: async ({ commit, dispatch }, payload) => {
      const { id } = payload
      const [response, error] = await axios.put(`/unit/${id}/update-tax`, payload)
      if (response) dispatch('fetchUnitByID', id)
      return [response, error]
    },
    deleteUnit: async ({ commit, dispatch }, id) => {
      const [response, error] = await axios.delete(`/unit/${id}`)
      if (response) dispatch('fetchUnits')
      return [response, error]
    },
    setActiveUnit: async ({ commit, dispatch }, payload) => {
      commit('setActiveUnit', payload)
    },
    downloadQRCode: async ({ commit, dispatch }, id) => {
      const [response, error] = await axios.get(`/unit/${id}/download-qrcode`, { responseType: 'blob' })
      return [response, error]
    },
    generateQRCode: async ({ commit, dispatch }, id) => {
      const [response, error] = await axios.get(`/unit/${id}/generate-qrcode`)
      return [response, error]
    },

    // Make Order API
    // with postfix make-order in base url, become : /make-order/unit
    fetchUnitByOrderToken: async ({ commit, dispatch }, payload) => {
      const [response, error] = await axios.get(`/unit`)
      if(response) commit('setActiveUnit', response.data)
      return [response, error]
    }
  },
}
