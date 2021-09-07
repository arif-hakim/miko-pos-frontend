<template>
  <b-card
    :title="`${getTitle()} Conversion`"
  >
    <b-row>
      <b-col cols="12" md="6" offset-md="3">
        <b-form-group
          label="Conversion Name"
          label-for="v-conversion-name"
        >
          <b-form-input
            id="v-conversion-name"
            placeholder="eg: Kg to Gram, Pcs to Ml"
            v-model="input.name"
          />
        </b-form-group>
        <b-form-group
          label="Unit Measurement Start"
          label-for="v-conversion-um-start"
        >
          <b-form-input
            id="v-conversion-um-start"
            placeholder="Enter unit measurement start"
            v-model="input.start_unit_measurement"
          />
        </b-form-group>
        <b-form-group
          label="Operator"
          label-for="v-conversion-operator"
        >
          <v-select
            id="v-conversion-operator"
            placeholder="Enter operator"
            :options="['*', '/']"
            v-model="input.operator"
          />
        </b-form-group>
        <b-form-group
          label="Amount"
          label-for="v-conversion-amount"
        >
          <b-form-input
            id="v-conversion-amount"
            placeholder="Enter amount"
            v-model="input.amount"
          />
        </b-form-group>
        <b-form-group
          label="Unit Measurement End"
          label-for="v-conversion-um-end"
        >
          <b-form-input
            id="v-conversion-um-end"
            placeholder="Enter unit measurement end"
            v-model="input.end_unit_measurement"
          />
        </b-form-group>
        <div class="text-center">
          <b-button
            :disabled="isLoading"
            variant="primary"
            @click="save"
          >
          <b-spinner v-if="isLoading" small variant="light" label="Spinning"></b-spinner>
          <span v-else>
            Submit
          </span>
          </b-button>
        </div>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>

import { useConversion } from '@/composable/useConversion'
import { useUnit } from '@/composable/useUnit'
import { ref, onMounted, reactive } from '@vue/composition-api'

export default {
  components: {
  },
  setup(props, { root }) {
    const { id: conversion_id } = root.$route.params
    const { createConversion, conversion, fetchConversionByID, updateConversion } = useConversion()
    const { activeUnit } = useUnit()
    
    const input = reactive({
      id: null,
      name: '',
      start_unit_measurement: '',
      end_unit_measurement: '',
      operator: '',
      amount: null,
    })

    onMounted(async () => {
      if (conversion_id) {
        await fetchConversionByID(conversion_id)
        input.id = conversion.value.id
        input.name = conversion.value.name
        input.start_unit_measurement = conversion.value.start_unit_measurement
        input.end_unit_measurement = conversion.value.end_unit_measurement
        input.operator = conversion.value.operator
        input.amount = conversion.value.amount
      }
    })

    const submitHandler = (response, error) => {
      if (error) return root.$notify.error(error.message)
      root.$notify.success(response.message)
      return root.$router.replace('/conversion')
    }
    
    const save = async () => {
      const payload = {
        ...input,
        unit_id: activeUnit.value.id
      }
      
      if (conversion_id) {
        const [response, error] = await updateConversion(payload)
        submitHandler(response, error)
      }
      else {
        const [response, error] = await createConversion(payload)
        submitHandler(response, error)
      }
    }

    return {
      conversion_id,
      input,
      save,
      getTitle: () => conversion_id ? 'Edit' : 'Create',
      ...useConversion(),
    }
  },
}
</script>