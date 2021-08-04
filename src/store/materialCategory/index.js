import axios from '@axios'

export default {
  namespaced: true,
  state: {
    materialCategory: null,
    materialCategories: [],
    activeMaterialCategory: null,
    isLoading: false,
  },
  mutations: {
    setIsLoading: (state, payload) => state.isLoading = payload,
    setMaterialCategory: (state, payload) => state.materialCategory = payload,
    setMaterialCategories: (state, payload) => state.materialCategories = payload,
    setActiveMaterialCategory: (state, payload) => state.activeMaterialCategory = payload
  },
  actions: {
    fetchMaterialCategories: async ({ commit, dispatch, rootState }, payload = { unit_id: null }) => {
      commit('setIsLoading', true)

      if (!payload.unit_id) payload.unit_id = rootState.unit.activeUnit.id
      const [response, error] = await axios.get('material-category', { params: { ...payload }})
      if(response) commit('setMaterialCategories', response.data)
      
      commit('setIsLoading', false)
      return [response, error]
    },
    fetchMaterialCategoryByID: async ({ commit, dispatch }, id) => {
      commit('setIsLoading', true)
      
      const [response, error] = await axios.get(`material-category/${id}`)
      if(response) commit('setMaterialCategory', response.data)
      
      commit('setIsLoading', false)
      return [response, error]
    },
    createMaterialCategory: async ({ commit, dispatch, rootState }, payload) => {
      commit('setIsLoading', true)
      
      const currentUser = rootState.user.currentUser
      payload.company_id = currentUser.company_id
      const [response, error] = await axios.post('material-category', payload)
      if (response) await dispatch('user/loginByToken', null, { root: true })
      
      commit('setIsLoading', false)
      return [response, error]
    },
    updateMaterialCategory: async ({ commit, dispatch }, payload) => {
      commit('setIsLoading', true)
      
      const { id } = payload
      const [response, error] = await axios.put(`material-category/${id}`, payload)
      if (response) dispatch('fetchMaterialCategoryByID', id)
      
      commit('setIsLoading', false)
      return [response, error]
    },
    deleteMaterialCategory: async ({ commit, dispatch }, id) => {
      commit('setIsLoading', true)
      
      const [response, error] = await axios.delete(`material-category/${id}`)
      await dispatch('fetchMaterialCategories')
      
      commit('setIsLoading', false)
      return [response, error]
    },
    setActiveMaterialCategory: async ({ commit, dispatch }, payload) => {
      commit('setActiveMaterialCategory', payload)
    }
  },
}
