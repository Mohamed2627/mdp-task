
// This will only be useful if the backend sometimes changes the fields of the response (I encountered this case before)
export enum TRANSACTION_KEYS {
  ID = "id",
  TYPE = "type",
  AMOUNT = "amount",
  CATEGORY = "category",
  DATE = "date",
  DESCRIPTION = "description",
  STORAGE_KEY = "transactions"
}

export enum TRANSACTION_TYPE {
  INCOME = 1,
  EXPENSE = 2
}

export enum TRANSACTION_CATEGORY {
  FOOD = 1,
  TRANSPORTATION = 2,
  WORK = 3,
  INVOICES = 4,
  FREELANCER = 5
}

export enum SORT_TYPE {
  ASCENDING = 1,
  DESCENDING = 2
}