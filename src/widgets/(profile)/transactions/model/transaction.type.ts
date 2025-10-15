export type TransactionType = {
  id: number;
  date: string;
  ident: string;
  status: 'succeeded' | 'canceled' | 'pending';
  type: 'deposit' | 'withdraw';
  description: string;
  userid_id: number;
  cost: number;
  currency: string;
  uid: string;
};
