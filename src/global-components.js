import Vue from 'vue'
import FeatherIcon from '@core/components/feather-icon/FeatherIcon.vue'
import BootstrapVue from 'bootstrap-vue'
import vSelect from 'vue-select'
import VueNumeric from 'vue-numeric'

Vue.use(BootstrapVue)
Vue.component('v-select', vSelect)
Vue.component('vue-numeric', VueNumeric)
Vue.component(FeatherIcon.name, FeatherIcon)
