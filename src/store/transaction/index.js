import axios from '@axios'
import moment from 'moment'

export default {
  namespaced: true,
  state: {
    transaction: null,
    transactions: [],
    isLoading: false,
    dateFilter: {
      startDate: moment().format('YYYY-MM-DD'),
      endDate: moment().format('YYYY-MM-DD'),
    } 
  },
  mutations: {
    setTransaction: (state, payload) => state.transaction = payload,
    setTransactions: (state, payload) => state.transactions = payload,
    setIsLoading: (state, payload) => state.isLoading = payload,
    setTransactionStockHistories: (state, payload) => state.transactionStockHistories = payload,
    setDateFilter: (state, payload) => { 
      state.dateFilter.startDate = payload.startDate
      state.dateFilter.endDate = payload.endDate
      return
    }
  },
  actions: {
    setDateFilter: ({ commit, dispatch, state }, payload) => {
      commit('setDateFilter', payload)
    },
    fetchTransactions: async ({ commit, dispatch, rootState, state }, payload = { start_date: null, end_date: null }) => {
      const { id } = rootState.unit.activeUnit
      if (!payload.start_date) payload.start_date = state.dateFilter.startDate
      if (!payload.end_date) payload.end_date = state.dateFilter.endDate
      const [response, error] = await axios.get('/transaction', { params: { unit_id: id, ...payload }})
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
      payload.payment_status = payload.employee_id ? 'Internal' : 'Unpaid'
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
