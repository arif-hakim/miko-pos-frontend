<template>
  <b-card
    :title="`${getTitle()} Branch`"
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

            <!-- email -->
            <b-col cols="12">
              <b-form-group
                label="Address"
                label-for="v-company-address"
              >
                <b-form-input
                  id="v-company-address"
                  v-model="input.address"
                  placeholder="Address"
                />
              </b-form-group>
            </b-col>

            <!-- email -->
            <b-col cols="12">
              <b-form-group
                label="Email"
                label-for="v-company-email"
              >
                <b-form-input
                  id="v-company-email"
                  v-model="input.email"
                  placeholder="Email"
                />
              </b-form-group>
            </b-col>

            <!-- mobile -->
            <b-col cols="12">
              <b-form-group
                label="Phone"
                label-for="v-company-phone"
              >
                <b-form-input
                  id="v-company-phone"
                  v-model="input.phone"
                  placeholder="Phone"
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

import { useBranch } from '@/composable/useBranch'
import { useUnit } from '@/composable/useUnit'
import { ref, onMounted, reactive } from '@vue/composition-api'

export default {
  components: {
  },
  setup(props, { root }) {
    const { id: branch_id } = root.$route.params
    const { createBranch, branch, fetchBranchByID, updateBranch } = useBranch()
    const { activeUnit } = useUnit()
    
    const input = reactive({
      id: null,
      name: '',
      address: '',
      email: '',
      phone: '',
    })

    onMounted(async () => {
      if (branch_id) {
        await fetchBranchByID(branch_id)
        input.id = branch.value.id
        input.name = branch.value.name
        input.address = branch.value.address
        input.email = branch.value.email
        input.phone = branch.value.phone
      }
    })

    const submitHandler = (response, error) => {
      if (error) return root.$notify.error(error.message)
      root.$notify.success(response.message)
      return root.$router.replace('/branch')
    }
    
    const save = async () => {
      const payload = {
        ...input,
      }
      
      if (branch_id) {
        const [response, error] = await updateBranch(payload)
        submitHandler(response, error)
      }
      else {
        const [response, error] = await createBranch(payload)
        submitHandler(response, error)
      }
    }

    return {
      branch_id,
      input,
      save,
      getTitle: () => branch_id ? 'Edit' : 'Create',
      ...useBranch(),
    }
  },
}
</script>