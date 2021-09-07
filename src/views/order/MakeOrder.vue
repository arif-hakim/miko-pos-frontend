<template>
  <div>
    <FormOrderCustomer v-if="activeUnit"></FormOrderCustomer>
  </div>
</template>
<script>

import { defineComponent, onMounted } from '@vue/composition-api'
import FormOrderCustomer from './FormOrderCustomer'
import { useUnit } from '@/composable/useUnit'

export default defineComponent({
  components: {
    FormOrderCustomer,
  },
  setup(props, { root }) {
    const { fetchUnitByOrderToken, activeUnit } = useUnit()
    
    return {
      ...useUnit()
    }
  },
  async created(){
    await this.fetchUnitByOrderToken()
  },
  beforeRouteEnter: async (to, from, next) => {
    const { id: token } = to.query
    localStorage.setItem('orderToken', token)
    next()
  },
})
</script>
