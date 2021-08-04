<template>
  <b-card
    :title="`${getTitle()} Material Category`"
  >
    <b-row>
      <b-col cols="12" md="6" offset-md="3">
        <b-form-group
          label="Category Name"
          label-for="v-materialCategory-name"
        >
          <b-form-input
            id="v-materialCategory-name"
            placeholder="Meat, Clothes, Pants, etc."
            v-model="input.name"
          />
        </b-form-group>
        <b-form-group
          label="Category Code"
          label-for="v-materialCategory-name"
        >
          <b-form-input
            id="v-materialCategory-name"
            placeholder="Enter code for the materialCategory"
            v-model="input.code"
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

import { useMaterialCategory } from '@/composable/useMaterialCategory'
import { useUnit } from '@/composable/useUnit'
import { ref, onMounted, reactive } from '@vue/composition-api'

export default {
  components: {
  },
  setup(props, { root }) {
    const { id: materialCategory_id } = root.$route.params
    const { createMaterialCategory, materialCategory, fetchMaterialCategoryByID, updateMaterialCategory } = useMaterialCategory()
    const { activeUnit } = useUnit()
    
    const input = reactive({
      id: null,
      name: '',
      code: '',
    })

    onMounted(async () => {
      if (materialCategory_id) {
        await fetchMaterialCategoryByID(materialCategory_id)
        input.id = materialCategory.value.id
        input.name = materialCategory.value.name
        input.code = materialCategory.value.code
      }
    })

    const submitHandler = (response, error) => {
      if (error) return root.$notify.error(error.message)
      root.$notify.success(response.message)
      return root.$router.replace('/material-category')
    }
    
    const save = async () => {
      const payload = {
        ...input,
        unit_id: activeUnit.value.id
      }
      
      if (materialCategory_id) {
        const [response, error] = await updateMaterialCategory(payload)
        submitHandler(response, error)
      }
      else {
        const [response, error] = await createMaterialCategory(payload)
        submitHandler(response, error)
      }
    }

    return {
      materialCategory_id,
      input,
      save,
      getTitle: () => materialCategory_id ? 'Edit' : 'Create',
      ...useMaterialCategory(),
    }
  },
}
</script>