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
  } = useNamespacedState('unit', [
    'unit',
    'units',
    'activeUnit',
  ])


  return {
    // states
    unit,
    units,
    activeUnit,

    // actions
    fetchUnits,
    fetchUnitByID,
    createUnit,
    updateUnit,
    deleteUnit,
    setActiveUnit,
  }
}