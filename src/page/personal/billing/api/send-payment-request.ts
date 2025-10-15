import { paymentClient } from '@albomoni/shared/api/base';

export const sendPaymentRequest = (
  amount: string,
  cryptogram: string,
  email: string,
  name: string,
  phone: string,
  isSaveData: boolean,
  token: string,
) =>
  paymentClient.post(
    'bill/',
    {
      amount,
      cryptogram,
      email,
      name,
      phone,
      isSaveData,
    },
    { Authorization: `Bearer ${token}` },
  );
