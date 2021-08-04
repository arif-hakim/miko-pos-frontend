const getCartFromStorage = () => {
  let data = JSON.parse(localStorage.getItem('cart'))
  let cart = data ? data : []
  return cart
}

const setCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart))
}

export default {
  namespaced: true,
  state: {
    cart: [],
  },
  mutations: {
    setCart: (state, payload) => {
      state.cart = payload
      setCartToStorage(payload)
    }, 
    addItemToCart: (state, payload) => {
      let cart = getCartFromStorage()
      const thisItemInCart = cart.filter(x => x.id == payload.id)[0]
      if (thisItemInCart) {
        cart = cart.map(x => {
          if (x.id == payload.id) {
            x.qty += payload.qty
            x.subtotal = x.price * x.qty
            x.note = payload.note
          }
          return x
        })
      } else {
        cart.push(payload)
      }
      state.cart = cart
      setCartToStorage(cart)
    },
    removeItemFromCart: (state, payload) => {
      let cart = getCartFromStorage()
      cart = cart.filter(x => x.id != payload.id)
      state.cart = cart
      setCartToStorage(cart)
    }
  },
  actions: {
    loadCart: ({ commit }) => {
      let cart = getCartFromStorage()
      commit('setCart', cart)
    },
    addToCart: ({ commit, dispatch }, payload) => {
      commit('addItemToCart', payload)
      return true
    },
    updateCart: ({ commit, dispatch }, payload) => {
      commit('setCart', payload)
    },
    removeFromCart: ({ commit }, payload) => {
      commit('removeItemFromCart', payload)
    },
    clearCart: ({ commit }, payload) => {
      commit('setCart', [])
    }
  }
}