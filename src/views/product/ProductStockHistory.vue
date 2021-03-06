<template>
  <b-card>
    <b-row>
      <b-col
        md="3"
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

      <b-col cols="12">
        <b-card>
          <b-row class="align-items-center" v-if="product">
              <div>
                <img :src="product.picture" :alt="product.name" width="100" class="mr-2 rounded">
              </div>
              <div>
                <p class="mr-2 mb-0"><b>Name :</b> {{ product.name }}</p>
                <p class="mr-2 mb-0"><b>Code :</b> {{ product.code }}</p>
                <p class="mr-2 mb-0"><b>Category :</b> {{ product.category.name }}</p>
              </div>
              <div>
                <p class="mr-2 mb-0"><b>Unit Measurement :</b> {{ product.unit_measurement }}</p>
                <p class="mr-2 mb-0"><b>Description :</b> {{ product.description }}</p>
                <p class="mr-2 mb-0"><b>Current Stock :</b> {{ product.stock }} {{ product.unit_measurement }}</p>
              </div>
          </b-row>
        </b-card>
        <b-table
          style="min-height:200px;"
          hover
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="productStockHistories"
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
            {{ moment(data.item.created_at).format('DD/MM/YY h:mm a') }}
          </template>
          <template #cell(changes)="data">
            <b-badge :variant="data.item.changes <= 0 ? 'danger' : 'success'"> {{ data.item.changes <= 0 ? data.item.changes : `+${data.item.changes}`  }} </b-badge>
          </template>
          <template #cell(description)="data">
            {{ data.item.description || '-' }}
            <br>
            <b-badge style="font-size:10px;" variant="primary">{{ data.item.source ? `${data.item.source.branch.name} - ${data.item.source.name}` : '' }}</b-badge>
          </template>
          <template #cell(from)="data">
            {{ data.item.from || '-' }}
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
  </b-card>
</template>

<script>

import moment from 'moment'
import { useProduct } from '@/composable/useProduct'
import { useUnit } from '@/composable/useUnit'
import { ref, onMounted } from '@vue/composition-api'

export default {
  components: {
  },
  setup(props, { root }) {
    const { id } = root.$route.params
    const { fetchProductStockHistories, fetchProductByID, productStockHistories } = useProduct()
    const { activeUnit } = useUnit()
    const totalRows = ref(0)

    onMounted(async () => {
      await fetchProductStockHistories(id)
      await fetchProductByID(id)
      totalRows.value = productStockHistories.value.length
    })

    const submitHandler = (response, error) => {
      if (error) return root.$notify.error(error.message)
      root.$notify.success(response.message)
    }

    return {
      totalRows,
      moment,
      ...useProduct(),
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
        { key: 'from', label: 'From' },
        { key: 'changes', label: 'Changes' },
        { key: 'to', label: 'To' },
        { key: 'description', label: 'Description' },
        { key: 'date', label: 'Date' },
        // { key: 'from', label: 'From' },
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