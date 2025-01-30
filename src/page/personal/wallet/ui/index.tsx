import { BalanceSkeleton } from '@albomoni/widgets/(profile)/balance';
import { TransactionsSkeleton } from '@albomoni/widgets/(profile)/transactions';

import dynamic from 'next/dynamic';

const DynamicBalance = dynamic(
  () => import('@albomoni/widgets/(profile)/balance').then((mod) => mod.Balance),
  {
    loading: () => <BalanceSkeleton />,
  },
);

const DynamicTransactions = dynamic(
  () =>
    import('@albomoni/widgets/(profile)/transactions').then(
      (mod) => mod.Transactions,
    ),
  {
    loading: () => <TransactionsSkeleton />,
  },
);

export const WalletPage = () => {
  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-7 w-full max-w-7xl px-4 mb-40'>
        <DynamicBalance />
        <DynamicTransactions />
      </div>
    </main>
  );
};
