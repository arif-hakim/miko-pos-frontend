import { useNamespacedActions, useNamespacedState, useNamespacedGetters } from "vuex-composition-helpers" 
export const useUser = () => {

  const {
    setCurrentUser,
    login,
    loginByToken,
    register,
  } = useNamespacedActions('user', [
    'setCurrentUser',
    'login',
    'loginByToken',
    'register',
  ])

  const {
    currentUser,
    user,
    users,
    ability
  } = useNamespacedState('user', [
    'ability',
    'currentUser',
    'users',
    'user',
  ])


  return {
    // states
    ability,
    currentUser,
    user,
    users,

    // actions
    setCurrentUser,
    loginByToken,
    login,
    register,
  }
}