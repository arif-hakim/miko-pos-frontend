import axios from '@axios'

export default {
  namespaced: true,
  state: {
    company: null,
    companies: [],
  },
  mutations: {
    setCompany: (state, payload) => state.company = payload,
    setCompanies: (state, payload) => state.companies = payload,
  },
  actions: {
    fetchCompany: async ({ commit, dispatch }) => {
      const [response, error] = await axios.get(`/company`)
      if(response) commit('setCompany', response.data)
      return [response, error]
    },
    createCompany: async ({ commit, dispatch, rootState }, payload) => {
      const currentUser = rootState.user.currentUser
      payload.user_id = currentUser.id
      
      const [response, error] = await axios.post('/company', payload)
      if (response) await dispatch('user/loginByToken', null, { root: true })
      return [response, error]
    },
    updateCompany: async ({ commit, dispatch }, payload) => {
      const { id } = payload
      const [response, error] = await axios.put(`/company/${id}`, payload)
      if (response) dispatch('fetchCompanyByID', id)
      return [response, error]
    },
    deleteCompany: async ({ commit, dispatch }, id) => {
      const [response, error] = await axios.delete(`/company/${id}`)
      return [response, error]
    },
  },
}
