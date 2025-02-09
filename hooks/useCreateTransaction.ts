import { TRANSACTION_KEYS } from '@/enums/transaction';
import { ITransaction } from '@/models/transaction';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { Toast } from 'toastify-react-native';

export const useCreateTransaction = () => {

  const [isCreating, setLoading] = useState(false);

  const createTransaction = async (data: ITransaction) => {
    try {
      setLoading(true)
      data[TRANSACTION_KEYS.ID] = nanoid();
      const oldTransactions = await AsyncStorage.getItem(TRANSACTION_KEYS.STORAGE_KEY);
      if (oldTransactions !== null) {
        const parsedOldTransactions = JSON.parse(oldTransactions);
        const allTransactions = [...parsedOldTransactions, data]
        const stringifiedAllTransactions = JSON.stringify(allTransactions);
        await AsyncStorage.setItem(TRANSACTION_KEYS.STORAGE_KEY, stringifiedAllTransactions);
        Toast.success("Transaction added Successfully")
      } else {
        const firstTransaction = [data]
        const stringifiedFirstTransaction = JSON.stringify(firstTransaction);
        await AsyncStorage.setItem(TRANSACTION_KEYS.STORAGE_KEY, stringifiedFirstTransaction);
        Toast.success("Transaction added Successfully")
      }
    } catch (error) {
      Toast.error("Failed to Add Transaction")
    } finally {
      setLoading(false)
    }
  }

  return { createTransaction, isCreating }
}