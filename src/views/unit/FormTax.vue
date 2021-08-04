<template>
  <b-card
    :title="`Tax`"
  >
    <b-row>
      <!-- first name -->
      <b-col cols="12">
        <b-form-group
          label="Tax (%)"
          label-for="v-company-name"
        >
          <b-form-input
            id="v-company-name"
            v-model="input.tax"
            placeholder="Tax in percent. Eg. 10, 15"
          />
        </b-form-group>
      </b-col>

      <!-- submit and reset -->
      <b-col cols="12" class="text-center">
        <b-button
          @click="save"
          variant="primary"
          class="mr-1 mt-2"
        >
          Submit
        </b-button>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>

import { useUnit } from '@/composable/useUnit'
import { ref, onMounted, reactive } from '@vue/composition-api'

export default {
  components: {
  },
  setup(props, { root }) {
    const { activeUnit } = useUnit()
    const { id: unit_id } = activeUnit.value
    const { updateTax, unit, fetchUnitByID } = useUnit()
    
    const input = reactive({
      id: null,
      tax: 0,
    })

    onMounted(async () => {
      if (unit_id) {
        await fetchUnitByID(unit_id)
        input.id = unit.value.id
        input.tax = unit.value.tax
      }
    })

    const submitHandler = (response, error) => {
      if (error) return root.$notify.error(error.message)
      root.$notify.success(response.message)
    }
    
    const save = async () => {
      const payload = {
        ...input,
      }
      const [response, error] = await updateTax(payload)
      submitHandler(response, error)
    }

    return {
      unit_id,
      input,
      save,
      ...useUnit(),
    }
  },
}
</script>