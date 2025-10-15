'use client';

import { useEffect, useState } from 'react';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import { getCookie } from 'cookies-next';
import { useSession } from '@albomoni/shared/lib/hooks/use-session';
import { validateTokenAsync } from '@albomoni/widgets/header/api';
import { usePromoAsync } from '@albomoni/features/(referral)/use-promo/api';
import { PiCopyBold, PiGiftBold, PiCheckBold } from 'react-icons/pi';

export const ReferralPage = () => {
  const { user, setUser } = useSession();
  const [promoCode, setPromoCode] = useState('');
  const [referralLink, setReferralLink] = useState('');
  const [inputPromoCode, setInputPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    const loadUserData = async () => {
      const token = getCookie('token') as string;
      if (token) {
        try {
          const userData = await validateTokenAsync(token);
          setUser(userData);
          if (userData.promo_code) {
            setPromoCode(userData.promo_code);
            setReferralLink(
              `${window.location.origin}/registration?promo=${userData.promo_code}`,
            );
          }
        } catch (error) {
          console.error('Error loading user data:', error);
        } finally {
          setIsLoadingUser(false);
        }
      }
    };

    loadUserData();
  }, []);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(referralLink);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleUsePromo = async () => {
    if (!inputPromoCode.trim()) {
      setMessage('Введите промокод');
      return;
    }

    const token = getCookie('token') as string;
    setIsLoading(true);
    setMessage('');

    try {
      const response = await usePromoAsync(inputPromoCode, token);
      setMessage(`✅ ${response.detail}! Начислено ${response.money} евриков`);
      setInputPromoCode('');
      
      // Обновляем данные пользователя
      const userData = await validateTokenAsync(token);
      setUser(userData);
    } catch (error: any) {
      setMessage('❌ Ошибка при активации промокода');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingUser) {
    return (
      <main className='flex flex-col gap-10 items-center'>
        <div className='flex flex-col gap-7 w-full max-w-7xl px-4 mb-40'>
          <h2 className='text-2xl md:text-3xl font-bold mt-5 md:mt-10 w-full'>
            Реферальная программа
          </h2>
          <p>Загрузка...</p>
        </div>
      </main>
    );
  }

  return (
    <main className='flex flex-col gap-10 items-center'>
      <div className='flex flex-col gap-7 w-full max-w-7xl px-4 mb-40'>
        <h2 className='text-2xl md:text-3xl font-bold mt-5 md:mt-10 w-full'>
          Реферальная программа
        </h2>

        <div className='w-full lg:w-2/3 flex flex-col gap-8'>
          {/* Блок с реферальной ссылкой */}
          <div className='shadow-base p-6 dark:bg-default-100 rounded-2xl flex flex-col gap-4'>
            <div className='flex items-center gap-3'>
              <PiGiftBold size={24} className='text-primary' />
              <h3 className='text-xl font-semibold'>Ваша реферальная ссылка</h3>
            </div>
            
            {promoCode ? (
              <>
                <p className='text-sm opacity-70'>
                  Поделитесь этой ссылкой с друзьями. Когда они зарегистрируются
                  по вашей ссылке и активируют промокод, вы оба получите бонусы!
                </p>
                
                <div className='flex flex-col gap-3'>
                  <div className='flex gap-2'>
                    <Input
                      value={referralLink}
                      readOnly
                      classNames={{
                        input: 'text-sm',
                      }}
                    />
                    <Button
                      isIconOnly
                      color='primary'
                      onClick={handleCopyLink}
                      className='flex-shrink-0'
                    >
                      {isCopied ? <PiCheckBold size={20} /> : <PiCopyBold size={20} />}
                    </Button>
                  </div>
                  
                  <div className='p-4 bg-default-50 dark:bg-default-50 rounded-xl'>
                    <p className='text-sm font-medium'>Ваш промокод:</p>
                    <p className='text-2xl font-bold text-primary mt-1'>
                      {promoCode}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <p className='text-sm opacity-70'>
                Промокод загружается...
              </p>
            )}
          </div>

          {/* Блок активации промокода */}
          {!user?.used_promo && (
            <div className='shadow-base p-6 dark:bg-default-100 rounded-2xl flex flex-col gap-4'>
              <h3 className='text-xl font-semibold'>Активировать промокод</h3>
              <p className='text-sm opacity-70'>
                Если у вас есть промокод от друга, введите его здесь чтобы получить
                бонусы
              </p>

              <div className='flex flex-col gap-3'>
                <Input
                  placeholder='Введите промокод'
                  value={inputPromoCode}
                  onChange={(e) => setInputPromoCode(e.target.value.toUpperCase())}
                  maxLength={20}
                />
                <Button
                  color='primary'
                  size='lg'
                  onClick={handleUsePromo}
                  isLoading={isLoading}
                  isDisabled={!inputPromoCode.trim()}
                  className='font-semibold'
                >
                  Активировать промокод
                </Button>
                {message && (
                  <p
                    className={`text-sm ${
                      message.startsWith('✅')
                        ? 'text-success'
                        : 'text-danger'
                    }`}
                  >
                    {message}
                  </p>
                )}
              </div>
            </div>
          )}

          {user?.used_promo && (
            <div className='shadow-base p-6 dark:bg-default-100 rounded-2xl'>
              <p className='text-sm opacity-70'>
                ✅ Вы уже использовали промокод от друга!
              </p>
            </div>
          )}

          {/* Информационный блок */}
          <div className='shadow-base p-6 dark:bg-default-100 rounded-2xl flex flex-col gap-3'>
            <h3 className='text-lg font-semibold'>Как это работает?</h3>
            <ul className='text-sm opacity-70 space-y-2'>
              <li>• Поделитесь вашей реферальной ссылкой с друзьями</li>
              <li>• Ваш друг регистрируется по ссылке</li>
              <li>• Друг активирует ваш промокод</li>
              <li>• Вы оба получаете бонусы на баланс!</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

