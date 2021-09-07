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
    downloadSalesReport,
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
    'downloadSalesReport',
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
    downloadSalesReport,
  }
}