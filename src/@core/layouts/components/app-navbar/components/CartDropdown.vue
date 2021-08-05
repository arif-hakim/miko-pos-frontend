<template>
  <b-nav-item-dropdown
    ref="cartDropdown"
    class="dropdown-cart mr-25"
    menu-class="dropdown-menu-media"
    right
  >
    <!-- MODAL CUSTOMER NAME -->
    <b-modal
      centered
      header-bg-variant="light"
      id="modalIdentity"
      v-model="modalIdentity"
      ref="modal"
    >
      <template #modal-header>
        <div class="w-100 d-flex justify-content-between">
            <b>Customer Identity</b>
            <b-link
              @click="() => {
                openEmployeeOrderModal()
                closeIdentityModal()
              }"
            >
              or sign in as employee
            </b-link>
        </div>
      </template>
      <b-form-group
        class="pt-1"
        label="Customer Name"
        label-for="customer-name-item"
      >
        <b-form-input
          id="customer-name-item"
          required
          v-model="customerName"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        class="pt-1"
        label="Table Number"
        label-for="customer-name-item"
      >
        <b-form-input
          id="customer-name-item"
          required
          v-model="tableNumber"
        >
        </b-form-input>
      </b-form-group>
      <template #modal-footer>
        <div class="w-100 d-flex justify-content-between">
          <b-button
            variant="secondary"
            @click="closeIdentityModal"
          >
            Cancel
          </b-button>
          <b-button
            variant="primary"
            class="ml-2"
            :disabled="!customerName || !tableNumber"
            @click="placeOrder"
          >
            Place Order
          </b-button>
        </div>
      </template>
    </b-modal>
    <!-- END OF MODAL -->
    
    <!-- MODAL EMPLOYEE NAME -->
    <b-modal
      centered
      header-bg-variant="light"
      id="modalEmployeeOrder"
      v-model="modalEmployeeOrder"
      ref="modal"
    >
      <template #modal-header>
        <div class="w-100 d-flex justify-content-between">
            <b>Make Order as Employee</b>
            <b-link
              @click="() => {
                openIdentityModal()
                closeEmployeeOrderModal()
              }"
            >
              or make order as Customer
            </b-link>
        </div>
      </template>
      <b-form-group
        class="pt-1"
        label="Email"
        label-for="customer-name-item"
      >
        <b-form-input
          id="customer-name-item"
          placeholder="Enter your account email"
          required
          :disabled="employee ? true : false"
          v-model="employeeEmail"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        class="pt-1"
        label="Password"
        label-for="customer-name-item"
      >
        <b-form-input
          id="customer-name-item"
          placeholdder="Enter your account password"
          v-model="employeePassword"
          :disabled="employee ? true : false"
          required
          type="password"
        >
        </b-form-input>
      </b-form-group>
      <div v-if="employee ? true : false">
       <hr>
        <v-select
          v-model="selectedBranch"
          label="text"
          :reduce="option => option.value"
          placeholder="- Select a Branch -"
          class="mb-1"
          single
          :options="selectBranches"
        >
        </v-select>

        <v-select
          v-model="selectedUnit"
          label="text"
          placeholder="- Select a Unit -"
          single
          :options="selectUnits"
          :reduce="option => option.value"
          :disabled="!selectedBranch ? true : false"
        >
        </v-select>
      </div>
      <template #modal-footer>
        <div v-if="employee" 
          class="w-100 d-flex justify-content-between"
        >
          <b-button
            variant="secondary"
            @click="closeEmployeeOrderModal"
          >
            Cancel
          </b-button>
          <b-button
            variant="primary"
            class="ml-2"
            @click="placeOrderAsEmployee"
          >
            Place Order
          </b-button>
        </div>
        <div class="w-100 d-flex justify-content-end" v-if="!employee">
          <b-button
            variant="primary"
            :disabled="!employeePassword || !employeeEmail"
            class="ml-2"
            @click="signInAsEmployee"
          >
            Sign In
          </b-button>
        </div>
      </template>
    </b-modal>
    <!-- END OF MODAL -->

    <template #button-content>
      <feather-icon
        :badge="cart.length"
        class="text-body"
        icon="ShoppingCartIcon"
        size="21"
        ref="cartToggler"
      />
    </template>

    <!-- Header -->
    <li class="dropdown-menu-header">
      <div class="dropdown-header d-flex">
        <h4 class="notification-title mb-0 mr-auto">
          My Cart
        </h4>
        <b-badge
          pill
          variant="light-primary"
        >
          {{ cart.length }} Items
        </b-badge>
      </div>
    </li>

    <!-- Cart Items -->
    <vue-perfect-scrollbar
      v-if="cart.length"
      :settings="perfectScrollbarSettings"
      class="scrollable-container media-list scroll-area"
      tagname="li"
    >
      <b-media
        v-for="item in cart"
        :key="item.id"
      >
        <template #aside>
          <b-img
            :src="item.picture"
            :alt="item.name"
            rounded
            width="62px"
          />
        </template>
        <feather-icon
          icon="XIcon"
          class="cart-item-remove cursor-pointer"
          @click.stop="removeFromCart(item)"
        />
        <div class="media-heading">
          <h6 class="cart-item-title">
            <b-link class="text-body">
              {{ item.name }}
            </b-link>
          </h6>
        </div>

        <div class="cart-item-qty ml-1">
          <b-form-spinbutton
            v-model="item.qty"
            @change="updateSubtotal(item)"
            min="1"
            size="sm"
          />
        </div>

        <h5 class="cart-item-price">
          <vue-numeric read-only separator="." v-model="item.subtotal"></vue-numeric>
        </h5>
      </b-media>
    </vue-perfect-scrollbar>

    <!-- Cart Footer -->
    <li
      v-if="cart.length"
      class="dropdown-menu-footer"
    >
      <div class="d-flex justify-content-between mb-1">
        <h6 class="font-weight-bolder mb-0">
          Total:
        </h6>
        <h6 class="text-primary font-weight-bolder mb-0">
          <vue-numeric read-only separator="." v-model="totalAmount"></vue-numeric>
        </h6>
      </div>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        block
        @click="openIdentityModal()"
      >
        Place Order
      </b-button>
    </li>

    <p
      v-if="!cart.length"
      class="m-0 p-1 text-center"
    >
      Your cart is empty
    </p>
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BBadge, BMedia, BLink, BImg, BFormSpinbutton, BButton,
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'
import { useCart } from '@/composable/useCart' 
import { useTransaction } from '@/composable/useTransaction' 
import { ref, watch, computed, onMounted } from '@vue/composition-api'
import { useUser } from '@/composable/useUser'
import UnitVue from '@/views/unit/Unit.vue'

export default {
  components: {
    BNavItemDropdown,
    BBadge,
    BMedia,
    BLink,
    BImg,
    BFormSpinbutton,
    VuePerfectScrollbar,
    BButton,
  },
  directives: {
    Ripple,
  },
  setup(props, { root }) {
    const cartToggler = ref(null)
    const cartDropdown = ref(null)
    const { createTransaction } = useTransaction()
    const { cart, loadCart, updateCart, removeFromCart, clearCart } = useCart()
    const { loginEmployeeOrder } = useUser()
    loadCart()


    onMounted(() => {
      cartDropdown.value.listenOnRoot('openCartDropdown', (e) => {
        cartDropdown.value.$el.classList.add('show')
      })
    })

    const updateSubtotal = (item) => {
      cart.value.map(x => {
        if (x.id == item.id) x.subtotal = item.qty * item.price
        return x
      })
      updateCart(cart.value)
    }

    const totalAmount = computed({
      get: () => {
        let total = 0
        cart.value.forEach(i => { total += (i.price * i.qty) })
        return total
      },
      set: (val) => {
        let total = 0
        cart.value.forEach(i => { total += (i.price * i.qty) })
        return total
      }
    })

    const modalEmployeeOrder = ref(false)
    const employeeEmail = ref('')
    const employeePassword = ref('')

    const employee = ref(null)
    const employeeBranch = ref(null)
    const employeeUnit = ref(null)

    const selectBranches = ref([])
    const selectedBranch = ref(null)
    const selectUnits = ref([])
    const selectedUnit = ref(null)

    const customerName = ref('')
    const tableNumber = ref('')
    const modalIdentity = ref(false)
    
    const openEmployeeOrderModal = () => {
      employee.value = null 
      employeeUnit.value = null
      employeeEmail.value = ''
      employeePassword.value = ''
      modalEmployeeOrder.value = true
    }

    const closeEmployeeOrderModal = () => {
      employee.value = null 
      employeeUnit.value = null
      employeeEmail.value = ''
      employeePassword.value = ''
      modalEmployeeOrder.value = false
    }

    const openIdentityModal = () => {
      customerName.value = '' 
      tableNumber.value = '' 
      modalIdentity.value = true
    }

    const closeIdentityModal = () => {
      customerName.value = '' 
      tableNumber.value = '' 
      modalIdentity.value = false
    }

    const submitHandler = (response, error) => {
      if (error && error.message) return root.$notify.error(error.message)
      else if (response) {
        root.$notify.success(response.message)
        if (modalEmployeeOrder.value) closeEmployeeOrderModal()
        if (modalIdentity.value) closeIdentityModal()
        clearCart()
      }
    }

    const placeOrderAsEmployee = async () => {
      const items = cart.value.map(item => {
        return {
          product_id: item.id,
          quantity: item.qty,
          note: item.note,
        }
      })

      const payload = {
        employee_id: employee.value.id,
        employee_unit_id: selectedUnit.value,
        items
      }

      const [response, error] = await createTransaction(payload)
      submitHandler(response, error)
    }

    const placeOrder = async () => {
      const items = cart.value.map(item => {
        return {
          product_id: item.id,
          quantity: item.qty,
          note: item.note
        }
      })

      const payload = {
        customer_name: customerName.value,
        table_number: tableNumber.value,
        items
      }
      
      const [response, error] = await createTransaction(payload)
      submitHandler(response, error)
    }

    const signInAsEmployee = async () => {
      const payload = {
        email: employeeEmail.value,
        password: employeePassword.value,
      }

      const [response, error] = await loginEmployeeOrder(payload)
      if (error) root.$notify.error(error.message)
      if (response) root.$notify.success(response.message)
      employee.value = response.data.user
    }

    watch(employee, x => {
      if (!x) return;
      selectBranches.value = x.company.branches.map(branch => {
        return {
          value: branch.id,
          text: branch.name
        }
      })
    })

    watch(selectedBranch, x => {
      if (!employee) return;
      selectedUnit.value = null
      selectUnits.value = employee.value.company.units.filter(unit => unit.branch_id === x).map(unit => {
        return {
          value: unit.id,
          text: unit.name
        }
      })
    })

    return {
      // employee order
      placeOrderAsEmployee,
      employee,
      employeeUnit,
      employeeBranch,
      employeeEmail,
      employeePassword,
      openEmployeeOrderModal,
      closeEmployeeOrderModal,
      modalEmployeeOrder,
      signInAsEmployee,
      selectBranches,
      selectedBranch,
      selectUnits,
      selectedUnit,

      // identity 
      customerName,
      tableNumber,
      modalIdentity,
      openIdentityModal,
      closeIdentityModal,
      
      // others
      cartToggler,
      cartDropdown,
      placeOrder,
      totalAmount,
      updateSubtotal,
      
      ...useCart(),
    }
  },
  data() {
    return {
      items: [],
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
        wheelPropagation: false,
      },
    }
  },
  methods: {
    removeItemFromCart(productId) {
      this.$store.dispatch('app-ecommerce/removeProductFromCart', { productId })
        .then(() => {
          const itemIndex = this.items.findIndex(p => p.id === productId)
          this.items.splice(itemIndex, 1)

          // Update count in cart items state
          this.$store.commit('app-ecommerce/UPDATE_CART_ITEMS_COUNT', this.items.length)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.dropdown-cart {
  .media {
    .media-aside {
      align-items: center;
    }
  }
}
</style>
