<template>
  <b-card>
    <h4 class="mb-2">Company Information</h4>
      <b-row class="mb-1">
        <b-col cols="2" class="font-weight-bold">Company</b-col>
        <b-col cols="9">{{ unit.branch.company.name }}</b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col cols="2" class="font-weight-bold">Address</b-col>
        <b-col cols="9">{{ unit.branch.company.address }}</b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col cols="2" class="font-weight-bold">Email</b-col>
        <b-col cols="9">{{ unit.branch.company.email }}</b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col cols="2" class="font-weight-bold">Phone</b-col>
        <b-col cols="9">{{ unit.branch.company.phone }}</b-col>
      </b-row>
      <hr>

      <h4 class="mb-2">Branch Information</h4>
      <b-row class="mb-1">
        <b-col cols="2" class="font-weight-bold">Branch</b-col>
        <b-col cols="9">{{ unit.branch.name }}</b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col cols="2" class="font-weight-bold">Address</b-col>
        <b-col cols="9">{{ unit.branch.address }}</b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col cols="2" class="font-weight-bold">Email</b-col>
        <b-col cols="9">{{ unit.branch.email }}</b-col>
      </b-row>
      <b-row class="mb-1">
        <b-col cols="2" class="font-weight-bold">Phone</b-col>
        <b-col cols="9">{{ unit.branch.phone }}</b-col>
      </b-row>
      <hr>
      
      <h4 class="mb-2">Unit Information</h4>
      <b-row class="mb-1">
        <b-col cols="2" class="font-weight-bold">Unit</b-col>
        <b-col cols="9">{{ unit.name }}</b-col>
      </b-row>

      <b-row class="mb-1">
        <b-col cols="2" class="font-weight-bold">QR Code</b-col>
        <b-col cols="9" v-if="unit.qrcode">
          <b-button class="mb-1 mr-1" size="sm" variant="primary" @click="download(unit.id)">Download</b-button>
          <b-button class="mb-1" size="sm" variant="warning" @click="generate(unit.id)">Re-generate</b-button>
          <br>
          <img :src="unit.qrcode_url" alt="QR Code" width="100">
        </b-col>
        <b-col cols="9" v-else>
          <b-button class="mb-1" size="sm" variant="warning" @click="generate(unit.id)">Generate</b-button>
        </b-col>
      </b-row>
  </b-card>
</template>

<script>

import { useUnit } from '@/composable/useUnit'
import { ref, onMounted, reactive } from '@vue/composition-api'

export default {
  components: {
  },
  setup(props, { root }) {
    const { unit, activeUnit, downloadQRCode, generateQRCode, fetchUnitByID } = useUnit()
    const { id: unit_id } = activeUnit.value
    
    const input = reactive({
      id: null,
      name: '',
    })

    onMounted(async () => {
      await fetchUnitByID(unit_id)
    })

    const submitHandler = (response, error) => {
      if (error) return root.$notify.error(error.message)
      root.$notify.success(response.message)
    }
    
    const download = async (id) => {
      const [response, error] = await downloadQRCode(id)
      submitHandler(response, error)
      if (response) {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'qrcode.png'); //or any other extension
        document.body.appendChild(link);
        link.click();
      }
    }

    const generate = async (id) => {
      const [response, error] = await generateQRCode(id)
      submitHandler(response, error)
      if (response) await fetchUnitByID(id)
    }

    return {
      unit_id,
      input,
      generate,
      download,
      getTitle: () => unit_id ? 'Edit' : 'Create',
      ...useUnit(),
    }
  },
}
</script>