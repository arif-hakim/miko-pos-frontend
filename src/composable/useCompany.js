import { useNamespacedActions, useNamespacedState } from "vuex-composition-helpers" 
export const useCompany = () => {

  const {
    fetchCompanies,
    fetchCompanyByID,
    createCompany,
    updateCompany,
    deleteCompany,
  } = useNamespacedActions('company', [
    'fetchCompanies',
    'fetchCompanyByID',
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
    fetchCompanies,
    fetchCompanyByID,
    createCompany,
    updateCompany,
    deleteCompany,
  }
}