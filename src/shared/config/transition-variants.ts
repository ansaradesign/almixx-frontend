export const PopoverTransitionVariants = {
  variants: {
    start: {
      y: -10,
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        opacity: {
          duration: 0.15,
        },
      },
    },
    exit: {
      y: 10,
      opacity: 0,
      scale: 0,
      filter: 'blur(20px)',
      transition: {
        opacity: {
          duration: 0.15,
        },
      },
    },
  },
} as const;

export const TooltipTransitionVariants = {
  variants: {
    exit: {
      opacity: 0,
      scale: 0,
      filter: 'blur(20px)',
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
    enter: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.15,
        ease: 'easeOut',
      },
    },
  },
} as const;
