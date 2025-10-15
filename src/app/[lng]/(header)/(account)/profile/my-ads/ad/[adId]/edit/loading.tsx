import { Spinner } from '@nextui-org/spinner';

export default function LoadingCategory() {
  return (
    <div className='absolute h-dvh top-0 bottom-0 left-0 right-0 flex items-center justify-center'>
      <Spinner />
    </div>
  );
}
