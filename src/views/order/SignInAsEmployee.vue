<template>
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
          <b-link>
            or sign in as employee
          </b-link>
      </div>
    </template>
    <b-form-group
      class="border-top pt-1"
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
          :disabled="!customerName"
          @click="placeOrder"
        >
          Place Order
        </b-button>
      </div>
    </template>
  </b-modal>
  <!-- END OF MODAL -->
</template>
<script>
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: ['value'],
  setup(props, { root }) {
    
  },
})
</script>
