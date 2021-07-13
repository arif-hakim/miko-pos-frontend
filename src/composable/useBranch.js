import { useNamespacedActions, useNamespacedState } from "vuex-composition-helpers" 
export const useBranch = () => {

  const {
    fetchBranches,
    fetchBranchByID,
    createBranch,
    updateBranch,
    deleteBranch,
    setActiveBranch
  } = useNamespacedActions('branch', [
    'fetchBranches',
    'fetchBranchByID',
    'createBranch',
    'updateBranch',
    'deleteBranch',
    'setActiveBranch'
  ])

  const {
    branch,
    branches,
    activeBranch,
  } = useNamespacedState('branch', [
    'branch',
    'branches',
    'activeBranch',
  ])


  return {
    // states
    branch,
    branches,
    activeBranch,

    // actions
    fetchBranches,
    fetchBranchByID,
    createBranch,
    updateBranch,
    deleteBranch,
    setActiveBranch,
  }
}