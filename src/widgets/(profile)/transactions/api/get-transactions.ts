import { paymentClient } from '@albomoni/shared/api/base';
import { TransactionType } from '../model/transaction.type';

export const getTransactions = async (token: string) =>
  paymentClient.get<TransactionType[]>(
    'operations/',
    {},
    { Authorization: `Bearer ${token}` },
  );
