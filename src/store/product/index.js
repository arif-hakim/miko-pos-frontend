import axios from '@axios'

const convertToFormData = (data) => {
  let formData = new FormData()
  Object.keys(data).map(key => {
    formData.append(key, data[key])
  })
  return formData
}

export default {
  namespaced: true,
  state: {
    product: null,
    products: [],
    productStockHistories: [],
    isLoading: false,
  },
  mutations: {
    setProduct: (state, payload) => state.product = payload,
    setProducts: (state, payload) => state.products = payload,
    setIsLoading: (state, payload) => state.isLoading = payload,
    setProductStockHistories: (state, payload) => state.productStockHistories = payload,
  },
  actions: {
    fetchProducts: async ({ commit, dispatch, rootState }, payload) => {
      const { id } = rootState.unit.activeUnit
      const [response, error] = await axios.get('/product', { params: { unit_id: id }})
      if(response) commit('setProducts', response.data)
      return [response, error]
    },
    fetchProductByID: async ({ commit, dispatch }, id) => {
      const [response, error] = await axios.get(`/product/${id}`)
      if(response) commit('setProduct', response.data)
      return [response, error]
    },
    createProduct: async ({ commit, dispatch, rootState }, payload) => {
      const currentUser = rootState.user.currentUser
      payload.company_id = currentUser.company_id

      payload = convertToFormData(payload)
      const [response, error] = await axios.post('/product', payload)
      if (response) await dispatch('user/loginByToken', null, { root: true })
      return [response, error]
    },
    updateProduct: async ({ commit, dispatch }, payload) => {
      const { id } = payload
      const [response, error] = await axios.put(`/product/${id}`, payload)
      if (response) dispatch('fetchProductByID', id)
      return [response, error]
    },
    updateProductStock: async ({ commit, dispatch }, payload) => {
      const { id } = payload
      const [response, error] = await axios.post(`/product/${id}/update-stock`, payload)
      if (response) dispatch('fetchProductByID', id)
      return [response, error]
    },
    fetchProductStockHistories: async ({ commit, dispatch }, id) => {
      const [response, error] = await axios.get(`/product/${id}/stock-history`)
      if (response) commit('setProductStockHistories', response.data)
      return [response, error]
    },
    deleteProduct: async ({ commit, dispatch }, id) => {
      const [response, error] = await axios.delete(`/product/${id}`)
      return [response, error]
    },
  },
}
