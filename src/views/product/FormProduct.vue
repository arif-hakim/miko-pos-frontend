<template>
  <b-card
    :title="`${getTitle()} Product`"
  >
    <b-row>
      <b-col cols="12" md="6" offset-md="3">
        <b-form-group
          label="Category"
          label-for="v-Product-category"
        >
          <v-select
            v-model="input.category_id"
            :options="categories"
            label="name"
            placeholder="Choose Category"
            :reduce="x => x.id"
          >
          </v-select>
        </b-form-group>
        <b-form-group
          label="Product Name"
          label-for="v-Product-name"
        >
          <b-form-input
            id="v-Product-name"
            placeholder="Meat, Clothes, Pants, etc."
            v-model="input.name"
          />
        </b-form-group>
        <b-form-group
          label="Product Code"
          label-for="v-Product-name"
        >
          <b-form-input
            id="v-Product-name"
            placeholder="Enter code for the Product"
            v-model="input.code"
          />
        </b-form-group>
        <b-form-group
          label="Description"
          label-for="v-Product-description"
        >
          <b-form-input
            id="v-Product-description"
            placeholder="Enter description here"
            v-model="input.description"
          />
        </b-form-group>
        <b-form-group
          label="Unit Measurement"
          label-for="v-Product-unit-measurement"
        >
          <b-form-input
            id="v-Product-unit-measurement"
            placeholder="eg: Box, Cup, Glass, Kg, Gram, etc."
            v-model="input.unit_measurement"
          />
        </b-form-group>
        <b-form-group
          label="Base Price"
          label-for="v-Product-base-price"
        >
          <vue-numeric separator="." class="form-control" v-model="input.base_price" />
        </b-form-group>
        <b-form-group
          label="Selling Price"
          label-for="v-Product-selling-price"
        >
          <vue-numeric separator="." class="form-control" v-model="input.selling_price" />
        </b-form-group>
        <b-form-group
          for="extension"
          class="mt-1"
          label="Product Picture"
          label-for="v-Product-selling-price"
        >
          <b-form-file
            id="picture"
            accept=".jpg, .png, .gif"
            v-model="input.picture"
          />
        </b-form-group>

        <hr class="my-2">
        <b-form-group
          label="Ingredients (optional)"
          label-for="v-product"
        >
          <vue-repeater
            class="border rounded"
            v-model="fieldsRepeater"
            :key="repeaterData"
          ></vue-repeater>
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

import { useProduct } from '@/composable/useProduct'
import { useUnit } from '@/composable/useUnit'
import { useCategory } from '@/composable/useCategory'
import { ref, onMounted, reactive, watch } from '@vue/composition-api'

export default {
  components: {
  },
  setup(props, { root }) {
    const { id: product_id } = root.$route.params
    const { createProduct, product, fetchProductByID, updateProduct } = useProduct()
    const { fetchCategories } = useCategory()
    const { activeUnit } = useUnit()
    
    const fieldsRepeater = ref([
      {
        name: 'FormRecipe',
        value: {}
      },
    ])

    const repeaterData = ref('')

    watch(fieldsRepeater, () => {
      repeaterData.value = JSON.stringify(fieldsRepeater.value.map(x => x.value))
    })
    
    const input = reactive({
      id: null,
      name: '',
      code: '',
      category_id: '',
      unit_measurement: '',
      description: '',
      base_price: 0,
      selling_price: 0,
      picture: null,
    })

    onMounted(async () => {
      await fetchCategories()
      if (product_id) {
        await fetchProductByID(product_id)
        input.id = product.value.id
        input.name = product.value.name
        input.code = product.value.code
        input.category_id = product.value.category_id
        input.unit_measurement = product.value.unit_measurement
        input.description = product.value.description
        input.base_price = product.value.base_price
        input.selling_price = product.value.selling_price
        fieldsRepeater.value = product.value.recipe.map(x => {
          return {
            name: 'FormRecipe',
            value: {
              raw_material_id: x.raw_material_id,
              amount: x.amount,
            }
          }
        })
      }
    })

    const submitHandler = (response, error) => {
      if (error) return root.$notify.error(error.message)
      root.$notify.success(response.message)
      return root.$router.replace('/Product')
    }
    
    const save = async () => {
      
      const recipe = fieldsRepeater.value.filter(x => Object.keys(x.value).length).map(x => {
        return {
          raw_material_id: x.value.raw_material_id,
          amount: x.value.amount
        }
      })

      const payload = {
          ...input,
        recipe: JSON.stringify(recipe),
        unit_id: activeUnit.value.id
      }

      if (product_id) {
        const [response, error] = await updateProduct(payload)
        submitHandler(response, error)
      }
      else {
        const [response, error] = await createProduct(payload)
        submitHandler(response, error)
      }
    }

    return {
      repeaterData,
      fieldsRepeater,
      product_id,
      input,
      save,
      getTitle: () => product_id ? 'Edit' : 'Create',
      ...useProduct(),
      ...useCategory(),
    }
  },
}
</script>
<style lang="css">
  .repeater > .repeater-block {
    padding: 0 !important;
  }
</style>