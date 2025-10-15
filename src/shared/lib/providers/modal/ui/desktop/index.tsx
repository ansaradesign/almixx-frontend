import { AnimatePresence, m } from 'framer-motion';
import { useRef } from 'react';
import { RemoveScroll } from 'react-remove-scroll';
import { EModalStates } from '../../model/modal-states.enum';
import { useModal } from '../../lib/use-modal';
import { ModalContent } from '../modal-content';

export const ModalDesktop = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const { modalState, setModalState } = useModal();

  const handleCloseModal = () => {
    setModalState(EModalStates.NULL);
  };

  return (
    <AnimatePresence>
      {modalState !== EModalStates.NULL && (
        <RemoveScroll>
          <div className='fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-50'>
            <m.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              type='button'
              className='fixed top-0 bottom-0 left-0 right-0 z-0 bg-black/80'
              onClick={handleCloseModal}
            />
            <m.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: { ease: [0, 1, 0, 1], duration: 1 },
              }}
              exit={{ filter: 'blur(25px)', opacity: 0, scale: 1.1 }}
              className='w-full mx-1 max-w-[440px] max-h-[70dvh] flex flex-col m-auto box-border bg-[--bg] rounded-4xl border-1 border-white/10 z-50 shadow-2xl shadow-black/50 overflow-hidden'
              ref={rootRef}
            >
              <ModalContent />
            </m.div>
          </div>
        </RemoveScroll>
      )}
    </AnimatePresence>
  );
};
