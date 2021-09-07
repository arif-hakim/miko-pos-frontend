<template>
    <div class="recipe p-0">
      <b-row>
        <b-col cols="6">
          <b-form-group
            label="Raw Material"
            label-for="material"
          >
            <v-select
              placeholder="Choose Raw Material"
              :options="materials"
              v-model="recipe.raw_material_id"
              label="name"
              :reduce="x => x.id"
            ></v-select>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-form-group
            label="Amount"
            label-for="amount"
          >
            <b-input-group
              :append="recipe.raw_material_id ? getUnitMeasurement(recipe.raw_material_id) : ''"
            >
              <b-form-input type="number" v-model.number="recipe.amount"/>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
    </div>
</template>
<script>
import { defineComponent, onMounted } from '@vue/composition-api'
import { useMaterial } from '@/composable/useMaterial'

export default defineComponent({
  name: 'FormRecipe',
  props: [
    'value',
  ],
  computed: {
    recipe: {
      get(){ return this.value },
      set(recipe){ this.$emit('input', recipe) },
    }
  },
  setup(props, { root }) {
    
    const { materials, fetchMaterials } = useMaterial()

    onMounted(async () => {
      await fetchMaterials()
    })

    const getUnitMeasurement = (raw_material_id) => {
      const item = materials.value.filter(x => x.id === raw_material_id)[0]
      return item.conversion ? item.conversion.end_unit_measurement : item.unit_measurement
    }

    return {
      materials,
      getUnitMeasurement,
    }
  },
})
</script>

<style scoped>

</style>
