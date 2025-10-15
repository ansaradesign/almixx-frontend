import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { getReviews } from '../api/get-reviews';

type Props = {
  lng: string;
  userId: string;
};

export const UserReviewsPage = async ({ lng, userId }: Props) => {
  const token = getCookie('token', { cookies });
  const reviews = await getReviews(userId, token as string);

  console.log(reviews);

  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-6 w-full max-w-7xl px-4 mb-40'>
        <h2 className='text-2xl md:text-3xl font-bold mt-5 md:mt-10 w-full'>
          Отзывы пользователя Михаил
        </h2>
      </div>
    </main>
  );
};
