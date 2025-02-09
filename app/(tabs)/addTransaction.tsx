import { ThemedView } from '@/components/ui/ThemedView'
import { useResponsiveScreen } from '@/hooks/useResponsiveScreen'
import { ITransaction } from '@/models/transaction'
import { createTransactionValidation } from '@/validations/transaction'
import React, { useEffect, useMemo } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import ControlledTextInput from '../../components/Form/ControlledTextInput';
import { TRANSACTION_KEYS, TRANSACTION_TYPE } from '@/enums/transaction'
import ControlledSelectInput from '@/components/Form/ControlledSelectInput'
import { expensesCategories, incomeCategories, transactionTypes } from '@/constants/data'
import ParallaxScrollView from '@/components/ui/ParallaxScrollView'
import ThemedTouchableOpacity from '@/components/ui/ThemedTouchableOpacity'
import ControlledDateInput from '@/components/Form/ControlledDateInput'
import { useCreateTransaction } from '@/hooks/useCreateTransaction'
import { ActivityIndicator } from 'react-native'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '../../hooks/useColorScheme';

const AddTransaction = () => {

  // Hooks-------------------------------------
  const { hp } = useResponsiveScreen();
  const form = useForm<ITransaction>({
    mode: "onBlur",
    resolver: createTransactionValidation
  });

  const { isCreating, createTransaction } = useCreateTransaction()
  const { watch, setValue, reset, handleSubmit, formState: { errors } } = form;
  const theme = useColorScheme() ?? "light"

  const watchedType = watch(TRANSACTION_KEYS.TYPE);

  // Functions---------------------------------
  const categoryOptions = useMemo(() => {
    if (watchedType === TRANSACTION_TYPE.EXPENSE)
      return expensesCategories
    return incomeCategories
  }, [watchedType])

  const onSubmit = async (values: ITransaction) => {

    await createTransaction(values)
    reset();
  }

  useEffect(() => {
    if (!watchedType) {
      setValue(TRANSACTION_KEYS.CATEGORY, null)
    }
  }, [watchedType])

  return (
    <ParallaxScrollView title='Add Transaction'>
      <ThemedView style={{ gap: hp(2), height: "auto", flex: 1 }}>
        <FormProvider {...form}>
          <ControlledSelectInput
            name={TRANSACTION_KEYS.TYPE}
            label='Type'
            options={transactionTypes}
            placeholder='Select Transaction Type'
            required
          />
          <ControlledTextInput
            name={TRANSACTION_KEYS.AMOUNT}
            keyboardType='numeric'
            label='Amount'
            placeholder='Enter the amount in EGP'
            required
          />
          <ControlledSelectInput
            name={TRANSACTION_KEYS.CATEGORY}
            label='Category'
            options={categoryOptions}
            placeholder='Select Transaction Category'
            required
            disabled={!watchedType}
          />
          <ControlledDateInput
            name={TRANSACTION_KEYS.DATE}
            label='Date'
            placeholder='Pick the Date'
            required
          />
          <ControlledTextInput
            name={TRANSACTION_KEYS.DESCRIPTION}
            label='Description'
            placeholder='Enter the description'
          />
          <ThemedTouchableOpacity
            onPress={handleSubmit(onSubmit)}
          >
            {isCreating ? (
              <ActivityIndicator
                color={Colors?.[theme]?.tint}
              />
            ) :
              "Add Transaction"
            }
          </ThemedTouchableOpacity>

        </FormProvider>
      </ThemedView>
    </ParallaxScrollView>
  )
}

export default AddTransaction