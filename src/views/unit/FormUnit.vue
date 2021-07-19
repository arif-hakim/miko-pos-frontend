<template>
  <b-card
    :title="`${getTitle()} Unit`"
  >
    <b-row>
            <!-- first name -->
            <b-col cols="12">
              <b-form-group
                label="Name"
                label-for="v-company-name"
              >
                <b-form-input
                  id="v-company-name"
                  v-model="input.name"
                  placeholder="Name"
                />
              </b-form-group>
            </b-col>

            <!-- submit and reset -->
            <b-col cols="12" class="text-center">
              <b-button
                @click="save"
                variant="primary"
                class="mr-1 mt-2"
                block
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
    const { id: unit_id } = root.$route.params
    const { createUnit, unit, fetchUnitByID, updateUnit } = useUnit()
    const { activeUnit } = useUnit()
    
    const input = reactive({
      id: null,
      name: '',
    })

    onMounted(async () => {
      if (unit_id) {
        await fetchUnitByID(unit_id)
        input.id = unit.value.id
        input.name = unit.value.name
      }
    })

    const submitHandler = (response, error) => {
      if (error) return root.$notify.error(error.message)
      root.$notify.success(response.message)
      return root.$router.replace('/unit')
    }
    
    const save = async () => {
      const payload = {
        ...input,
      }
      
      if (unit_id) {
        const [response, error] = await updateUnit(payload)
        submitHandler(response, error)
      }
      else {
        const [response, error] = await createUnit(payload)
        submitHandler(response, error)
      }
    }

    return {
      unit_id,
      input,
      save,
      getTitle: () => unit_id ? 'Edit' : 'Create',
      ...useUnit(),
    }
  },
}
</script>