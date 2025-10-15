/* eslint-disable jsx-a11y/no-autofocus */

import { useState } from 'react';
import { getCookie } from 'cookies-next';
import { SetReviewUserContent } from './user-content';
import { SetReviewGuestContent } from './guest-content';

export const ModalVariantSetReview = () => {
  const token = getCookie('token');

  const [rating, setRating] = useState(0);

  return (
    <div className='w-full h-full flex flex-col gap-6 items-center p-6 flex-shrink'>
      {token ? (
        <SetReviewUserContent rating={rating} setRating={setRating} />
      ) : (
        <SetReviewGuestContent />
      )}
    </div>
  );
};
