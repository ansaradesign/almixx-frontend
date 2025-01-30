import { m } from 'framer-motion';

export const ModalMobileCloser = () => {
  return (
    <m.button
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.4 } }}
      exit={{ opacity: 0 }}
      whileTap={{ scale: 1.2 }}
      className='absolute self-center -top-1 mx-auto w-full h-20 flex items-start justify-center pt-5 z-50'
    >
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.4 } }}
        exit={{ opacity: 0 }}
        whileTap={{ scale: 1.2 }}
        className='w-14 h-1 rounded-full bg-[--text]'
      />
    </m.button>
  );
};
