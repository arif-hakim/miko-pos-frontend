import axios from '@axios'

export default {
  namespaced: true,
  state: {
    conversion: null,
    conversions: [],
    activeConversion: null,
    isLoading: false,
  },
  mutations: {
    setIsLoading: (state, payload) => state.isLoading = payload,
    setConversion: (state, payload) => state.conversion = payload,
    setConversions: (state, payload) => state.conversions = payload,
    setActiveConversion: (state, payload) => state.activeConversion = payload
  },
  actions: {
    fetchConversions: async ({ commit, dispatch, rootState }, payload = { unit_id: null }) => {
      commit('setIsLoading', true)

      if (!payload.unit_id) payload.unit_id = rootState.unit.activeUnit.id
      const [response, error] = await axios.get('conversion', { params: { ...payload }})
      if(response) commit('setConversions', response.data)
      
      commit('setIsLoading', false)
      return [response, error]
    },
    fetchConversionByID: async ({ commit, dispatch }, id) => {
      commit('setIsLoading', true)
      
      const [response, error] = await axios.get(`conversion/${id}`)
      if(response) commit('setConversion', response.data)
      
      commit('setIsLoading', false)
      return [response, error]
    },
    createConversion: async ({ commit, dispatch, rootState }, payload) => {
      commit('setIsLoading', true)
      
      const currentUser = rootState.user.currentUser
      payload.company_id = currentUser.company_id
      const [response, error] = await axios.post('conversion', payload)
      if (response) await dispatch('user/loginByToken', null, { root: true })
      
      commit('setIsLoading', false)
      return [response, error]
    },
    updateConversion: async ({ commit, dispatch }, payload) => {
      commit('setIsLoading', true)
      
      const { id } = payload
      const [response, error] = await axios.put(`conversion/${id}`, payload)
      if (response) dispatch('fetchConversionByID', id)
      
      commit('setIsLoading', false)
      return [response, error]
    },
    deleteConversion: async ({ commit, dispatch }, id) => {
      commit('setIsLoading', true)
      
      const [response, error] = await axios.delete(`conversion/${id}`)
      await dispatch('fetchConversions')
      
      commit('setIsLoading', false)
      return [response, error]
    },
    setActiveConversion: async ({ commit, dispatch }, payload) => {
      commit('setActiveConversion', payload)
    }
  },
}
