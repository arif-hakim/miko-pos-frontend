import { useNamespacedActions, useNamespacedState } from "vuex-composition-helpers" 
export const useUnit = () => {

  const {
    fetchUnits,
    fetchUnitByID,
    createUnit,
    updateUnit,
    deleteUnit,
    setActiveUnit,
  } = useNamespacedActions('unit', [
    'fetchUnits',
    'fetchUnitByID',
    'createUnit',
    'updateUnit',
    'deleteUnit',
    'setActiveUnit',
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
    deleteUnit,
    setActiveUnit,
  }
}