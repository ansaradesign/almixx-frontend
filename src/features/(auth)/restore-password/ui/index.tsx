'use client';

import { useState } from 'react';
import { ERestorePasswordRoutes } from '../model/restore-password-routes.enum';
import { RestorePasswordEmail } from './routes/email';
import { RestorePasswordEmailConfirm } from './routes/email-confirm';
import { RestorePasswordData } from './routes/password-data';
import { RestorePasswordComplete } from './routes/complete';

export const RestorePasswordWidget = () => {
  const [activeRoute, setActiveRoute] = useState(ERestorePasswordRoutes.EMAIL);
  const [userEmail, setUserEmail] = useState('');

  const Routes = {
    [ERestorePasswordRoutes.EMAIL]: RestorePasswordEmail,
    [ERestorePasswordRoutes.EMAIL_CONFIRM]: RestorePasswordEmailConfirm,
    [ERestorePasswordRoutes.PASSWORD_DATA]: RestorePasswordData,
    [ERestorePasswordRoutes.COMPLETE]: RestorePasswordComplete,
  };

  const Component = Routes[activeRoute];

  return (
    <div className='w-full max-w-[420px] flex flex-col shadow-medium bg-[--bg] dark:bg-default-50 rounded-2xl overflow-clip'>
      <h2 className='text-lg font-bold px-6 pt-6 pb-4'>
        Восстановление пароля
      </h2>
      <Component
        setActiveRoute={setActiveRoute}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
      />
    </div>
  );
};
