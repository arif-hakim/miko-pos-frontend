<template>
  <div>
    <b-card>
      <b-col
        cols="12"
        md="4"
      >
        <!-- <b-form-datepicker 
          id="example-datepicker" 
          v-model="dateFilter" 
          class="mb-2"
          :date-format-options="{ year: 'numeric', month: 'long', day: '2-digit', weekday: 'long' }"
        ></b-form-datepicker> -->
        <date-range-picker
            ref="picker"
            opens="right"
            :locale-data="{ firstDay: 1, format: 'dd mmmm yyyy' }"
            :singleDatePicker="false"
            appendToBody
            showDropdowns
            autoApply
            @update="dateFilterChanges"
            v-model="dateFilter"
        >
        </date-range-picker>
      </b-col>
    </b-card>
    <b-row>
      <b-col 
        md="2"
        cols="6"
      >
        <b-card
          body-class="pb-50"
        >
          <h6>Transactions</h6>
          <h2 class="font-weight-bolder mb-1 text-primary">
            {{ transactions.length }}
          </h2>
          <!-- chart -->
        </b-card>
      </b-col>
      <b-col 
        md="2"
        cols="6"
      >
        <b-card
          body-class="pb-50"
        >
          <h6>Profit</h6>
          <h2 class="font-weight-bolder mb-1 text-success">
            <vue-numeric separator="." read-only v-model="profit"></vue-numeric>
          </h2>
          <!-- chart -->
        </b-card>
      </b-col>
    </b-row>
    <b-card>
      <b-row>
        <b-col
          md="4"
          class="mb-1"
        >
          <b-form-group
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filterInput"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              />
              <b-input-group-append>
                <b-button
                  :disabled="!filter"
                  @click="filter = ''"
                >
                  Clear
                </b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <b-col
          md="4"
          class="mb-1 text-right"
        >
          <b-badge class="mr-1" variant="success">Paid {{ transactions.filter(x => x.payment_status == 'Paid').length }}</b-badge>
          <b-badge class="mr-1" variant="warning">Unpaid {{ transactions.filter(x => x.payment_status == 'Unpaid').length }}</b-badge>
          <b-badge class="mr-1" variant="danger">Canceled {{ transactions.filter(x => x.payment_status == 'Canceled').length }}</b-badge>
          <b-badge class="mr-1" variant="primary">Internal {{ transactions.filter(x => x.payment_status == 'Internal').length }}</b-badge>
        </b-col>
        <b-col
          md="4"
          class="mb-1 text-right"
        >
          <router-link
            tag="button"
            class="btn btn-sm btn-primary"
            to="/order/create"
          >
            <feather-icon
              icon="PlusIcon"
            />
            Make Order
          </router-link>
        </b-col>

        <b-col cols="12">
          <b-table
            style="min-height:200px;"
            hover
            responsive
            :per-page="perPage"
            :current-page="currentPage"
            :items="transactions"
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
            <template #cell(date)="data">
              {{ moment(data.item.created_at).format('DD MMM YYYY hh:mm') }} 
            </template>
            <template #cell(no)="data">
              {{ data.item.table_number ? data.item.table_number : '-'  }} 
            </template>
            <template #cell(customer_name)="data">
              <span v-if="data.item.customer_name">{{ data.item.customer_name }}</span>
              <span v-if="data.item.employee">
                {{ data.item.employee.firstname }} {{ data.item.employee.lastname }}<br>
                <b-badge style="font-size:9px;" pill variant="primary">{{ data.item.employee_unit.branch.name }} - {{ data.item.employee_unit.name }}</b-badge>
              </span>
            </template>
            <template #cell(payment_status)="data">
              <b-badge pill variant="warning" v-if="data.item.payment_status == 'Unpaid'">{{ data.item.payment_status }}</b-badge>
              <b-badge pill variant="success" v-if="data.item.payment_status == 'Paid'">{{ data.item.payment_status }}</b-badge>
              <b-badge pill variant="danger" v-if="data.item.payment_status == 'Canceled'">{{ data.item.payment_status }}</b-badge>
              <b-badge pill variant="primary" v-if="data.item.payment_status == 'Internal'">{{ data.item.payment_status }}</b-badge>
            </template>
            <template #cell(description)="data">
              {{ data.description || '-' }}
            </template>
            <template #cell(transaction_value)="data">
              <vue-numeric separator="." v-model="data.item.grand_total" read-only></vue-numeric>
            </template>
            <template #cell(paid)="data">
              <vue-numeric v-if="data.item.paid" separator="." v-model="data.item.paid" read-only></vue-numeric>
              <span v-else>-</span>
            </template>
            <template #cell(items)="data">
              <vue-numeric separator="." v-model="data.item.transaction_details.length" read-only></vue-numeric>
            </template>
            <template #cell(action)="data">
              <b-dropdown id="dropdown-1" text="Status" variant="warning" class="mr-1" v-if="!['Paid', 'Canceled', 'Internal'].includes(data.item.payment_status)">
                <b-dropdown-item @click="pay(data.item)">Pay</b-dropdown-item>
                <b-dropdown-item variant="danger" @click="doUpdate(data.item.id, 'Canceled')">Cancel</b-dropdown-item>
              </b-dropdown>
              <b-dropdown id="dropdown-1" text="More" variant="info" class="">
                <b-dropdown-item :to="`/order/${data.item.id}`">Details</b-dropdown-item>
                <b-dropdown-divider></b-dropdown-divider>
                <b-dropdown-item variant="danger" @click="doDelete(data.item.id)">Delete</b-dropdown-item>
              </b-dropdown>
            </template>
          </b-table>
        </b-col>
        
        <b-col
          md="2"
          sm="4"
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

      <!-- MODAL Pay -->
      <b-modal
        v-if="transactionToPay"
        centered
        header-bg-variant="light"
        id="payModal"
        v-model="payModal"
        ref="modal"
      >
        <template #modal-header>
          <div class="w-100 d-flex justify-content-between">
              <b>Pay</b>
          </div>
        </template>
        <b-form-group
          class="pt-1"
          label="Code"
          label-for="customer-name-item"
        >
          <b-form-input
            id="v-Product-code"
            disabled
            v-model="transactionToPay.code"
          />
        </b-form-group>
        <b-form-group
          class="pt-1"
          label="Customer Name"
          label-for="customer-name-item"
        >
          <b-form-input
            id="v-Product-name"
            disabled
            v-model="transactionToPay.customer_name"
          />
        </b-form-group>
        <b-form-group
          class="pt-1"
          label="Subtotal"
          label-for="customer-name-item"
        >
          <vue-numeric disabled separator="." class="form-control" v-model="transactionToPay.transaction_value" />
        </b-form-group>
        <b-form-group
          class="pt-1"
          label="Tax (%)"
          label-for="customer-name-item"
        >
          <b-form-input
            id="v-Product-tax"
            disabled
            v-model="transactionToPay.tax"
          />
        </b-form-group>
        <b-form-group
          class="pt-1"
          label="Grand Total"
          label-for="customer-name-item"
        >
          <vue-numeric disabled separator="." class="form-control" v-model="transactionToPay.grand_total" />
        </b-form-group>
        <hr>
        <b-form-group
          class="pt-1"
          label="Money Paid"
          label-for="customer-name-item"
        >
          <vue-numeric required separator="." class="form-control" v-model="moneyPaid" />
        </b-form-group>
        <template #modal-footer>
          <div class="w-100 d-flex justify-content-between">
            <b-button
              variant="secondary"
              @click="cancelPay"
            >
              Cancel
            </b-button>
            <b-button
              variant="primary"
              class="ml-2"
              :disabled="!moneyPaid || moneyPaid < transactionToPay.grand_total"
              @click="doUpdate(transactionToPay.id, 'Paid')"
            >
              Pay
            </b-button>
          </div>
        </template>
      </b-modal>
      <!-- END OF MODAL -->
    </b-card>
  </div>
</template>

<script>

import moment from 'moment'
import DateRangePicker from 'vue2-daterange-picker'
import flatPickr from 'vue-flatpickr-component'
// import 'flatpickr/dist/flatpickr.css';
import 'vue2-daterange-picker/dist/vue2-daterange-picker.css'

import { useTransaction } from '@/composable/useTransaction'
import { useUnit } from '@/composable/useUnit'
import { ref, onMounted, reactive, watch } from '@vue/composition-api'

export default {
  components: {
    DateRangePicker,
    flatPickr,
  },
  setup(props, { root }) {
    const { fetchTransactions, dateFilter, setDateFilter, transactions, deleteTransaction, updateTransactionStatus } = useTransaction()
    const { activeUnit } = useUnit()
    const totalRows = ref(0)
    const profit = ref(0)

    onMounted(async () => {
      const unit_id = activeUnit.value.id
      await fetchTransactions({ 
        unit_id, 
        start_date: dateFilter.value.startDate, 
        end_date: dateFilter.value.endDate 
      })
      totalRows.value = transactions.value.length
      transactions.value.map(x => {
        if (x.payment_status == 'Paid' && x.profit) profit.value += x.profit
      })
    })

    const doDelete = async (id) => {
      const [response, error] = await deleteTransaction(id)
      submitHandler(response, error)
    }

    const submitHandler = (response, error) => {
      if (error) return root.$notify.error(error.message)
      root.$notify.success(response.message)
    }

    const doUpdate = async (id, payment_status) => {
      let payload = {
        id,
        payment_status
      }

      if (moneyPaid.value) payload.paid = moneyPaid.value
      
      const [response, error] = await updateTransactionStatus(payload)
      if (payment_status === 'Paid' && response) cancelPay()
      submitHandler(response, error)
    }

    const payModal = ref(false)
    const moneyPaid = ref(0)
    const transactionToPay = ref(null)

    const pay = (transaction) => {
      payModal.value = true
      transactionToPay.value = transaction 
    }

    const cancelPay = () => {
      transactionToPay.value = null
      moneyPaid.value = 0
      payModal.value = false
    }

    const dateFilterChanges = async (x) => {
      const newDate = {
        startDate: moment(x.startDate).format('yyyy-MM-DD'),
        endDate: moment(x.endDate).format('yyyy-MM-DD'),
      }
      
      setDateFilter(newDate)

      await fetchTransactions({ 
        start_date: dateFilter.value.startDate, 
        end_date: dateFilter.value.endDate 
      })


      totalRows.value = transactions.value.length
      
      profit.value = 0
      transactions.value.map(x => {
        if (x.payment_status == 'Paid' && x.profit) profit.value += x.profit
      })
    }

    return {
      profit,
      dateFilterChanges,
      dateFilter,
      moneyPaid,
      payModal,
      pay, 
      cancelPay,
      totalRows,
      moment,
      transactionToPay,
      ...useTransaction(),
      doDelete,
      doUpdate,
    }
  },
  data() {
    return {
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
        { key: 'date', label: 'Date', sortable: true },
        { key: 'code', label: 'Code', sortable: true },
        {
          key: 'no', label: 'Table #',
        },
        { key: 'customer_name', label: 'Customer Name', sortable: true },
        { key: 'transaction_value', label: 'Total', sortable: true },
        { key: 'items', label: 'Items', sortable: true },
        { key: 'payment_status', label: 'Status', sortable: true },
        { key: 'paid', label: 'Money Paid', sortable: true },
        { key: 'action', label: 'Action'},
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