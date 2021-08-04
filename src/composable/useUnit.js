import { useNamespacedActions, useNamespacedState } from "vuex-composition-helpers" 
export const useUnit = () => {

  const {
    fetchUnits,
    fetchUnitByID,
    createUnit,
    updateUnit,
    deleteUnit,
    setActiveUnit,
    fetchUnitByOrderToken,
    downloadQRCode,
    generateQRCode,
    updateTax,
  } = useNamespacedActions('unit', [
    'fetchUnits',
    'fetchUnitByID',
    'createUnit',
    'updateUnit',
    'deleteUnit',
    'setActiveUnit',
    'fetchUnitByOrderToken',
    'downloadQRCode',
    'generateQRCode',
    'updateTax',
  ])

  const {
    unit,
    units,
    activeUnit,
    isLoading,
  } = useNamespacedState('unit', [
    'unit',
    'units',
    'activeUnit',
    'isLoading',
  ])


  return {
    // states
    unit,
    units,
    activeUnit,
    isLoading,

    // actions
    fetchUnits,
    fetchUnitByID,
    createUnit,
    updateUnit,
    updateTax,
    deleteUnit,
    setActiveUnit,
    fetchUnitByOrderToken,
    downloadQRCode,
    generateQRCode,
  }
}