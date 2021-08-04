import axios from '@axios'

const convertToFormData = (data) => {
  let formData = new FormData()
  Object.keys(data).map(key => {
    let value = data[key] ? data[key] : ''
    formData.append(key, value)
  })
  return formData
}

export default {
  namespaced: true,
  state: {
    material: null,
    materials: [],
    materialStockHistories: [],
    isLoading: false,
  },
  mutations: {
    setMaterial: (state, payload) => state.material = payload,
    setMaterials: (state, payload) => state.materials = payload,
    setIsLoading: (state, payload) => state.isLoading = payload,
    setMaterialStockHistories: (state, payload) => state.materialStockHistories = payload,
  },
  actions: {
    fetchMaterials: async ({ commit, dispatch, rootState }, payload = { search: '' }) => {
      const unit = rootState.unit
      const id = unit.activeUnit.id
      const [response, error] = await axios.get('/material', { params: { 
        unit_id: id,
        ...payload
      }})
      if (response) commit('setMaterials', response.data)
      return [response, error]
    },
    fetchMaterialByID: async ({ commit, dispatch }, id) => {
      const [response, error] = await axios.get(`/material/${id}`)
      if (response) commit('setMaterial', response.data)
      return [response, error]
    },
    createMaterial: async ({ commit, dispatch, rootState }, payload) => {
      const currentUser = rootState.user.currentUser
      payload.company_id = currentUser.company_id

      payload = convertToFormData(payload)
      const [response, error] = await axios.post('/material', payload)
      if (response) await dispatch('user/loginByToken', null, { root: true })
      return [response, error]
    },
    updateMaterial: async ({ commit, dispatch }, payload) => {
      const { id } = payload
      payload = convertToFormData(payload)
      const [response, error] = await axios.post(`/material/${id}`, payload)
      if (response) dispatch('fetchMaterialByID', id)
      return [response, error]
    },
    updateMaterialStock: async ({ commit, dispatch }, payload) => {
      const { id } = payload
      const [response, error] = await axios.post(`/material/${id}/update-stock`, payload)
      if (response) dispatch('fetchMaterialByID', id)
      return [response, error]
    },
    fetchMaterialStockHistories: async ({ commit, dispatch }, id) => {
      const [response, error] = await axios.get(`/material/${id}/stock-history`)
      if (response) commit('setMaterialStockHistories', response.data)
      return [response, error]
    },
    deleteMaterial: async ({ commit, dispatch }, id) => {
      const [response, error] = await axios.delete(`/material/${id}`)
      if (response) dispatch('fetchMaterials')
      return [response, error]
    },
  },
}
