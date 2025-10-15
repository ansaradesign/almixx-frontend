export const MenuVariants = {
  variants: {
    enter: {
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
    exit: {
      opacity: 0,
      filter: 'blur(30px)',
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  },
};
