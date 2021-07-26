import { useNamespacedActions, useNamespacedState } from "vuex-composition-helpers" 
export const useCart = () => {

  const {
    addToCart,
    loadCart,
    updateCart,
    removeFromCart,
    clearCart,
  } = useNamespacedActions('cart', [
    'addToCart',
    'loadCart',
    'updateCart',
    'removeFromCart',
    'clearCart',
  ])

  const {
    cart,
  } = useNamespacedState('cart', [
    'cart',
  ])


  return {
    // states
    cart,

    // actions
    addToCart,
    loadCart,
    updateCart,
    removeFromCart,
    clearCart,
  }
}