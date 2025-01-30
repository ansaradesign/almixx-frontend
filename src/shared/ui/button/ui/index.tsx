import { Button as NextUIButton } from '@nextui-org/button';
import { clsx } from 'clsx';
import { ButtonHTMLAttributes, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onPress?: () => void;
  size?: 'sm' | 'md' | 'lg';
  color?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'danger';
  variant?:
    | 'solid'
    | 'bordered'
    | 'light'
    | 'flat'
    | 'faded'
    | 'shadow'
    | 'ghost';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  onPress,
  size = 'lg',
  color = 'default',
  className,
  variant = 'solid',
  type = 'button',
}: Props) => {
  const wrapperStyles = clsx(
    'overflow-clip flex-shrink-0 transition-transform',
    {
      'rounded-[14px]': size === 'lg',
      'rounded-[11px]': size === 'md',
      'rounded-[7px]': size === 'sm',
    },
  );

  return (
    <div className={wrapperStyles}>
      <NextUIButton
        size={size}
        color={color}
        className={`${className} !outline-0`}
        variant={variant}
        onPress={onPress}
        type={type}
      >
        {children}
      </NextUIButton>
    </div>
  );
};
