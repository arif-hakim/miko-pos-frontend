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
  } = useNamespacedActions('transaction', [
    'fetchTransactions',
    'fetchTransactionStockHistories',
    'fetchTransactionByID',
    'createTransaction',
    'updateTransaction',
    'updateTransactionStock',
    'deleteTransaction',
    'updateTransactionStatus',
  ])

  const {
    transaction,
    transactions,
    transactionStockHistories,
    isLoading,
  } = useNamespacedState('transaction', [
    'transaction',
    'transactions',
    'transactionStockHistories',
    'isLoading',
  ])


  return {
    // states
    transaction,
    transactions,
    transactionStockHistories,
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
  }
}