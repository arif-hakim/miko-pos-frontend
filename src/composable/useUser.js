import { useNamespacedActions, useNamespacedState, useNamespacedGetters } from "vuex-composition-helpers" 
export const useUser = () => {

  const {
    setCurrentUser,
    login,
    loginByToken,
    loginEmployeeOrder,
    register,
  } = useNamespacedActions('user', [
    'setCurrentUser',
    'login',
    'loginByToken',
    'loginEmployeeOrder',
    'register',
  ])

  const {
    currentUser,
    user,
    users,
    ability,
    isLoading,
    authorized,
  } = useNamespacedState('user', [
    'ability',
    'isLoading',
    'authorized',
    'currentUser',
    'users',
    'user',
  ])

  return {
    // states
    ability,
    isLoading,
    currentUser,
    user,
    users,
    authorized,

    // actions
    setCurrentUser,
    loginByToken,
    loginEmployeeOrder,
    login,
    register,
  }
}