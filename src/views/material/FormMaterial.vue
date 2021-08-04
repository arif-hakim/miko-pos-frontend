<template>
  <b-card
    :title="`${getTitle()} Raw Material`"
  >
    <b-row>
      <b-col cols="12" md="6" offset-md="3">
        <b-form-group
          label="MaterialCategory"
          label-for="v-Raw-materialCategory"
        >
          <v-select
            v-model="input.raw_material_category_id"
            :options="materialCategories"
            label="name"
            placeholder="Choose Category"
            :reduce="x => x.id"
          >
          </v-select>
        </b-form-group>
        <b-form-group
          label="Material Name"
          label-for="v-Material-name"
        >
          <b-form-input
            id="v-Material-name"
            placeholder="Meat, Clothes, Pants, etc."
            v-model="input.name"
          />
        </b-form-group>
        <b-form-group
          label="Material Code"
          label-for="v-Material-name"
        >
          <b-form-input
            id="v-Material-name"
            placeholder="Enter code for the Material"
            v-model="input.code"
          />
        </b-form-group>
        <b-form-group
          label="Description"
          label-for="v-Material-description"
        >
          <b-form-input
            id="v-Material-description"
            placeholder="Enter description here"
            v-model="input.description"
          />
        </b-form-group>
        <b-form-group
          label="Unit Measurement"
          label-for="v-Material-unit-measurement"
        >
          <b-form-input
            id="v-Material-unit-measurement"
            placeholder="eg: Box, Cup, Glass, Kg, Gram, etc."
            v-model="input.unit_measurement"
          />
        </b-form-group>
        <b-form-group
          for="extension"
          class="mt-1"
          label="Material Picture"
        >
          <b-form-file
            id="extension"
            accept=".jpg, .png, .gif"
            v-model="input.picture"
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
    const { id: material_id } = root.$route.params
    const { createMaterial, material, fetchMaterialByID, updateMaterial } = useMaterial()
    const { fetchMaterialCategories } = useMaterialCategory()
    const { activeUnit } = useUnit()
    
    const input = reactive({
      id: null,
      name: '',
      code: '',
      raw_material_category_id: '',
      unit_measurement: '',
      description: '',
      picture: null,
    })

    onMounted(async () => {
      await fetchMaterialCategories()
      if (material_id) {
        await fetchMaterialByID(material_id)
        input.id = material.value.id
        input.name = material.value.name
        input.code = material.value.code
        input.raw_material_category_id = material.value.raw_material_category_id
        input.unit_measurement = material.value.unit_measurement
        input.description = material.value.description
      }
    })

    const submitHandler = (response, error) => {
      if (error) return root.$notify.error(error.message)
      root.$notify.success(response.message)
      return root.$router.replace('/material')
    }
    
    const save = async () => {
      const payload = {
        ...input,
        unit_id: activeUnit.value.id
      }

      if (material_id) {
        const [response, error] = await updateMaterial(payload)
        submitHandler(response, error)
      }
      else {
        const [response, error] = await createMaterial(payload)
        submitHandler(response, error)
      }
    }

    return {
      material_id,
      input,
      save,
      getTitle: () => material_id ? 'Edit' : 'Create',
      ...useMaterial(),
      ...useMaterialCategory(),
    }
  },
}
</script>