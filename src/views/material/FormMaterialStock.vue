<template>
  <b-card
    style="text-transform:capitalize;"
    :title="`${getTitle()} Material Stock`"
  >
    <b-row>
      <b-col cols="12" md="6" offset-md="3">
        <b-form-group
          label="MaterialCategory"
          label-for="v-Material-category"
        >
          <v-select
            v-model="input.raw_material_category_id"
            :options="materialCategories"
            label="name"
            disabled
            placeholder="Choose MaterialCategory"
            :reduce="x => x.id"
          >
          </v-select>
        </b-form-group>
        <b-form-group
          label="Material Code"
          label-for="v-Material-name"
        >
          <b-form-input
            disabled
            id="v-Material-name"
            placeholder="Enter code for the Material"
            v-model="input.code"
          />
        </b-form-group>
        <b-form-group
          label="Material Name"
          label-for="v-Material-name"
        >
          <b-form-input
            disabled
            id="v-Material-name"
            placeholder="Meat, Clothes, Pants, etc."
            v-model="input.name"
          />
        </b-form-group>
        <b-form-group
          label="Unit Measurement"
          label-for="v-Material-unit-measurement"
        >
          <b-form-input
            disabled
            id="v-Material-unit-measurement"
            placeholder="eg: Box, Cup, Glass, Kg, Gram, etc."
            v-model="input.unit_measurement"
          />
        </b-form-group>
        <b-form-group
          label="Current Stock"
          label-for="v-Material-base-price"
        >
          <vue-numeric separator="." disabled class="form-control" v-model="input.stock" />
        </b-form-group>
        <hr>
        <b-form-group
          :label="`${getTitle()} Stock By`"
          label-for="v-Material-selling-price"
        >
          <b-form-input
            type="number"
            v-model.number="stockChanges"
            placeholder="Must be more than 0"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Stock Changes Description"
          label-for="v-Material-selling-price"
        >
          <b-form-input
            id="v-Material-desc"
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

import { useMaterial } from '@/composable/useMaterial'
import { useUnit } from '@/composable/useUnit'
import { useMaterialCategory } from '@/composable/useMaterialCategory'
import { ref, onMounted, reactive } from '@vue/composition-api'

export default {
  components: {
  },
  setup(props, { root }) {
    const { operation } = root.$route.params
    const { id: material_id } = root.$route.params
    const { createMaterial, material, fetchMaterialByID, updateMaterial, updateMaterialStock } = useMaterial()
    const { fetchMaterialCategories } = useMaterialCategory()
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
      await fetchMaterialCategories()
      if (material_id) {
        await fetchMaterialByID(material_id)
        input.id = material.value.id
        input.name = material.value.name
        input.code = material.value.code
        input.stock = material.value.stock
        input.raw_material_category_id = material.value.raw_material_category_id
        input.unit_measurement = material.value.unit_measurement
        input.description = material.value.description
        input.base_price = material.value.base_price
        input.selling_price = material.value.selling_price
      }
    })

    const submitHandler = (response, error) => {
      if (error) return root.$notify.error(error.message)
      root.$notify.success(response.message)
      return root.$router.replace('/material')
    }
    
    const save = async () => {
      const payload = {
        id: material.value.id,
        changes: operation == 'increase' ? stockChanges.value : parseInt(`-${stockChanges.value}`),
        description:  changesDescription.value,
        source: source.value,
        source_id: sourceID.value,
      }
      
      const [response, error] = await updateMaterialStock(payload)
      submitHandler(response, error)
    }

    return {
      material_id,
      input,
      stockChanges,
      changesDescription,
      save,
      getTitle: () => operation,
      ...useMaterial(),
      ...useMaterialCategory(),
    }
  },
}
</script>