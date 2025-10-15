import { useQuery } from '@tanstack/react-query';
import { getCookie } from 'cookies-next';
import { Spinner } from '@nextui-org/spinner';
import { useEffect } from 'react';
import { RatingStars } from './rating-stars';
import { GetReviewStatsQuery } from '../../../api/(reviews)/get-reviews-stats/query';
import { useModal } from '../../../lib/use-modal';
import { SetReviewButtonsUser } from './user-buttons';

type Props = {
  rating: number;
  setRating: (rate: number) => void;
};

export const SetReviewUserContent = ({ rating, setRating }: Props) => {
  const { modalData } = useModal();
  const token = getCookie('token');

  const { data, isLoading, isFetching } = useQuery(
    GetReviewStatsQuery(modalData.user_id, token as string),
  );

  useEffect(() => {
    setRating(data?.rate || 0);
  }, [data]);

  if (isLoading || isFetching) {
    return (
      <div className='w-full h-[254px] md:h-[238px] flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <h1 className='text-xl font-semibold mt-4 md:mt-0'>
        {data?.rate ? 'Изменить оценку' : 'Оценить продавца'}
      </h1>
      <RatingStars rating={rating} setRating={setRating} />
      <SetReviewButtonsUser rating={rating} data={data} />
    </>
  );
};
