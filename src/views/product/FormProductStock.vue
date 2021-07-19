<template>
  <b-card
    style="text-transform:capitalize;"
    :title="`${getTitle()} Product Stock`"
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
            disabled
            placeholder="Choose Category"
            :reduce="x => x.id"
          >
          </v-select>
        </b-form-group>
        <b-form-group
          label="Product Code"
          label-for="v-Product-name"
        >
          <b-form-input
            disabled
            id="v-Product-name"
            placeholder="Enter code for the Product"
            v-model="input.code"
          />
        </b-form-group>
        <b-form-group
          label="Product Name"
          label-for="v-Product-name"
        >
          <b-form-input
            disabled
            id="v-Product-name"
            placeholder="Meat, Clothes, Pants, etc."
            v-model="input.name"
          />
        </b-form-group>
        <b-form-group
          label="Unit Measurement"
          label-for="v-Product-unit-measurement"
        >
          <b-form-input
            disabled
            id="v-Product-unit-measurement"
            placeholder="eg: Box, Cup, Glass, Kg, Gram, etc."
            v-model="input.unit_measurement"
          />
        </b-form-group>
        <b-form-group
          label="Current Stock"
          label-for="v-Product-base-price"
        >
          <vue-numeric separator="." disabled class="form-control" v-model="input.stock" />
        </b-form-group>
        <hr>
        <b-form-group
          :label="`${getTitle()} Stock By`"
          label-for="v-Product-selling-price"
        >
          <vue-numeric separator="." class="form-control" v-model="stockChanges" />
        </b-form-group>
        <b-form-group
          label="Stock Changes Description"
          label-for="v-Product-selling-price"
        >
          <b-form-input
            id="v-Product-desc"
            placeholder="Enter description here"
            v-model="changesDescription"
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

import { useProduct } from '@/composable/useProduct'
import { useUnit } from '@/composable/useUnit'
import { useCategory } from '@/composable/useCategory'
import { ref, onMounted, reactive } from '@vue/composition-api'

export default {
  components: {
  },
  setup(props, { root }) {
    const { operation } = root.$route.params
    const { id: product_id } = root.$route.params
    const { createProduct, product, fetchProductByID, updateProduct, updateProductStock } = useProduct()
    const { fetchCategories } = useCategory()
    const { activeUnit } = useUnit()
    const stockChanges = ref(0)
    const changesDescription = ref('')
    const source = ref(null)
    const sourceID = ref(null)
    
    const input = reactive({
      id: null,
      name: '',
      code: '',
    })

    onMounted(async () => {
      await fetchCategories()
      if (product_id) {
        await fetchProductByID(product_id)
        input.id = product.value.id
        input.name = product.value.name
        input.code = product.value.code
        input.stock = product.value.stock
        input.category_id = product.value.category_id
        input.unit_measurement = product.value.unit_measurement
        input.description = product.value.description
        input.base_price = product.value.base_price
        input.selling_price = product.value.selling_price
      }
    })

    const submitHandler = (response, error) => {
      if (error) return root.$notify.error(error.message)
      root.$notify.success(response.message)
      return root.$router.replace('/Product')
    }
    
    const save = async () => {
      const payload = {
        id: product.value.id,
        changes: operation == 'increase' ? stockChanges.value : parseInt(`-${stockChanges.value}`),
        description:  changesDescription.value,
        source: source.value,
        source_id: sourceID.value,
      }
      
      const [response, error] = await updateProductStock(payload)
      submitHandler(response, error)
    }

    return {
      product_id,
      input,
      stockChanges,
      changesDescription,
      save,
      getTitle: () => operation,
      ...useProduct(),
      ...useCategory(),
    }
  },
}
</script>