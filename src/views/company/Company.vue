<template>
  <b-card>
    <h4 class="mb-2">Company Information</h4>
      <b-row class="mb-1">
        <b-col cols="2" class="font-weight-bold">Name</b-col>
        <b-col cols="9">{{ company.name }}</b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col cols="2" class="font-weight-bold">Owner</b-col>
        <b-col cols="9">{{ company.owner.name }} / {{ company.owner.email }}</b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col cols="2" class="font-weight-bold">Address</b-col>
        <b-col cols="9">{{ company.address }}</b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col cols="2" class="font-weight-bold">Email</b-col>
        <b-col cols="9">{{ company.email }}</b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col cols="2" class="font-weight-bold">Phone</b-col>
        <b-col cols="9">{{ company.phone }}</b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col cols="2" class="font-weight-bold">Website</b-col>
        <b-col cols="9">{{ company.website }}</b-col>
      </b-row>
  </b-card>
</template>

<script>

import { useCompany } from '@/composable/useCompany'
import { ref, onMounted, reactive } from '@vue/composition-api'

export default {
  components: {
  },
  setup(props, { root }) {
    const { company, fetchCompany } = useCompany()

    onMounted(async () => {
      await fetchCompany()
    })

    return {
      ...useCompany()
    }
  },
}
</script>