'use client';

import { useState } from 'react';
import { ERegistrationRoutes } from '../model/registration-routes.enum';
import { RegistrationEmail } from './routes/email';
import { RegistrationEmailConfirm } from './routes/email-confirm';
import { RegistrationUserData } from './routes/user-data';
import { RegistrationComplete } from './routes/complete';

export const RegistrationWidget = () => {
  const [activeRoute, setActiveRoute] = useState(ERegistrationRoutes.EMAIL);
  const [userEmail, setUserEmail] = useState('');

  const Routes = {
    [ERegistrationRoutes.EMAIL]: RegistrationEmail,
    [ERegistrationRoutes.EMAIL_CONFIRM]: RegistrationEmailConfirm,
    [ERegistrationRoutes.USER_DATA]: RegistrationUserData,
    [ERegistrationRoutes.COMPLETE]: RegistrationComplete,
  };

  const Component = Routes[activeRoute];

  return (
    <div className='w-full max-w-[420px] flex flex-col shadow-medium bg-[--bg] dark:bg-default-50 rounded-2xl overflow-clip'>
      <h2 className='text-lg font-bold px-6 pt-6 pb-4'>
        Создание учётной записи
      </h2>
      <Component
        setActiveRoute={setActiveRoute}
        userEmail={userEmail}
        setUserEmail={setUserEmail}
      />
    </div>
  );
};
