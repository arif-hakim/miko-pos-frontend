<template>
  <div style="height: inherit">
    <!-- MODAL ORDER ITEM -->
    <b-modal
      centered
      header-bg-variant="light"
      id="modalOrder"
      v-model="modalOrder"
      ref="modal"
      title="Add To Cart"
    >
      <template #modal-header>
        <div class="w-100">
            <b>Add To Cart</b>
        </div>
      </template>
      <div class="text-center">
        <b-img
          :src="modalData.picture"
          width="300"
        ></b-img>
      </div>
      <b-row class="mb-1">
        <b-col cols="6">
          <h4 class="text-primary">{{ modalData.name }}</h4>
        </b-col>
        <b-col cols="6" class="text-right">
          <h4 class="text-primary">
            <vue-numeric read-only separator="." v-model="modalData.subtotal"></vue-numeric>
          </h4>
        </b-col>
        <b-col cols="12">{{ modalData.description }}</b-col>
        <b-col cols="8" offset="2" class="d-flex mt-1 py-1">
            <b-button @click="() => modalData.qty == 1 ? '' : --modalData.qty" variant="danger">
              <feather-icon
                icon="MinusIcon"
                size="14"
              />
            </b-button>
            <b-input v-model="modalData.qty" min="1" class="mx-2 text-center"></b-input>
            <b-button @click="() => ++modalData.qty" variant="primary">
              <feather-icon
                icon="PlusIcon"
                size="15"
              />
            </b-button>
        </b-col>
      </b-row>
      <b-form-group
        class="border-top pt-1"
        label="Note"
        label-for="note-item"
      >
        <b-form-textarea
          id="note-item"
          required
          v-model="modalData.note"
        >
        </b-form-textarea>
      </b-form-group>

      <template #modal-footer>
        <div class="w-100 d-flex justify-content-between">
          <b-button
            variant="secondary"
            @click="closeOrderModal"
          >
            Cancel
          </b-button>
          <b-button
            variant="primary"
            class="ml-2"
            @click="doAddToCart()"
          >
            Add To Cart
          </b-button>
        </div>
      </template>
    </b-modal>

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
    <div class="ecommerce-searchbar mt-1">
      <b-row>
        <b-col cols="12">
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
    </div>

    <!-- Prodcuts -->
    <section :class="itemView">
      <b-card
        v-for="product in products"
        :key="product.id"
        class="ecommerce-card product-card"
        no-body
        @click="openOrderModal(product)"
      >
        <div class="item-img justify-content-center">
            <b-img
              :alt="`${product.name}-${product.id}`"
              fluid
              class="card-img-top"
              :src="product.picture"
              @error="product.picture = product.default_picture"
            />
        </div>

        <!-- Product Details -->
        <b-card-body>
          <div class="item-wrapper">
          </div>
          <h6 class="item-name">
            <b-row>
              <b-col cols="6">
                  <h4
                    class="text-primary"
                  >
                    {{ product.name }}
                  </h4>
              </b-col>
              <b-col cols="6 text-right">
                <h4 class="item-price">
                  <vue-numeric v-if="product.stock > 0" read-only separator="." v-model="product.selling_price"></vue-numeric>
                  <b-badge variant="danger" v-else style="font-size:13px;">Sold Out</b-badge>
                </h4>
              </b-col>
              <b-col cols="12">
                <b-card-text class="item-description">
                  {{ product.description || '-' }}
                </b-card-text>
              </b-col>
            </b-row>
          </h6>
        </b-card-body>

        <!-- Product Actions -->
        <div class="item-options text-center">
          <div class="item-wrapper">
            <div class="item-cost">
              <h4 class="item-price">
                {{ product.selling_price }}
              </h4>
            </div>
          </div>
          <!-- <b-button
            variant="light"
            tag="a"
            class="btn-wishlist"
            @click="toggleProductInWishlist(product)"
          >
            <feather-icon
              icon="HeartIcon"
              class="mr-50"
              :class="{'text-danger': product.isInWishlist}"
            />
            <span>Wishlist</span>
          </b-button> -->
          <!-- <b-button
            variant="primary"
            tag="a"
            class="btn-cart"
            @click="openOrderModal(product)"
          >
            <feather-icon
              icon="ShoppingCartIcon"
              class="mr-50"
            />
            <span>Add to Cart</span>
          </b-button> -->
        </div>
      </b-card>
    </section>

    <!-- Pagination -->
    <section>
      <b-row>
        <b-col cols="12">
          <b-pagination
            v-model="filters.page"
            :total-rows="products.length"
            :per-page="filters.perPage"
            first-number
            align="center"
            last-number
            prev-class="prev-item"
            next-class="next-item"
          >
            <template #prev-text>
              <feather-icon
                icon="ChevronLeftIcon"
                size="18"
              />
            </template>
            <template #next-text>
              <feather-icon
                icon="ChevronRightIcon"
                size="18"
              />
            </template>
          </b-pagination>
        </b-col>
      </b-row>
    </section>

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
      filters, filterOptions, sortBy, sortByOptions,
    } = useShopFiltersSortingAndPagination()

    const { handleCartActionClick, toggleProductInWishlist } = useEcommerceUi()

    const {
      itemView, itemViewOptions, totalProducts,
    } = useShopUi()

    // const { products, fetchProducts } = useShopRemoteData()
    const { mqShallShowLeftSidebar } = useResponsiveAppLeftSidebarVisibility()

    // fetchShopProducts()
    // ^^^^ UI DEPENDENCIES
    // =====================
    // Write code below..

    const modalOrder = ref(false)

    const { fetchProducts, products } = useProduct()
    const { cart, addToCart, removeFromCart } = useCart()

    onMounted(async () => {
      await fetchProducts()
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
      doAddToCart,
      closeOrderModal,
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
    }
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

.item-view-radio-group ::v-deep {
  .btn {
    display: flex;
    align-items: center;
  }
}
</style>
