import { useNamespacedActions, useNamespacedState } from "vuex-composition-helpers" 
export const useCategory = () => {

  const {
    fetchCategories,
    fetchCategoryByID,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useNamespacedActions('category', [
    'fetchCategories',
    'fetchCategoryByID',
    'createCategory',
    'updateCategory',
    'deleteCategory',
  ])

  const {
    category,
    categories,
    isLoading,
  } = useNamespacedState('category', [
    'category',
    'categories',
    'isLoading',
  ])


  return {
    // states
    category,
    categories,
    isLoading,

    // actions
    fetchCategories,
    fetchCategoryByID,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}