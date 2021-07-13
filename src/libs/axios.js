import Vue from 'vue'
import router from '@/router'

// axios
import axios from 'axios'
import store from '@/store'

const baseURL = process.env.VUE_APP_API_BASE_URL
const headers = {}

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL,
  // timeout: 1000,
})

axiosIns.interceptors.request.use(async request => {
  const token = localStorage.getItem('accessToken')
  if (token) request.headers.Authorization = `Bearer ${token}`
  return request
})

axiosIns.interceptors.response.use(res => {
  const response = res.data
  return [response, null]
}, err => {
  if (err.response.status == 401) {
    Vue.prototype.$notify.error(err.response.data.message)
    router.replace('/login')
  }

  if (err.response.status == 400 && err.response.data.data.validation){
    const { validation } = err.response.data.data
    const errors = Object.keys(validation).map(x => {
      let message = ''
      message += validation[x].map(msg => msg)
      return message
    })
    errors.map(err => {
      Vue.prototype.$notify.error(err)
    })
  }

  const error = err.response.data
  return [null, error]
})

Vue.prototype.$http = axiosIns

export default axiosIns


