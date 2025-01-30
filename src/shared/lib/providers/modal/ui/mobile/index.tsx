import { AnimatePresence, m } from 'framer-motion';
import { useRef } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { EModalStates } from '../../model/modal-states.enum';
import { useModal } from '../../lib/use-modal';
import { ModalContent } from '../modal-content';
import { ModalMobileCloser } from './closer';

export const ModalMobile = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { modalState, setModalState } = useModal();

  const handleCloseModal = () => {
    setModalState(EModalStates.NULL);
  };

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.y > 180) {
      handleCloseModal();
    }
  };

  return (
    <AnimatePresence>
      {modalState !== EModalStates.NULL && (
        <RemoveScroll>
          <div className='fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-50'>
            <m.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              type='button'
              className='fixed top-0 bottom-0 left-0 right-0 z-0 bg-black'
              onClick={handleCloseModal}
            />
            <m.div
              initial={{ y: '100%' }}
              animate={{
                y: 0,
                transition: { ease: [0, 1, 0, 1], duration: 1 },
              }}
              exit={{
                y: '100%',
                opacity: 0,
              }}
              drag='y'
              dragConstraints={{ top: 0, bottom: 1000 }}
              dragElastic={{ bottom: 0.05 }}
              dragSnapToOrigin
              onDragEnd={handleDragEnd}
              className='absolute border-t-1 border-white/10 bottom-0 w-full max-h-[97dvh] flex flex-col m-auto box-border bg-[--bg] rounded-t-[40px] z-50 shadow-2xl shadow-black overflow-hidden min-h-64'
              ref={rootRef}
            >
              <ModalMobileCloser />
              <ModalContent />
            </m.div>
          </div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  );
};
