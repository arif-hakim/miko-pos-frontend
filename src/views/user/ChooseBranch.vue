<template>
  <div class="p-4">
    <h4 class="mb-1 text-center">
      Welcome to MIKO-POS!
    </h4>
    <b-col cols="12" md="6" lg="4" offset-md="3" offset-lg="4" class="mt-4">
      <b-card>
        <b>CHOOSE BRANCH</b>
        <hr>
        <b-form-select
          v-model="currentBranch"
          :options="selectBranches"
        >
          <template #first>
            <b-form-select-option value="" disabled>- Please select a branch -</b-form-select-option>
          </template>
        </b-form-select>
        <b-button
          class="mt-1"
          block
          variant="primary"
          @click="chooseBranch"
        >Next</b-button>
      </b-card>
    </b-col>
  </div>
</template>

<script>

import Ripple from 'vue-ripple-directive'
import { useBranch } from '@/composable/useBranch'
import { ref, onMounted } from '@vue/composition-api'

export default {
  directives: {
    Ripple
  },
  props: [],
  setup(props, { root }){
    const { fetchBranches, activeBranch, branches } = useBranch()
    const currentBranch = ref('')
    const selectBranches = ref([])

    onMounted(async () => {
      await fetchBranches()
      selectBranches.value = branches.value.map(branch => {
        return {
          value: branch,
          text: branch.name
        }
      })
    })

    const chooseBranch = () => {
      localStorage.setItem('activeBranch', JSON.stringify(currentBranch.value))
      root.$router.replace('/choose-unit')
    }

    return {
      currentBranch,
      chooseBranch,
      selectBranches,
      ...useBranch()
    }
  }
}
</script>
