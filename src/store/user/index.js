import axios from '@axios'

export default {
  namespaced: true,
  state: {
    currentUser: null,
    user: null,
    users: null,
    authorized: false,
    ability: [],
    isLoading: false,
  },
  getters: {
    getUser: (state) => state.user,
    getUsers: (state) => state.users,
    getCurrentUser: (state) => state.currentUser,
    getAuthorized: (state) => state.authorized,
  },
  mutations: {
    setUser: (state, payload) => state.user = payload,
    setUsers: (state, payload) => state.users = payload,
    setCurrentUser: (state, payload) => state.currentUser = payload,
    setAuthorized: (state, payload) => state.authorized = payload,
    setAbility: (state, payload) => state.ability = payload,
    setIsLoading: (state, payload) => state.isLoading = payload
  },
  actions: {
    setCurrentUser: ({ commit }, payload) => {
      const { user, token } = payload
      const ability = [
        {
          action: 'manage',
          subject: 'all',
        },
      ]

      const userData = {
        ...user,
        ability,
      }

      localStorage.setItem('accessToken', token)
      localStorage.setItem('refreshToken', token)
      localStorage.setItem('userData', JSON.stringify(userData))
      commit('setCurrentUser', userData)
      commit('setAuthorized', true)
      commit('setAbility', ability)
      return userData
    },
    login: async ({ commit, dispatch }, payload) => {
      commit('setIsLoading', true)
      const [response, error] = await axios.post('/login', payload)
      if(response) dispatch('setCurrentUser', response.data)
      commit('setIsLoading', false)
      return [response, error]
    },
    loginByToken: async ({ commit, dispatch }) => {
      const [response, error] = await axios.post('/login/token')
      if (response) dispatch('setCurrentUser', response.data)
      if (error) localStorage.clear() 
      return [response, error]
    },
    register: async({ commit, dispatch }, payload) => {
      commit('setIsLoading', true)
      const [response, error] = await axios.post('/register', payload)
      if (response) dispatch('setCurrentUser', response.data)
      commit('setIsLoading', false)
      return [response, error]
    }
  },
}
