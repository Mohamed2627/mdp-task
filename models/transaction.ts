import { TRANSACTION_KEYS } from "@/enums/transaction";

export interface ITransaction {
  [TRANSACTION_KEYS.ID]: string;
  [TRANSACTION_KEYS.AMOUNT]: number;
  [TRANSACTION_KEYS.CATEGORY]: number | null;
  [TRANSACTION_KEYS.DATE]?: Date | number;
  [TRANSACTION_KEYS.TYPE]: number,
  [TRANSACTION_KEYS.DESCRIPTION]: string,
}