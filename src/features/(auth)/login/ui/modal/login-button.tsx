import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import { Button, useDisclosure } from '@nextui-org/react';
import { LoginModal } from '.';

export const LoginButton = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { t } = useClientTranslation('forms');

  return (
    <>
      <Button
        disableRipple
        size='lg'
        variant='shadow'
        color='primary'
        className='text-sm font-medium flex-shrink-0 '
        onPress={onOpen}
      >
        {t('registration.title')}
      </Button>
      <LoginModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};
