import { useNamespacedActions, useNamespacedState } from "vuex-composition-helpers" 
export const useMaterialCategory = () => {

  const {
    fetchMaterialCategories,
    fetchMaterialCategoryByID,
    createMaterialCategory,
    updateMaterialCategory,
    deleteMaterialCategory,
  } = useNamespacedActions('materialCategory', [
    'fetchMaterialCategories',
    'fetchMaterialCategoryByID',
    'createMaterialCategory',
    'updateMaterialCategory',
    'deleteMaterialCategory',
  ])

  const {
    materialCategory,
    materialCategories,
    isLoading,
  } = useNamespacedState('materialCategory', [
    'materialCategory',
    'materialCategories',
    'isLoading',
  ])


  return {
    // states
    materialCategory,
    materialCategories,
    isLoading,

    // actions
    fetchMaterialCategories,
    fetchMaterialCategoryByID,
    createMaterialCategory,
    updateMaterialCategory,
    deleteMaterialCategory,
  }
}