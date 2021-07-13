<template>
  <div class="p-4">
    <h4 class="mb-1 text-center">
      Welcome to MIKO-POS!
    </h4>
    <b-col cols="12" md="6" lg="4" offset-md="3" offset-lg="4">
      <b-alert show variant="primary" class="p-2">
        In some cases, a branch of company can have different sub-units inside like store, warehouse, etc. 
        You can implement our system to those sub-units by creating unit.
        But, it's not a problem if your branch doesn't have sub-unit like that, 
        you can just create one. Here, you are required to create your first unit.
      </b-alert>
      <b-card>
        <b>UNIT INFORMATION</b>
        <hr>
        <b-form @submit.prevent="doCreate">
          <b-row>
            <!-- first name -->
            <b-col cols="12">
              <b-form-group
                label="Unit Name"
                label-for="v-unit-name"
              >
                <b-form-input
                  id="v-unit-name"
                  v-model="name"
                  placeholder="Store, Warehouse, etc."
                />
              </b-form-group>
            </b-col>
            <!-- submit and reset -->
            <b-col cols="12" class="text-center">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="primary"
                class="mr-1 mt-2"
                block
              >
                Next
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
    </b-col>
  </div>
</template>

<script>

import Ripple from 'vue-ripple-directive'
import { useUnit } from '@/composable/useUnit'
import { useBranch } from '@/composable/useBranch'
import { ref } from '@vue/composition-api'

export default {
  directives: {
    Ripple
  },
  props: [],
  setup(props, { root }){
    const { createUnit } = useUnit()
    const { activeBranch } = useBranch()
    const name = ref('')

    const doCreate = async () => {
      const payload = {
        name: name.value,
        branch_id: activeBranch.value.id
      }

      const [response, error] = await createUnit(payload)
      response ? root.$notify.success(response.message) : root.$notify.error(error.message)
      if (response) {
        localStorage.setItem('activeUnit', JSON.stringify(response.data))
        return root.$router.replace('/')
      }
    }

    return {
      doCreate,
      name,
    }
  }
}
</script>
