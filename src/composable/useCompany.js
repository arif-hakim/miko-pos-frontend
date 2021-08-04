import { useNamespacedActions, useNamespacedState } from "vuex-composition-helpers" 
export const useCompany = () => {

  const {
    fetchCompany,
    createCompany,
    updateCompany,
    deleteCompany,
  } = useNamespacedActions('company', [
    'fetchCompany',
    'createCompany',
    'updateCompany',
    'deleteCompany',
  ])

  const {
    company,
    companies,
  } = useNamespacedState('company', [
    'company',
    'companies',
  ])


  return {
    // states
    company,
    companies,

    // actions
    fetchCompany,
    createCompany,
    updateCompany,
    deleteCompany,
  }
}