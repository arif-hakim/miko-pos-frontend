import axios from '@axios'

export default {
  namespaced: true,
  state: {
    transaction: null,
    transactions: [],
    isLoading: false,
  },
  mutations: {
    setTransaction: (state, payload) => state.transaction = payload,
    setTransactions: (state, payload) => state.transactions = payload,
    setIsLoading: (state, payload) => state.isLoading = payload,
    setTransactionStockHistories: (state, payload) => state.transactionStockHistories = payload,
  },
  actions: {
    fetchTransactions: async ({ commit, dispatch, rootState }, payload) => {
      const { id } = rootState.unit.activeUnit
      const [response, error] = await axios.get('/transaction', { params: { unit_id: id }})
      if(response) commit('setTransactions', response.data)
      return [response, error]
    },
    fetchTransactionByID: async ({ commit, dispatch }, id) => {
      const [response, error] = await axios.get(`/transaction/${id}`)
      if(response) commit('setTransaction', response.data)
      return [response, error]
    },
    createTransaction: async ({ commit, dispatch, rootState }, payload) => {
      const activeUnit = rootState.unit.activeUnit
      payload.unit_id = activeUnit.id
      payload.payment_status = 'Unpaid'
      const [response, error] = await axios.post('/transaction', payload)
      if (response) await dispatch('user/loginByToken', null, { root: true })
      return [response, error]
    },
    updateTransaction: async ({ commit, dispatch }, payload) => {
      const { id } = payload
      const [response, error] = await axios.put(`/transaction/${id}`, payload)
      if (response) dispatch('fetchTransactionByID', id)
      return [response, error]
    },
    updateTransactionStatus: async ({ commit, dispatch }, payload) => {
      const { id } = payload
      const [response, error] = await axios.put(`/transaction/${id}/status`, payload)
      if (response) {
        dispatch('fetchTransactions')
        dispatch('fetchTransactionByID', id)
      }
      return [response, error]
    },
    deleteTransaction: async ({ commit, dispatch }, id) => {
      const [response, error] = await axios.delete(`/transaction/${id}`)
      if (response) dispatch('fetchTransactions')
      return [response, error]
    },
  },
}
