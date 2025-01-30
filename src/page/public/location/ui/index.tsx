import { LocationPicker } from '@albomoni/widgets/location-picker';

export const LocationPage = () => {
  return (
    <main className='w-full flex justify-center '>
      <div className='flex flex-col gap-10 w-full max-w-7xl px-4 mb-40 pt-5 md:pt-10'>
        <div className='w-full h-min flex flex-col gap-10'>
          <h2 className='text-2xl md:text-3xl font-bold'>
            Регион отображаемых объявлений
          </h2>
          <LocationPicker />
        </div>
      </div>
    </main>
  );
};
