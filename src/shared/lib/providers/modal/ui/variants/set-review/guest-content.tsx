import { RatingStars } from './rating-stars';
import { SetReviewButtonsGuest } from './guest-buttons';

export const SetReviewGuestContent = () => {
  return (
    <>
      <h1 className='text-xl font-semibold mt-4 md:mt-0'>Оценить продавца</h1>
      <RatingStars rating={0} setRating={() => {}} isDisabled />
      <p className='font-medium opacity-50'>
        Чтобы поставить оценку продавцу, войдите в аккаунт Almixx или создайте
        новый.
      </p>
      <SetReviewButtonsGuest />
    </>
  );
};
