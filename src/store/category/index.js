import axios from '@axios'

export default {
  namespaced: true,
  state: {
    category: null,
    categories: [],
    activeCategory: null,
    isLoading: false,
  },
  mutations: {
    setIsLoading: (state, payload) => state.isLoading = payload,
    setCategory: (state, payload) => state.category = payload,
    setCategories: (state, payload) => state.categories = payload,
    setActiveCategory: (state, payload) => state.activeCategory = payload
  },
  actions: {
    fetchCategories: async ({ commit, dispatch, rootState }, payload = { unit_id: null }) => {
      commit('setIsLoading', true)

      if (!payload.unit_id) payload.unit_id = rootState.unit.activeUnit.id
      const [response, error] = await axios.get('/category', { params: { ...payload }})
      if(response) commit('setCategories', response.data)
      
      commit('setIsLoading', false)
      return [response, error]
    },
    fetchCategoryByID: async ({ commit, dispatch }, id) => {
      commit('setIsLoading', true)
      
      const [response, error] = await axios.get(`/category/${id}`)
      if(response) commit('setCategory', response.data)
      
      commit('setIsLoading', false)
      return [response, error]
    },
    createCategory: async ({ commit, dispatch, rootState }, payload) => {
      commit('setIsLoading', true)
      
      const currentUser = rootState.user.currentUser
      payload.company_id = currentUser.company_id
      const [response, error] = await axios.post('/category', payload)
      if (response) await dispatch('user/loginByToken', null, { root: true })
      
      commit('setIsLoading', false)
      return [response, error]
    },
    updateCategory: async ({ commit, dispatch }, payload) => {
      commit('setIsLoading', true)
      
      const { id } = payload
      const [response, error] = await axios.put(`/category/${id}`, payload)
      if (response) dispatch('fetchCategoryByID', id)
      
      commit('setIsLoading', false)
      return [response, error]
    },
    deleteCategory: async ({ commit, dispatch }, id) => {
      commit('setIsLoading', true)
      
      const [response, error] = await axios.delete(`/category/${id}`)
      await dispatch('fetchCategories')
      
      commit('setIsLoading', false)
      return [response, error]
    },
    setActiveCategory: async ({ commit, dispatch }, payload) => {
      commit('setActiveCategory', payload)
    }
  },
}
