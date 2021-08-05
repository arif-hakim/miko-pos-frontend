import { useNamespacedActions, useNamespacedState } from "vuex-composition-helpers" 
export const useTransaction = () => {

  const {
    fetchTransactions,
    fetchTransactionStockHistories,
    fetchTransactionByID,
    createTransaction,
    updateTransaction,
    updateTransactionStock,
    deleteTransaction,
    updateTransactionStatus,
    setDateFilter,
  } = useNamespacedActions('transaction', [
    'fetchTransactions',
    'fetchTransactionStockHistories',
    'fetchTransactionByID',
    'createTransaction',
    'updateTransaction',
    'updateTransactionStock',
    'deleteTransaction',
    'updateTransactionStatus',
    'setDateFilter',
  ])

  const {
    transaction,
    transactions,
    transactionStockHistories,
    dateFilter,
    isLoading,
  } = useNamespacedState('transaction', [
    'transaction',
    'transactions',
    'transactionStockHistories',
    'dateFilter',
    'isLoading',
  ])


  return {
    // states
    transaction,
    transactions,
    transactionStockHistories,
    dateFilter,
    isLoading,

    // actions
    fetchTransactions,
    fetchTransactionStockHistories,
    fetchTransactionByID,
    createTransaction,
    updateTransaction,
    updateTransactionStock,
    deleteTransaction,
    updateTransactionStatus,
    setDateFilter,
  }
}