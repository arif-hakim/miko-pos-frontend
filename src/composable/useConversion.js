import { useNamespacedActions, useNamespacedState } from "vuex-composition-helpers" 
export const useConversion = () => {

  const {
    fetchConversions,
    fetchConversionByID,
    createConversion,
    updateConversion,
    deleteConversion,
  } = useNamespacedActions('conversion', [
    'fetchConversions',
    'fetchConversionByID',
    'createConversion',
    'updateConversion',
    'deleteConversion',
  ])

  const {
    conversion,
    conversions,
    isLoading,
  } = useNamespacedState('conversion', [
    'conversion',
    'conversions',
    'isLoading',
  ])


  return {
    // states
    conversion,
    conversions,
    isLoading,

    // actions
    fetchConversions,
    fetchConversionByID,
    createConversion,
    updateConversion,
    deleteConversion,
  }
}