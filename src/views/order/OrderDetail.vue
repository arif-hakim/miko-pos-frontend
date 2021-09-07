<template>
  <section class="invoice-add-wrapper">
    <b-row
      class="invoice-add"
    >
      <!-- Col: Left (Invoice Container) -->
      <b-col
        cols="12"
        v-if="transaction"
      >
        <b-form @submit.prevent>
          <b-card
            no-body
            class="invoice-preview-card"
          >
            <!-- Header -->
            <b-card-body class="invoice-padding pb-0">

              <div class="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0 mb-0">

                <!-- Header: Left Content -->
                <div>
                  <div>
                    <b-input-group class="input-group-merge invoice-edit-input-group disabled">
                      <b-input-group-prepend is-text>
                        <feather-icon icon="HashIcon" />
                      </b-input-group-prepend>
                      <b-form-input
                        id="invoice-data-id"
                        v-model="transaction.code"
                        disabled
                      />
                    </b-input-group>
                  </div>
                </div>

                <!-- Header: Right Content -->
                <div class="invoice-number-date mt-md-0 mt-2">
                  <!-- <div class="d-flex align-items-center mb-1">
                    <b-input
                      class="form-control invoice-edit-input"
                      disabled
                      :value="moment(transaction.created_at).format('DD/MM/YYYY')"
                    />
                  </div> -->
                </div>
              </div>
            </b-card-body>
            <hr>

            <!-- Spacer -->
            <!-- Invoice Client & Payment Details -->
            <b-card-body
              class="invoice-padding pt-0"
            >
              <b-row class="invoice-spacing">

                <!-- Col: Invoice To -->
                <b-col
                  cols="12"
                  md="6"
                  class="mb-lg-1 pl-0"
                >
                  <b-row class="mb-1" v-if="transaction.customer_name">
                    <b-col cols="12" md="4">Customer Name</b-col>
                    <b-col cols="12" md="8">{{ transaction.customer_name }}</b-col>
                  </b-row>
                  <b-row class="mb-1" v-if="transaction.employee">
                    <b-col cols="12" md="4">Employee Name</b-col>
                    <b-col cols="12" md="8">{{ transaction.employee.firstname }} {{ transaction.employee.lastname }}</b-col>
                  </b-row>
                  <b-row class="mb-1" v-if="transaction.employee">
                    <b-col cols="12" md="4">Sent to</b-col>
                    <b-col cols="12" md="8">
                      <b-badge variant="primary">{{ transaction.employee_unit.branch.name }} - {{ transaction.employee_unit.name }}</b-badge>
                    </b-col>
                  </b-row>
                  <b-row class="mb-1">
                    <b-col cols="12" md="4">Status</b-col>
                    <b-col cols="12" md="8">
                      <b-badge variant="primary" v-if="transaction.payment_status == 'Internal'">{{ transaction.payment_status }}</b-badge>
                      <b-badge variant="warning" v-if="transaction.payment_status == 'Unpaid'">{{ transaction.payment_status }}</b-badge>
                      <b-badge variant="success" v-if="transaction.payment_status == 'Paid'">{{ transaction.payment_status }}</b-badge>
                      <b-badge variant="danger" v-if="transaction.payment_status == 'Canceled'">{{ transaction.payment_status }}</b-badge>
                    </b-col>
                  </b-row>
                  <b-row class="mb-1">
                    <b-col cols="12" md="4">Date</b-col>
                    <b-col cols="12" md="8">{{ moment(transaction.created_at).format('DD MMMM YYYY HH:mm') }}</b-col>
                  </b-row>
                  <b-row class="mb-1" v-if="transaction.paid">
                    <b-col cols="12" md="4">Handled By</b-col>
                    <b-col cols="12" md="8">
                      {{ transaction.officer_name }}
                    </b-col>
                  </b-row>
                </b-col>
                <b-col
                  cols="6"
                  class="d-flex justify-content-end"
                  order="1"
                  order-md="2"
                >
                  <div class="invoice-total-wrapper border rounded p-1" style="max-width:250px;">
                    <div class="invoice-total-item">
                      <p class="invoice-total-title">
                        Subtotal:
                      </p>
                      <p class="invoice-total-amount">
                        <vue-numeric read-only separator="." v-model="transaction.transaction_value"></vue-numeric>
                      </p>
                    </div>
                    <div class="invoice-total-item">
                      <p class="invoice-total-title">
                        Tax ({{ transaction.tax }}%):
                      </p>
                      <p class="invoice-total-amount">
                        {{ toThousands(transaction.transaction_value * transaction.tax / 100) }}
                      </p>
                    </div>
                    <hr class="my-50">
                    <div class="invoice-total-item">
                      <p class="invoice-total-title">
                        Total:
                      </p>
                      <p class="invoice-total-amount">
                        <vue-numeric read-only separator="." v-model="transaction.grand_total"></vue-numeric>
                      </p>
                    </div>
                    <div class="invoice-total-item" v-if="transaction.paid">
                      <p class="invoice-total-title">
                        Paid:
                      </p>
                      <p class="invoice-total-amount">
                        <vue-numeric read-only separator="." v-model="transaction.paid"></vue-numeric>
                      </p>
                    </div>
                    <hr v-if="transaction.change_value">
                    <div class="invoice-total-item" v-if="transaction.change_value">
                      <p class="invoice-total-title">
                        Change:
                      </p>
                      <p class="invoice-total-amount">
                        <vue-numeric read-only separator="." v-model="transaction.change_value"></vue-numeric>
                      </p>
                    </div>
                  </div>
                </b-col>
              </b-row>
            </b-card-body>

            <!-- Invoice Description: Total -->
            <b-card-body class="invoice-padding pb-0">
              <b-row>
                <!-- Col: Sales Persion -->
                <b-col
                  cols="12"
                  class="align-items-center"
                  order="2"
                  order-md="1"
                >
                  <!-- Selected Client -->
                  <div
                    class="mt-1"
                  >
                    <b-table
                      style="min-height:200px;"
                      class="border rounded"
                      hover
                      responsive
                      :per-page="perPage"
                      :current-page="currentPage"
                      :items="transaction.transaction_details"
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
                      <template #cell(no)="data">
                        {{ ++data.index }}
                      </template>
                      <template #cell(code)="data">
                        {{ data.item.items.code }}
                      </template>
                      <template #cell(name)="data">
                        {{ data.item.items.name }}
                      </template>
                      <template #cell(price)="data">
                        <vue-numeric separator="." v-model="data.item.price" read-only></vue-numeric>
                      </template>
                      <template #cell(total_price)="data">
                        <vue-numeric separator="." v-model="data.item.total_price" read-only></vue-numeric>
                      </template>
                      <template #cell(note)="data">
                        <span>{{ data.item.note }}</span>
                      </template>
                    </b-table>
                    <b-row>
                      <b-col
                        sm="4"
                        md="2"
                      >
                        <b-form-group
                          class="mb-0"
                        >
                          <label class="d-inline-block text-sm-left mr-50">Per page</label>
                          <b-form-select
                            id="perPageSelect"
                            v-model="perPage"
                            size="sm"
                            :options="pageOptions"
                            class="w-50"
                          />
                        </b-form-group>
                      </b-col>

                      <b-col
                        sm="8"
                        md="10"
                      >
                        <b-pagination
                          v-model="currentPage"
                          :total-rows="totalRows"
                          :per-page="perPage"
                          align="right"
                          size="sm"
                          class="my-0"
                        />
                      </b-col>
                    </b-row>
                  </div>
                </b-col>
              </b-row>
            </b-card-body>

            <!-- Spacer -->
            <hr class="invoice-spacing">
          </b-card>
        </b-form>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import Logo from '@core/layouts/components/Logo.vue'
import { ref, onMounted } from '@vue/composition-api'
import { useTransaction } from '@/composable/useTransaction'
import { VBToggle } from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import moment from 'moment'
import { toThousands } from '@/libs/formatter'

export default {
  props: [
    'value'
  ],
  components: {
    flatPickr,
    vSelect,
    Logo,
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  setup(props, { root }) {
    const { id } = root.$route.params
    const { transaction, fetchTransactionByID } = useTransaction()
    const totalRows = ref(0)

    onMounted(async () => {
      await fetchTransactionByID(id)
      totalRows.value = transaction.value.transaction_details.length
    })

    return {
      ...useTransaction(),
      toThousands,
      totalRows,
      moment,
      perPage: 5,
      pageOptions: [3, 5, 10],
      currentPage: 1,
      sortBy: '',
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
        {
          key: 'no', label: '#',
        },
        { key: 'code', label: 'Code', sortable: true },
        { key: 'name', label: 'Product Name', sortable: true },
        { key: 'price', label: 'Price', sortable: true },
        { key: 'quantity', label: 'Qty', sortable: true },
        { key: 'total_price', label: 'Total Price', sortable: true },
        { key: 'note', label: 'Note'},
      ],
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

<style lang="scss" scoped>
@import "~@core/scss/base/pages/app-invoice.scss";

.form-item-section {
background-color:$product-details-bg;
}

.form-item-action-col {
  width: 27px;
}

.repeater-form {
  // overflow: hidden;
  transition: .35s height;
}

.v-select {
  &.item-selector-title,
  &.payment-selector {
    background-color: #fff;

    .dark-layout & {
      background-color: unset;
    }
  }
}

.dark-layout {
  .form-item-section {
    background-color: $theme-dark-body-bg;

    .row .border {
      background-color: $theme-dark-card-bg;
    }

  }
}
</style>
