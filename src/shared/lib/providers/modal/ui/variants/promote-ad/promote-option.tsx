import { Button } from '@nextui-org/button';
import { clsx } from 'clsx';
import { PromoOptions } from '.';

type Props = {
  title: string;
  price: number;
  id: PromoOptions;
  activeOption: PromoOptions;
  setActiveOption: (options: PromoOptions) => void;
  properties: string[];
};

export const PromoteOption = ({
  title,
  price,
  id,
  activeOption,
  setActiveOption,
  properties,
}: Props) => {
  const isActive = id === activeOption;

  return (
    <Button
      id={id}
      className={clsx(
        'justify-start w-full h-min text-start py-2 rounded-2xl',
        {
          'ring-2 ring-offset-2 ring-primary': isActive,
        },
      )}
      onClick={() => setActiveOption(id)}
    >
      <div className='w-full flex-col gap-5'>
        <h4 className='text-lg font-medium pb-1'>
          <span
            className={clsx({
              'text-primary font-semibold': id !== 'null',
              'text-default-500 font-medium': id === 'null',
            })}
          >
            {title}
          </span>{' '}
          <span>· {price} ₽ / сутки</span>
        </h4>
        {properties.map((prop) => (
          <p key={prop} className='w-full text-wrap opacity-50'>
            – {prop}
          </p>
        ))}
      </div>
    </Button>
  );
};
