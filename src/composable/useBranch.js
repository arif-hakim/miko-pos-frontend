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
    isLoading,
    activeBranch,
  } = useNamespacedState('branch', [
    'branch',
    'branches',
    'isLoading',
    'activeBranch',
  ])


  return {
    // states
    branch,
    branches,
    isLoading,
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