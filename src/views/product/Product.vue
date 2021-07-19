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
      <b-col
        md="9"
        class="mb-1 text-right"
      >
        <router-link
          tag="button"
          class="btn btn-sm btn-primary"
          to="/product/create"
        >
          <feather-icon
            icon="PlusIcon"
          />
          Create
        </router-link>
      </b-col>

      <b-col cols="12">
        <b-table
          style="min-height:200px;"
          hover
          responsive
          :per-page="perPage"
          :current-page="currentPage"
          :items="products"
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
            <b-dropdown id="dropdown-1" text="Stock" variant="warning" style="margin-bottom:5px;" class="mr-1">
              <b-dropdown-item :to="`/product/${data.item.id}/increase-stock`">Increase</b-dropdown-item>
              <b-dropdown-item variant="danger" :to="`/product/${data.item.id}/decrease-stock`">Decrease</b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item :to="`/product/${data.item.id}/stock-history`">History</b-dropdown-item>
            </b-dropdown>
            <b-dropdown id="dropdown-1" text="More" variant="info" class="">
              <b-dropdown-item :to="`/product/${data.item.id}`">Edit</b-dropdown-item>
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
    const { fetchProducts, products, deleteProduct } = useProduct()
    const { activeUnit } = useUnit()
    const totalRows = ref(0)

    onMounted(async () => {
      const unit_id = activeUnit.value.id
      await fetchProducts({ unit_id })
      totalRows.value = products.value.length
    })

    const doDelete = async (id) => {
      const [response, error] = await deleteProduct(id)
      submitHandler(response, error)
    }

    const submitHandler = (response, error) => {
      if (error) return root.$notify.error(error.message)
      root.$notify.success(response.message)
    }

    return {
      totalRows,
      moment,
      ...useProduct(),
      doDelete,
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
        { key: 'picture', label: '#' },
        { key: 'category.name', label: 'Category', sortable: true },
        { key: 'code', label: 'Code', sortable: true },
        { key: 'name', label: 'Name', sortable: true },
        { key: 'unit_measurement', label: 'Unit Measurement', sortable: true },
        { key: 'base_price', label: 'Base Price', sortable: true },
        { key: 'selling_price', label: 'Selling Price', sortable: true },
        { key: 'description', label: 'Description', sortable: true },
        { key: 'stock', label: 'Stock'},
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