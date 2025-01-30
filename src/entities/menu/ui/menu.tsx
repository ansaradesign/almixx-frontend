import { Modal, ModalContent } from '@nextui-org/modal';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
import { ModalHeader } from './modal-header';
import { MenuVariants } from '../config/menu-variants';
import { MenuAside } from './menu-aside';
import { MenuCategories } from './menu-categories';

type Props = {
  isOpen: boolean;
  onOpenChange: () => void;
};

export const Menu = ({ isOpen, onOpenChange }: Props) => {
  return (
    <Modal
      backdrop='transparent'
      motionProps={MenuVariants}
      size='full'
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      classNames={{ closeButton: 'hidden', base: 'dark:bg-black' }}
    >
      <ModalContent>
        {(onClose) => (
          <div className='flex flex-col w-full items-center'>
            <ModalHeader onClose={onClose} />
            <ScrollShadow
              hideScrollBar
              className='flex w-full h-[calc(100dvh-80px)] flex-col tablet:flex-row-reverse gap-4 lg:gap-8 px-4 max-w-7xl pt-2'
            >
              <MenuAside onClose={onClose} />
              <MenuCategories onClose={onClose} />
            </ScrollShadow>
          </div>
        )}
      </ModalContent>
    </Modal>
  );
};
