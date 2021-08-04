import Vue from 'vue'
import router from '@/router'

// axios
import axios from 'axios'

const baseURL = process.env.VUE_APP_API_BASE_URL
const headers = {}

const axiosIns = axios.create({
  // You can add your headers here
  // ================================
  baseURL,
  // timeout: 1000,
})

axiosIns.interceptors.request.use(async request => {
  let token = localStorage.getItem('accessToken')
  let orderToken = localStorage.getItem('orderToken')
  if (router.currentRoute.name && router.currentRoute.name.includes('make-order')) {
    token = orderToken
    request.baseURL += '/make-order'
  }
  
  if (token) request.headers.Authorization = `Bearer ${token}`
  return request
})

axiosIns.interceptors.response.use(res => {
  const response = res.data
  return [response, null]
}, err => {
  if (!err.response) {
    console.log(err)
    return
  }
  if (err.response.status == 401) {
    if (err.response.data.message) Vue.prototype.$notify.error(err.response.data.message)
    router.replace('/login')
  }

  if (err.response.status == 400 && err.response.data && err.response.data.data && err.response.data.data.validation){
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


