<template>
  <div class="p-4">
    <h4 class="mb-1 text-center">
      <img :src="logo" width="50" class="mb-1" alt="Logo">
      <br>
      Welcome to MIKO!
    </h4>
    <b-col cols="12" md="6" lg="4" offset-md="3" offset-lg="4">
      <b-card>
        <b>CHOOSE UNIT</b>
        <hr>
        <v-select
          v-model="currentUnit"
          :options="selectUnits"
          label="text"
          :reduce="option => option.value"
          placeholder="- Select a Unit -"
          single
        >
        </v-select>
        <b-button
          class="mt-1"
          block
          variant="primary"
          @click="chooseUnit"
        >Next</b-button>
      </b-card>
    </b-col>
  </div>
</template>

<script>

import Ripple from 'vue-ripple-directive'
import { useUnit } from '@/composable/useUnit'
import { ref, onMounted } from '@vue/composition-api'

export default {
  directives: {
    Ripple
  },
  props: [],
  setup(props, { root }){
    const { fetchUnits, activeUnit, units } = useUnit()
    const selectUnits = ref([])
    const currentUnit = ref('')

    onMounted(async () => {
      await fetchUnits()
      selectUnits.value = units.value.map(unit => {
        return {
          value: unit,
          text: unit.name
        }
      })
    })

    const chooseUnit = () => {
      localStorage.setItem('activeUnit', JSON.stringify(currentUnit.value))
      root.$router.replace('/')
    }

    return {
      currentUnit,
      chooseUnit,
      selectUnits,
      activeUnit,
      ...useUnit(),
      logo: root.$logo,
    }
  }
}
</script>
