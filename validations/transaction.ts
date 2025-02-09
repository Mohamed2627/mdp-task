import { TRANSACTION_KEYS } from "@/enums/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const createTransactionValidation = zodResolver(
  z.object({
    [TRANSACTION_KEYS.AMOUNT]: z.string().refine((val) => {
      if (!val) return false;
      if (isNaN(Number(val))) return false;
      if (Number(val) < 0) return false;
      return true;
    }, "positive number is required for Amount"),
    [TRANSACTION_KEYS.CATEGORY]: z.number({ required_error: "Category is required", invalid_type_error: "Category is required" }),
    [TRANSACTION_KEYS.DATE]: z.number({ required_error: "Date is required", invalid_type_error: "Date is required" }),
    [TRANSACTION_KEYS.TYPE]: z.number({ required_error: "Type is required", invalid_type_error: "Type is required" }),
    [TRANSACTION_KEYS.DESCRIPTION]: z.string().optional(),
  }))