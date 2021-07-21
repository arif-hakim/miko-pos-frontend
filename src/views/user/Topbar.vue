<template>
    <div class="mb-4 text-right">
      <a
        @click="logout()"
      >Logout</a>
    </div>
</template>

<script>
import { initialAbility } from '@/libs/acl/config'
import useJwt from '@/auth/jwt/useJwt'

export default {
  props: [],
  setup(props, { root }){
    return {
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
