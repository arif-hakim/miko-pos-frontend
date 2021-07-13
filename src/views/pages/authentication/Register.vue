<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <vuexy-logo />

        <h2 class="brand-text text-primary ml-1">
          MIKO-POS
        </h2>
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
      >
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Register V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Register-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title class="mb-1">
            Welcome to MIKO-POS 🚀
          </b-card-title>
          <b-card-text class="mb-2">
            Make your company management easy and fun!
          </b-card-text>

          <!-- form -->
          <validation-observer
            ref="registerForm"
            #default="{invalid}"
          >
            <b-form
              class="auth-register-form mt-2"
              @submit.prevent="doRegister"
            >
              <!-- firstname -->
              <b-form-group
                label="First Name"
                label-for="register-firstname"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Firstname"
                  vid="firstname"
                  rules="required"
                >
                  <b-form-input
                    id="register-firstname"
                    v-model="firstname"
                    name="register-firstname"
                    :state="errors.length > 0 ? false:null"
                    placeholder="John"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- lastname -->
              <b-form-group
                label="Last Name"
                label-for="register-lastname"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Lastname"
                  vid="lastname"
                  rules="required"
                >
                  <b-form-input
                    id="register-lastname"
                    v-model="lastname"
                    name="register-lastname"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Doe"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- address -->
              <b-form-group
                label="Address"
                label-for="register-address"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Address"
                  vid="address"
                  rules="required"
                >
                  <b-form-input
                    id="register-address"
                    v-model="address"
                    name="register-address"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Address"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- phone -->
              <b-form-group
                label="Phone"
                label-for="register-phone"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Phone"
                  vid="phone"
                  rules="required"
                >
                  <b-form-input
                    id="register-phone"
                    v-model="phone"
                    name="register-phone"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Phone"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- email -->
              <b-form-group
                label="Email"
                label-for="register-email"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Email"
                  vid="email"
                  rules="required|email"
                >
                  <b-form-input
                    id="register-email"
                    v-model="userEmail"
                    name="register-email"
                    :state="errors.length > 0 ? false:null"
                    placeholder="john@example.com"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- password -->
              <b-form-group
                label-for="register-password"
                label="Password"
              >
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="register-password"
                      v-model="password"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      :state="errors.length > 0 ? false:null"
                      name="register-password"
                      placeholder="············"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        :icon="passwordToggleIcon"
                        class="cursor-pointer"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <b-form-group>
                <b-form-checkbox
                  id="register-privacy-policy"
                  v-model="status"
                  name="checkbox-1"
                >
                  I agree to
                  <b-link>privacy policy & terms</b-link>
                </b-form-checkbox>
              </b-form-group>

              <b-button
                variant="primary"
                block
                type="submit"
                :disabled="invalid"
              >
                Sign up
              </b-button>
            </b-form>
          </validation-observer>

          <p class="text-center mt-2">
            <span>Already have an account?</span>
            <b-link :to="{name:'auth-login'}">
              <span>&nbsp;Sign in</span>
            </b-link>
          </p>
        </b-col>
      </b-col>
    <!-- /Register-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import useJwt from '@/auth/jwt/useJwt'
import { ref } from '@vue/composition-api'
import { useUser } from '@/composable/useUser' 

export default {
  components: {
    VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  setup(props, { root }) {
    const userEmail = ref('')
    const password = ref('')
    const firstname = ref('')
    const lastname = ref('')
    const address = ref('')
    const phone = ref('')
    const status = ref('')
    const sideImg = require('@/assets/images/pages/register-v2.svg')
    const passwordFieldType = ref('password')

    const { 
      register,
      ability, 
    } = useUser()

    const doRegister = async () => {
      const payload = {
        email: userEmail.value,
        password: password.value,
        firstname: firstname.value,
        lastname: lastname.value,
        address: address.value,
        phone: phone.value,
        role: 'Owner'
      }

      const [response, error] = await register(payload)
      
      if(error) root.$notify.error(error.message)
      else {
        root.$notify.success(response.message)
        root.$ability.update(ability.value)
        root.$router.replace('/')
      }
    }

    return {
      status,
      passwordFieldType,
      userEmail,
      password,
      sideImg,
      firstname,
      lastname,
      address,
      phone,
      doRegister,
      // validation
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/register-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
}
/* eslint-disable global-require */
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
