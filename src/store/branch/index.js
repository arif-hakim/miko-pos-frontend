import axios from '@axios'

export default {
  namespaced: true,
  state: {
    activeBranch: null,
    branch: null,
    branches: [],
    isLoading: false,
  },
  mutations: {
    setBranch: (state, payload) => state.branch = payload,
    setBranches: (state, payload) => state.branches = payload,
    setActiveBranch: (state, payload) => state.activeBranch = payload,
    setIsLoading: (state, payload) => state.isLoading = payload,
  },
  actions: {
    fetchBranches: async ({ commit, dispatch }, payload) => {
      const [response, error] = await axios.get('/branch', payload)
      if(response) commit('setBranches', response.data)
      return [response, error]
    },
    fetchBranchByID: async ({ commit, dispatch }, id) => {
      const [response, error] = await axios.get(`/branch/${id}`)
      if(response) commit('setBranch', response.data)
      return [response, error]
    },
    createBranch: async ({ commit, dispatch, rootState }, payload) => {
      const currentUser = rootState.user.currentUser
      payload.company_id = currentUser.company_id
      const [response, error] = await axios.post('/branch', payload)
      if (response) await dispatch('user/loginByToken', null, { root: true })
      return [response, error]
    },
    updateBranch: async ({ commit, dispatch }, payload) => {
      const { id } = payload
      const [response, error] = await axios.put(`/branch/${id}`, payload)
      if (response) dispatch('fetchBranchByID', id)
      return [response, error]
    },
    deleteBranch: async ({ commit, dispatch }, id) => {
      const [response, error] = await axios.delete(`/branch/${id}`)
      return [response, error]
    },
    setActiveBranch: async ({ commit, dispatch }, payload) => {
      commit('setActiveBranch', payload)
    }
  },
}
