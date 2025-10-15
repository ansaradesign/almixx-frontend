import { MutableRefObject } from 'react';

export const scrollLeft = (
  slideRef: MutableRefObject<HTMLElement | null | undefined>,
) => {
  if (slideRef.current) {
    const nextScrollLeft =
      Number(slideRef.current.scrollLeft) -
      Number(slideRef.current.offsetWidth);
    slideRef.current.scrollTo({
      left: nextScrollLeft,
      behavior: 'smooth',
    });
  }
};
export const scrollRight = (
  slideRef: MutableRefObject<HTMLElement | null | undefined>,
) => {
  if (slideRef.current) {
    const nextScrollLeft =
      Number(slideRef.current.scrollLeft) +
      Number(slideRef.current.offsetWidth);
    slideRef.current.scrollTo({
      left: nextScrollLeft,
      behavior: 'smooth',
    });
  }
};
