import { Skeleton } from '@nextui-org/skeleton';

type Props = {
  height?: number;
};

export const AdsSkeleton = ({ height }: Props) => {
  const skeletons = Array(12).fill(null);

  return (
    <>
      {skeletons.map(() => (
        <Skeleton
          key={Math.random()}
          style={{ height }}
          className='w-full min-h-64 rounded-2xl'
        />
      ))}
    </>
  );
};
