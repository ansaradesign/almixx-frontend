import { PiEye, PiEyeSlash } from 'react-icons/pi';

type Props = {
  isVisible: boolean;
  toggleVisibility: () => void;
};

export const PasswordVisibilityButton = ({
  isVisible,
  toggleVisibility,
}: Props) => (
  <button
    className='focus:outline-none'
    type='button'
    onClick={toggleVisibility}
  >
    {isVisible ? (
      <PiEyeSlash className='text-2xl text-default-400 pointer-events-none' />
    ) : (
      <PiEye className='text-2xl text-default-400 pointer-events-none' />
    )}
  </button>
);
