<template>
  <div>
    <FormOrder v-if="activeUnit"></FormOrder>
  </div>
</template>
<script>

import { defineComponent, onMounted } from '@vue/composition-api'
import FormOrder from './FormOrder'
import { useUnit } from '@/composable/useUnit'

export default defineComponent({
  components: {
    FormOrder,
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
