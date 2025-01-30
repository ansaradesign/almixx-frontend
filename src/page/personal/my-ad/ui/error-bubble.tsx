'use client';

import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import Link from 'next/link';

type Props = {
  status: 'error' | 'correct' | 'phone';
};

export const MyAdErrorBubble = ({ status }: Props) => {
  return (
    <>
      {status === 'error' && (
        <NotificationBubble type='error'>
          Объявление не прошло модерацию. Проверьте все поля на наличие
          запрещенного содержания.
        </NotificationBubble>
      )}
      {status === 'phone' && (
        <NotificationBubble type='error'>
          Для публикации объявления привяжите номер телефона к учетной записи.{' '}
          <Link href='/profile/edit-profile' className='underline'>
            Привязать
          </Link>
        </NotificationBubble>
      )}
    </>
  );
};
