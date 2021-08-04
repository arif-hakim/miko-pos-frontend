import { useNamespacedActions, useNamespacedState } from "vuex-composition-helpers" 
export const useMaterial = () => {

  const {
    fetchMaterials,
    fetchMaterialStockHistories,
    fetchMaterialByID,
    createMaterial,
    updateMaterial,
    updateMaterialStock,
    deleteMaterial,
  } = useNamespacedActions('material', [
    'fetchMaterials',
    'fetchMaterialStockHistories',
    'fetchMaterialByID',
    'createMaterial',
    'updateMaterial',
    'updateMaterialStock',
    'deleteMaterial',
  ])

  const {
    material,
    materials,
    materialStockHistories,
    isLoading,
  } = useNamespacedState('material', [
    'material',
    'materials',
    'materialStockHistories',
    'isLoading',
  ])


  return {
    // states
    material,
    materials,
    materialStockHistories,
    isLoading,

    // actions
    fetchMaterials,
    fetchMaterialStockHistories,
    fetchMaterialByID,
    createMaterial,
    updateMaterial,
    updateMaterialStock,
    deleteMaterial,
  }
}