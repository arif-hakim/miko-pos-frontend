<template>
  <b-card
    :title="`${getTitle()} Category`"
  >
    <b-row>
      <b-col cols="12" md="6" offset-md="3">
        <b-form-group
          label="Category Name"
          label-for="v-category-name"
        >
          <b-form-input
            id="v-category-name"
            placeholder="Meat, Clothes, Pants, etc."
            v-model="input.name"
          />
        </b-form-group>
        <b-form-group
          label="Category Code"
          label-for="v-category-name"
        >
          <b-form-input
            id="v-category-name"
            placeholder="Enter code for the category"
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

import { useCategory } from '@/composable/useCategory'
import { useUnit } from '@/composable/useUnit'
import { ref, onMounted, reactive } from '@vue/composition-api'

export default {
  components: {
  },
  setup(props, { root }) {
    const { id: category_id } = root.$route.params
    const { createCategory, category, fetchCategoryByID, updateCategory } = useCategory()
    const { activeUnit } = useUnit()
    
    const input = reactive({
      id: null,
      name: '',
      code: '',
    })

    onMounted(async () => {
      await fetchCategoryByID(category_id)
      input.id = category.value.id
      input.name = category.value.name
      input.code = category.value.code
    })

    const submitHandler = (response, error) => {
      if (error) return root.$notify.error(error.message)
      root.$notify.success(response.message)
      return root.$router.replace('/category')
    }
    
    const save = async () => {
      const payload = {
        ...input,
        unit_id: activeUnit.value.id
      }
      
      if (category_id) {
        const [response, error] = await updateCategory(payload)
        submitHandler(response, error)
      }
      else {
        const [response, error] = await createCategory(payload)
        submitHandler(response, error)
      }
    }

    return {
      category_id,
      input,
      save,
      getTitle: () => category_id ? 'Edit' : 'Create',
      ...useCategory(),
    }
  },
}
</script>