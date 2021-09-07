<template>
  <div style="height: inherit">
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

    <!-- ECommerce Header -->
    <section id="ecommerce-header">
      <div class="row">
        <div class="col-sm-12">
          <div class="w-100">
            <div class="view-options d-flex justify-content-between">
              <!-- Sort Button -->
              <!-- <b-dropdown
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                :text="sortBy.text"
                right
                variant="outline-primary"
              >
                <b-dropdown-item
                  v-for="sortOption in sortByOptions"
                  :key="sortOption.value"
                  @click="sortBy=sortOption"
                >
                  {{ sortOption.text }}
                </b-dropdown-item>
              </b-dropdown> -->

              <!-- Item View Radio Button Group  -->
              <!-- <b-form-radio-group
                v-model="itemView"
                class="ml-1 list item-view-radio-group"
                buttons
                size="sm"
                button-variant="outline-primary"
              >
                <b-form-radio
                  v-for="option in itemViewOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  <feather-icon
                    :icon="option.icon"
                    size="18"
                  />
                </b-form-radio>
              </b-form-radio-group> -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Overlay -->
    <div class="body-content-overlay" />

    <!-- Searchbar -->
    <!-- <div class="ecommerce-searchbar mt-1">
      <b-row>
        <b-col cols="9">
          <b-input-group class="input-group-merge">
            <b-form-input
              v-model="filters.q"
              placeholder="Search Product"
              class="search-product"
            />
            <b-input-group-append is-text>
              <feather-icon
                icon="SearchIcon"
                class="text-muted"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>
      </b-row>
    </div> -->

    <!-- Prodcuts -->
    <b-row>
      <b-col cols="9">
        <div class="ecommerce-searchbar">
          <b-input-group class="input-group-merge">
            <b-form-input
              v-model="filters.q"
              placeholder="Search Product"
              class="search-product"
            />
            <b-input-group-append is-text>
              <feather-icon
                icon="SearchIcon"
                class="text-muted"
              />
            </b-input-group-append>
          </b-input-group>
        </div>
        <!-- Dashboard -->
        <b-card class="mt-2">
          <b-table
          style="min-height:200px;"
          hover
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="orderSummary"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          :filter="filter"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
          show-empty
        >
          <template #empty>
            <div class="text-center">
              <span v-if="isLoading">Loading..</span>
              <span v-else>No data available</span>
            </div>
          </template>
          <template #cell(picture)="data">
            <img 
              v-if="data.item.picture"
              class="rounded"
              width="50" 
              :src="data.item.picture" 
              :alt="data.item.name"
              @error="data.item.picture = data.item.default_picture"
            />
          </template>
          <template #cell(base_price)="data">
            <vue-numeric separator="." v-model="data.item.base_price" read-only></vue-numeric>
          </template>
          <template #cell(selling_price)="data">
            <vue-numeric separator="." v-model="data.item.selling_price" read-only></vue-numeric>
          </template>
          <template #cell(action)="data">
            <div class="d-flex align-items-center">
              <b-button 
                size="sm" 
                variant="danger"
                @click="data.item.qty > 0 ? data.item.qty -= 1 : ''"
              >
                 <feather-icon
                  icon="MinusIcon"
                  size="14"
                />
              </b-button>
              <b-input size="sm" class="mx-1 text-center bg-white" style="width:50px;" readonly v-model="data.item.qty"></b-input>
              <b-button 
                size="sm" 
                variant="primary" 
                @click="data.item.qty + 1 <= data.item.stock ? data.item.qty += 1 : ''"
              >
                 <feather-icon
                    icon="PlusIcon"
                    size="14"
                  />
              </b-button>
            </div>
          </template>
          <template #cell(note)="data">
            <b-input v-model="data.item.note"></b-input>
          </template>
        </b-table>
        </b-card>
      </b-col>
      <b-col cols="3">
        <b-card>
          <b-card-body>
            <h4>Order Summary</h4>
            <h5>Items</h5>
            <b-row v-for="item in orderSummary.filter(x => x.qty > 0)" :set="price = item.qty * item.selling_price" :key="item.id" class="border-top py-1 mt-1">
              <b-col cols="4">
                {{ item.name }}<br>
                <small>{{ item.note }}</small>
              </b-col>
              <b-col cols="3">x{{ item.qty }}</b-col>
              <b-col cols="5" class="text-right">Rp. 
                <vue-numeric separator="." v-model="price" read-only></vue-numeric>    
              </b-col>
            </b-row>
            <hr>
            <b-row>
              <b-col cols="6" class="font-weight-bold">Subtotal</b-col>
              <b-col cols="6" class="font-weight-bold text-right">Rp. {{ toThousands(getSubtotal()) }}</b-col>
            </b-row>
            <b-row>
              <b-col cols="6" class="">Tax ({{ unit ? unit.tax : 0 }}%)</b-col>
              <b-col cols="6" class="text-right">Rp. {{ toThousands(calculateTax()) }}</b-col>
            </b-row>
            <hr>
            <b-row>
              <b-col cols="6" class=""><h4>Total</h4></b-col>
              <b-col cols="6" class="text-right"><h4>Rp. {{ toThousands(getGrandTotal()) }}</h4></b-col>
            </b-row>
            <b-button variant="primary" block class="mt-3" @click="openIdentityModal()">Place Order</b-button>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>

    <!-- Sidebar -->
    <portal to="content-renderer-sidebar-detached-left">
      <shop-left-filter-sidebar
        :filters="filters"
        :filter-options="filterOptions"
        :mq-shall-show-left-sidebar.sync="mqShallShowLeftSidebar"
      />
    </portal>
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import { watch, ref, onMounted, reactive } from '@vue/composition-api'
import { useResponsiveAppLeftSidebarVisibility } from '@core/comp-functions/ui/app'
import ShopLeftFilterSidebar from '@/views/apps/e-commerce/e-commerce-shop/ECommerceShopLeftFilterSidebar.vue'
import { useShopFiltersSortingAndPagination, useShopUi, useShopRemoteData } from '@/views/apps/e-commerce/e-commerce-shop/useECommerceShop'
import { useEcommerceUi } from '@/views/apps/e-commerce/useEcommerce'
import { useProduct } from '@/composable/useProduct'
import { useCart } from '@/composable/useCart'
import { useUnit } from '@/composable/useUnit'
import { useTransaction } from '@/composable/useTransaction' 
import { useUser } from '@/composable/useUser'
import { toThousands } from '@/libs/formatter'

export default {
  directives: {
    Ripple,
  },
  components: {
    // SFC
    ShopLeftFilterSidebar,
  },
  setup(props, { root, emit }) {
    const {
      filters, filterOptions, sortByOptions,
    } = useShopFiltersSortingAndPagination()

    const { handleCartActionClick, toggleProductInWishlist } = useEcommerceUi()

    const {
      itemView, itemViewOptions, totalProducts,
    } = useShopUi()

    // const { products, fetchProducts } = useShopRemoteData()
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()

    // ^^^^ UI DEPENDENCIES
    // =====================
    // Write code below..
    const { fetchProducts, products, isLoading } = useProduct()
    const { cart, addToCart, removeFromCart, clearCart} = useCart()
    const { activeUnit, fetchUnitByID, unit } = useUnit()
    const { createTransaction } = useTransaction()
    const { loginEmployeeOrder } = useUser()

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

    const modalOrder = ref(false)
    const orderSummary = ref([])

    const placeOrderAsEmployee = async () => {
      const items = orderSummary.value.filter(x => x.qty).map(item => {
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
      const items = orderSummary.value.filter(x => x.qty).map(item => {
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
    
    const getSubtotal = () => {
      return orderSummary.value.filter(x => x.qty).reduce((a, b) => {
        let total = typeof a === 'object' ? (a.qty * a.selling_price) + (b.qty * b.selling_price) : b.qty * b.selling_price
        return total
      }, 0)
    }

    const calculateTax = () => {
      const subtotal = getSubtotal(orderSummary.value)
      const tax = unit.value ? unit.value.tax : 0
      return subtotal * tax / 100
    }

    const getGrandTotal = () => {
      const subtotal = getSubtotal(orderSummary.value)
      const tax = calculateTax()
      return subtotal + tax
    }

    const resetOrderSummary = () => {
      orderSummary.value = products.value.map(x => {
        return {
          ...x,
          qty: 0,
          note: '',
        }
      })
    }

    onMounted(async () => {
      await fetchUnitByID(activeUnit.value.id)
      await fetchProducts()
      resetOrderSummary()
    })

    const modalData = reactive({
      id: null,
      name: null,
      price: 0,
      subtotal: 0,
      description: null,
      note: null,
      picture: null,
      qty: 1,
      note: '',
    })

    const openOrderModal = (product) => {
      if (product.stock < 1) return
      let item = Object.assign({}, product) 
      let qty, note

      let itemInCart = cart.value.filter(x => x.id == item.id)
      if (itemInCart.length > 0) {
        qty = itemInCart[0].qty
        note = itemInCart[0].note
      }

      modalData.id = item.id
      modalData.name = item.name
      modalData.price = item.selling_price
      modalData.description = item.description
      modalData.subtotal = item.selling_price * modalData.qty
      modalData.note = item.note
      modalData.picture = item.picture
      modalData.qty = qty ? qty : 1
      modalData.note = note ? note : ''
      modalOrder.value = true
    }

    const doAddToCart = async () => {
      const response = await addToCart(modalData)
      if (response) {
        root.$notify.success('Item added to cart!')
      }
      modalOrder.value = false
    }

    const submitHandler = async (response, error) => {
      if (error && error.message) return root.$notify.error(error.message)
      else if (response) {
        root.$notify.success(response.message)
        if (modalEmployeeOrder.value) closeEmployeeOrderModal()
        if (modalIdentity.value) closeIdentityModal()
        await fetchProducts()
        clearCart()
        resetOrderSummary()
      }
    }

    const closeOrderModal = () => {
      // modalData.id = null
      // modalData.name = null
      // modalData.price = 0
      // modalData.description = null
      // modalData.note = null
      // modalData.picture = null
      // modalData.qty = 0
      // modalData.note = ''
      modalOrder.value = false 
    }

    const sortBy = ref('') 
    watch([filters, sortBy], async (filter) => {
      let search = filter[0].q
      await fetchProducts({ search })
    }, {
      deep: true,
    })

    watch(() => modalData.qty, (val) => {
      if (val > 0) modalData.subtotal = modalData.price * val
    })

    return {
      signInAsEmployee,
      placeOrderAsEmployee,
      placeOrder,
      customerName,
      tableNumber,
      modalIdentity,
      employee,
      employeeEmail,
      employeePassword,
      employeeBranch,
      selectBranches,
      selectedBranch,
      selectUnits,
      selectedUnit,
      loginEmployeeOrder,
      openEmployeeOrderModal,
      closeEmployeeOrderModal,
      openIdentityModal,
      closeIdentityModal,
      modalIdentity,
      modalEmployeeOrder,
      unit,
      calculateTax,
      getSubtotal,
      getGrandTotal,
      isLoading,
      doAddToCart,
      closeOrderModal,
      orderSummary,
      modalData,
      openOrderModal,
      filters,
      filterOptions,
      sortBy,
      sortByOptions,
      modalOrder,

      // useShopUi
      itemView,
      itemViewOptions,
      totalProducts,
      toggleProductInWishlist,
      handleCartActionClick,

      // useShopRemoteData
      products,

      // mqShallShowLeftSidebar
      mqShallShowLeftSidebar,
      toThousands,
    }
  },
  data() {
    return {
      perPage: 5,
      pageOptions: [3, 5, 10],
      currentPage: 1,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        { key: 'picture', label: '#' },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'code', label: 'Code', sortable: true },
        { key: 'category.name', label: 'Category', sortable: true },
        { key: 'selling_price', label: 'Price', sortable: true },
        { key: 'stock', label: 'Stock', sortable:true },
        { key: 'action', label: 'Action'},
        { key: 'note', label: 'Note'},
      ],
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>

<style lang="scss">
@import "~@core/scss/base/pages/app-ecommerce.scss";
</style>

<style lang="scss" scoped>

.product-card {
  cursor: pointer;
}

/* .item-view-radio-group ::v-deep {
  .btn {
    display: flex;
    align-items: center;
  } */
/* } */
</style>
