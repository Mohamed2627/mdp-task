import { expensesCategories } from '@/constants/data';
import { TRANSACTION_KEYS, TRANSACTION_TYPE } from "@/enums/transaction";
import { IPieChartData } from "@/models"
import { ITransaction } from "@/models/transaction";
import { getStorageData } from "@/utils";
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from "react"
import { Toast } from "toastify-react-native";


export const useGetExpensesCategory = () => {
  const [categoryExpenses, setCategoryExpenses] = useState<IPieChartData[]>([]);

  const groupCategoryAmounts = async () => {
    try {
      const allData = await getStorageData(TRANSACTION_KEYS.STORAGE_KEY, []);
      let cateMap: { [key: string]: number } = {}
      allData?.forEach((trans: ITransaction) => {
        if (trans[TRANSACTION_KEYS.TYPE] == TRANSACTION_TYPE.EXPENSE) {
          if (cateMap[trans[TRANSACTION_KEYS.CATEGORY] as number]) {
            cateMap[trans[TRANSACTION_KEYS.CATEGORY] as number] =
              cateMap[trans[TRANSACTION_KEYS.CATEGORY] as number] + Number(trans[TRANSACTION_KEYS.AMOUNT])
          } else {
            cateMap[trans[TRANSACTION_KEYS.CATEGORY] as number] = Number(trans[TRANSACTION_KEYS.AMOUNT])
          }
        }
      })

      const finalData = expensesCategories.map((cate) => {
        const cateObj = {
          value: cateMap[cate.value] ?? 0,
          text: cate.label,
          color: cate.color as string
        }
        return cateObj
      });

      setCategoryExpenses(finalData)
    } catch (error) {
      Toast.error("Error on Getting Categories of Expenses")
    }
  }

  useFocusEffect(
    useCallback(() => {
      groupCategoryAmounts()
    }, [])
  )

  return { categoryExpenses }
}