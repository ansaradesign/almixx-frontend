/* eslint-disable jsx-a11y/no-autofocus */

import { Button } from '@nextui-org/button';
import { useMask } from '@react-input/mask';
import { useEffect, useState } from 'react';
import { Spacer } from '@nextui-org/spacer';
import { PiCheckCircleFill } from 'react-icons/pi';
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { NotificationBubble } from '@albomoni/shared/ui/notification-bubble';
import { useModal } from '../../../../lib/use-modal';
import { ModalScrollableArea } from '../../../scrollable-area';
import { EModalStates } from '../../../../model/modal-states.enum';
import { sendPhoneCode } from '../../../../api/(edit-user)/add-phone/send-phone-code';
import { verifyPhoneCode } from '../../../../api/(edit-user)/add-phone/verify-phone-code';
import { savePhone } from '../../../../api/(edit-user)/add-phone/save-phone';

export const ModalVariantAddPhone = () => {
  const inputPhoneRef = useMask({
    mask: '+_ (___) ___-__-__',
    replacement: { _: /\d/ },
    showMask: true,
  });
  const inputCodeRef = useMask({
    mask: '___-___',
    replacement: { _: /\d/ },
    showMask: true,
  });

  const { setModalState } = useModal();
  const token = getCookie('token');
  const router = useRouter();

  const [counterValue, setCounterValue] = useState<number | null>(null);

  const [phoveValue, setPhoneValue] = useState('+_ (___) ___-__-__');
  const [titleValue, setTitleValue] = useState('telephone');
  const [codeValue, setCodeValue] = useState('___-___');

  const [isResendable, setIsResendable] = useState(true);
  const [isPhoneEditable, setIsPhoneEditable] = useState(true);
  const [isPhoneValid, setIsPhoveValid] = useState(false);
  const [isCodeValid, setIsCodeValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [isErrorCode, setIsErrorCode] = useState(false);

  const [phoneId, setPhoneId] = useState<number>();

  useEffect(() => {
    if (counterValue) {
      setTimeout(() => {
        setCounterValue(counterValue - 1);
      }, 1000);
    } else {
      setCounterValue(null);
      setIsResendable(true);
    }
  }, [counterValue]);

  useEffect(() => {
    if (!phoveValue.includes('_')) {
      setIsPhoveValid(true);
    } else {
      setIsPhoveValid(false);
    }
  }, [phoveValue]);

  useEffect(() => {
    if (!codeValue.includes('_')) {
      setIsCodeValid(true);
    } else {
      setIsCodeValid(false);
    }
  }, [codeValue]);

  useEffect(() => {
    if (isPhoneValid && isPhoneVerified && isCodeValid && titleValue !== '') {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isPhoneValid, isPhoneVerified, isCodeValid, titleValue]);

  const handleSendCode = async () => {
    setIsPhoneEditable(false);
    setIsResendable(false);

    await sendPhoneCode(phoveValue, token as string);

    setCounterValue(60);
  };

  const handleVerifyCode = async () => {
    try {
      const normalizedCode = codeValue.split('-').join('');

      const response = await verifyPhoneCode(
        phoveValue,
        normalizedCode,
        token as string,
      );

      setPhoneId(response.id);

      setIsErrorCode(false);
      setIsPhoneVerified(true);
    } catch {
      setIsErrorCode(true);
      return;
    }
  };

  const handleSavePhone = async () => {
    if (phoneId) {
      await savePhone(phoveValue, phoneId, titleValue, token as string);
      setModalState(EModalStates.NULL);
      router.refresh();
    }
  };

  return (
    <>
      <ModalScrollableArea>
        <h1 className='text-xl font-semibold mt-4 md:mt-0'>
          Добавление телефона
        </h1>

        {isPhoneVerified ? (
          <div className='w-full flex gap-2 items-center justify-center mt-8'>
            <PiCheckCircleFill
              size={28}
              className='text-success flex-shrink-0'
            />
            <p className='text-3xl font-medium ring-0 outline-none text-center text-success bg-[--bg]'>
              {phoveValue}
            </p>
          </div>
        ) : (
          <input
            ref={inputPhoneRef}
            type='text'
            autoFocus
            disabled={!isPhoneEditable}
            value={phoveValue}
            onChange={(e) => setPhoneValue(e.target.value)}
            inputMode='numeric'
            className='text-3xl font-medium ring-0 outline-none text-center mt-8 bg-[--bg]'
          />
        )}

        {!isPhoneVerified && (
          <Button
            onPress={handleSendCode}
            isDisabled={
              (!isPhoneValid && isResendable) ||
              (!isPhoneEditable && !isResendable)
            }
          >
            Выслать код подтверждения {counterValue && <p>{counterValue}</p>}
          </Button>
        )}

        {!isPhoneEditable && !isPhoneVerified && (
          <>
            <h5 className='font-medium opacity-50'>Код подтверждения</h5>
            <div className='w-full flex gap-4 iztems-center justify-center'>
              <input
                ref={inputCodeRef}
                type='text'
                autoFocus
                value={codeValue}
                onChange={(e) => setCodeValue(e.target.value)}
                inputMode='numeric'
                className='text-3xl w-32 font-medium ring-0 outline-none text-center bg-[--bg]'
              />
              <Button
                isDisabled={!isCodeValid}
                color='success'
                onPress={handleVerifyCode}
              >
                Подтвердить
              </Button>
            </div>
          </>
        )}

        {isErrorCode && (
          <NotificationBubble type='error'>
            Код введён неверно
          </NotificationBubble>
        )}

        <Spacer />
        {/* <Input
          size='lg'
          label='Название'
          labelPlacement='outside'
          value={titleValue}
          onChange={(e) => setTitleValue(e.target.value)}
          placeholder='Личный, рабочий и т.п.'
          type='text'
        /> */}
      </ModalScrollableArea>

      <div className='w-full px-6 pb-6 pt-1 flex flex-col gap-4'>
        <Button
          isDisabled={!isFormValid}
          size='lg'
          variant='shadow'
          color='primary'
          onPress={handleSavePhone}
          className='w-full font-semibold gap-2 flex-shrink-0'
        >
          Добавить номер
        </Button>
      </div>
    </>
  );
};
