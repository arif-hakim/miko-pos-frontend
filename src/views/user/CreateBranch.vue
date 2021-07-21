<template>
  <div class="px-4 pb-4 pt-2">
    <Topbar></Topbar>
    <h4 class="mb-1 text-center">
      <img :src="logo" width="50" class="mb-1" alt="Logo">
      <br>
      Welcome to MIKO!
    </h4>
    <p class="text-center">
      Create your first company's branch.
    </p>
    <b-col cols="12" md="6" lg="4" offset-md="3" offset-lg="4">
      <b-card>
        <b>BRANCH INFORMATION</b>
        <hr>
        <b-form @submit.prevent="doCreate">
          <b-row>
            <!-- first name -->
            <b-col cols="12">
              <b-form-group
                label="Name"
                label-for="v-company-name"
              >
                <b-form-input
                  id="v-company-name"
                  v-model="name"
                  placeholder="Name"
                />
              </b-form-group>
            </b-col>

            <!-- email -->
            <b-col cols="12">
              <b-form-group
                label="Address"
                label-for="v-company-address"
              >
                <b-form-input
                  id="v-company-address"
                  v-model="address"
                  placeholder="Address"
                />
              </b-form-group>
            </b-col>

            <!-- email -->
            <b-col cols="12">
              <b-form-group
                label="Email"
                label-for="v-company-email"
              >
                <b-form-input
                  id="v-company-email"
                  v-model="email"
                  placeholder="Email"
                />
              </b-form-group>
            </b-col>

            <!-- mobile -->
            <b-col cols="12">
              <b-form-group
                label="Phone"
                label-for="v-company-phone"
              >
                <b-form-input
                  id="v-company-phone"
                  v-model="phone"
                  placeholder="Phone"
                />
              </b-form-group>
            </b-col>

            <!-- submit and reset -->
            <b-col cols="12" class="text-center">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="primary"
                class="mr-1 mt-2"
                block
              >
                Next
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-card>
    </b-col>
  </div>
</template>

<script>

import Topbar from './Topbar'
import Ripple from 'vue-ripple-directive'
import { useBranch } from '@/composable/useBranch'
import { ref } from '@vue/composition-api'
import { initialAbility } from '@/libs/acl/config'
import useJwt from '@/auth/jwt/useJwt'

export default {
  components: {
    Topbar,

  },
  directives: {
    Ripple
  },
  props: [],
  setup(props, { root }){
    const { createBranch } = useBranch()
    const name = ref('')
    const address = ref('')
    const email = ref('')
    const phone = ref('')

    const doCreate = async () => {
      const payload = {
        name: name.value,
        address: address.value,
        email: email.value,
        phone: phone.value,
      }

      const [response, error] = await createBranch(payload)
      if (error) root.$notify.error(error.message)
      else {
        localStorage.setItem('activeBranch', JSON.stringify(response.data))
        root.$notify.success(response.message)
        return root.$router.replace('/')
      }
    }

    return {
      doCreate,
      name,
      address,
      email,
      phone,
      logo: root.$logo,
      logout: () => {
        localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
        localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

        // Remove userData from localStorage
        localStorage.clear()

        // Reset ability
        root.$ability.update(initialAbility)

        // Redirect to login page
        root.$router.push({ name: 'auth-login' })
      }
    }
  }
}
</script>
