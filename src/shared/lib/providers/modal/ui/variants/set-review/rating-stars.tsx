import { PiStarFill } from 'react-icons/pi';

type Props = {
  rating: number;
  setRating: (rate: number) => void;
  isDisabled?: boolean;
};

export const RatingStars = ({
  rating,
  setRating,
  isDisabled = false,
}: Props) => {
  const RatingVariants = [1, 2, 3, 4, 5];
  return (
    <div className='w-full flex gap-4 items-center justify-center my-8'>
      {RatingVariants.map((rate) => (
        <button
          disabled={isDisabled}
          key={rate}
          type='button'
          aria-label={`set ${rate} rating`}
          onClick={() => setRating(rate)}
          className='w-fit h-fit'
        >
          <PiStarFill
            size={50}
            className={rating >= rate ? 'text-[--warning]' : 'opacity-20'}
          />
        </button>
      ))}
    </div>
  );
};
