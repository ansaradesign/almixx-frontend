/* eslint-disable react/jsx-props-no-spreading */
import { Checkbox } from '@nextui-org/react';
import { Controller, UseFormRegister } from 'react-hook-form';

type Props = {
  register: UseFormRegister<{
    email?: string | undefined;
    sum: number;
    'card-number': string;
    'card-date': string;
    cvv: string;
    cardholder: string;
    'is-save'?: boolean;
    tel: string;
  }>;
  control: any;
  isSave: boolean;
  setIsSave: (state: boolean) => void;
};

export const PaymentWidget = ({
  register,
  setIsSave,
  isSave,
  control,
}: Props) => {
  const formatCardDate = (value: string) => {
    const cleanedValue = value.replace(/\D/g, ''); // Удаляем все нечисловые символы
    if (cleanedValue.length >= 2) {
      return `${cleanedValue.substring(0, 2)}/${cleanedValue.substring(2, 4)}`;
    }
    return cleanedValue;
  };

  return (
    <div className='w-full md:max-w-[50%] flex flex-col gap-4'>
      <p className='font-medium opacity-50'>Введите данные карты</p>

      <div className='flex flex-col gap-4'>
        <input
          type='tel'
          inputMode='numeric'
          autoComplete='cc-number'
          placeholder='Номер карты'
          {...register('card-number')}
          className='bg-default rounded-2xl px-4 h-12 w-full'
        />
        <div className='flex flex-row gap-4'>
          <Controller
            name='card-date'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <input
                {...field}
                type='tel'
                inputMode='numeric'
                autoComplete='cc-exp'
                placeholder='MM/YY'
                className='bg-default rounded-2xl px-4 h-12 w-full'
                onChange={(e) => field.onChange(formatCardDate(e.target.value))}
              />
            )}
          />

          <input
            type='password'
            inputMode='numeric'
            autoComplete='cc-csc'
            placeholder='CVV'
            className='bg-default rounded-2xl px-4 h-12 w-full'
            {...register('cvv')}
          />
        </div>

        <input
          type='text'
          placeholder='Держатель карты (Латинницей)'
          className='bg-default rounded-2xl px-4 h-12 w-full'
          {...register('cardholder')}
        />

        <input
          type='tel'
          placeholder='Номер телефона'
          className='bg-default rounded-2xl px-4 h-12 w-full'
          {...register('tel')}
        />

        <input
          type='email'
          placeholder='Email для получения чека'
          className='bg-default rounded-2xl px-4 h-12 w-full mb-2'
          {...register('email')}
        />

        <Checkbox
          checked={isSave}
          onChange={(e) => setIsSave(e.target.checked)}
        >
          Сохранить карту
        </Checkbox>
      </div>
    </div>
  );
};
