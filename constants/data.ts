import { SORT_TYPE, TRANSACTION_CATEGORY, TRANSACTION_TYPE } from "@/enums/transaction";
import { SelectOption } from "@/models";

export const transactionTypes: SelectOption[] = [
  {
    label: "Income",
    value: TRANSACTION_TYPE.INCOME
  },
  {
    label: "Expenses",
    value: TRANSACTION_TYPE.EXPENSE
  }
]

export const incomeCategories: SelectOption[] = [
  {
    label: "Work",
    value: TRANSACTION_CATEGORY.WORK
  },
  {
    label: "Freelancer",
    value: TRANSACTION_CATEGORY.FREELANCER
  }
]

export const expensesCategories: SelectOption[] = [
  {
    label: "Food",
    value: TRANSACTION_CATEGORY.FOOD,
    color: "#177AD5"
  },
  {
    label: "Invoices",
    value: TRANSACTION_CATEGORY.INVOICES,
    color: "#79D2DE"
  },
  {
    label: "Transportation",
    value: TRANSACTION_CATEGORY.TRANSPORTATION,
    color: "#6ff508"
  },
]

export const sortOptions: SelectOption[] = [
  {
    label: "Asc",
    value: SORT_TYPE.ASCENDING
  },
  {
    label: "Desc",
    value: SORT_TYPE.DESCENDING
  },
]