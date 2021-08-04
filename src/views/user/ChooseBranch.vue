<template>
  <div class="p-4">
    <h4 class="mb-1 text-center">
      <img :src="logo" width="50" class="mb-1" alt="Logo">
      <br>
      Welcome to MIKO!
    </h4>
    <b-col cols="12" md="6" lg="4" offset-md="3" offset-lg="4" class="mt-4">
      <b-card>
        <div class="d-flex justify-content-between">
          <b>CHOOSE BRANCH</b>
          <b-link
            to="/create-branch"
            class="btn btn-primary btn-sm"
          >Create New Branch</b-link>
        </div>
        <hr>
        <v-select
          v-model="currentBranch"
          label="text"
          :reduce="option => option.value"
          placeholder="- Select a Branch -"
          single
          :options="selectBranches"
        >
        </v-select>
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
      ...useBranch(),
      logo: root.$logo,
    }
  }
}
</script>