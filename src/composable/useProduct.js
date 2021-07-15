import { useNamespacedActions, useNamespacedState } from "vuex-composition-helpers" 
export const useProduct = () => {

  const {
    fetchProducts,
    fetchProductStockHistories,
    fetchProductByID,
    createProduct,
    updateProduct,
    updateProductStock,
    deleteProduct,
  } = useNamespacedActions('product', [
    'fetchProducts',
    'fetchProductStockHistories',
    'fetchProductByID',
    'createProduct',
    'updateProduct',
    'updateProductStock',
    'deleteProduct',
  ])

  const {
    product,
    products,
    productStockHistories,
    isLoading,
  } = useNamespacedState('product', [
    'product',
    'products',
    'productStockHistories',
    'isLoading',
  ])


  return {
    // states
    product,
    products,
    productStockHistories,
    isLoading,

    // actions
    fetchProducts,
    fetchProductStockHistories,
    fetchProductByID,
    createProduct,
    updateProduct,
    updateProductStock,
    deleteProduct,
  }
}