import { TooltipTransitionVariants } from '@albomoni/shared/config/transition-variants';
import { useScrollDirection } from '@albomoni/shared/lib/hooks/use-scroll-direction';
import { useScrolledTo } from '@albomoni/shared/lib/hooks/use-scrolled-to';
import { Tooltip } from '@nextui-org/tooltip';
import { AnimatePresence, m } from 'framer-motion';
import { clsx } from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useClientTranslation } from '@albomoni/shared/lib/hooks/use-client-translation';
import Link from 'next/link';
import { MenuButton } from '@albomoni/entities/menu';
import { PiCaretLeftBold } from 'react-icons/pi';
import { useOriginContext } from '@albomoni/shared/lib/providers/origin-provider';
import { useCallback, useEffect } from 'react';
import { HeaderNavigationPaths } from '../config/header-navigation-paths';
import { BackableRoutes } from '../config/backable-routes';

export const FixedBars = () => {
  const { t } = useClientTranslation();
  const isScrolled = useScrolledTo(128);
  const scrollDir = useScrollDirection();
  const activePath = usePathname();
  const router = useRouter();
  const isWithinPage = useOriginContext();

  useEffect(() => {
    router.prefetch('/login');
  }, []);

  const normalizedPath = activePath.slice(3) === '' ? '/' : activePath.slice(3);

  const flatRoute = normalizedPath.split('/').slice(1).join('/');
  const isBackableRoute = BackableRoutes.some((route) => {
    const regex = new RegExp(route);
    return regex.test(flatRoute);
  });

  const isAdRoute =
    flatRoute.split('/')[0] === 'ad' ||
    flatRoute.split('/')[2] === 'ad' ||
    flatRoute.split('/')[0] === 'user';

  const handleBack = useCallback(() => {
    if (isWithinPage) router.back();
    else router.push('/');
  }, [isWithinPage, router]);

  return (
    <>
      <AnimatePresence>
        {isScrolled && scrollDir === 'up' && !isAdRoute && (
          <m.div
            initial={{ y: '-150%' }}
            animate={{ y: 0 }}
            exit={{ y: '-150%' }}
            className='fixed max-w-7xl top-0 w-full h-20 z-50 flex items-center justify-end px-4 gap-4 lg:gap-8'
          >
            {/* <Search isScrollable /> */}
            <MenuButton />
          </m.div>
        )}
      </AnimatePresence>

      {/* <AnimatePresence>
        {scrollDir !== 'down' && ( */}
      <m.div
        initial={{ y: '150%', filter: 'blur(10px)', scale: 0.5 }}
        animate={{ y: 0, filter: 'blur(0px)', scale: 1 }}
        exit={{ y: '150%', filter: 'blur(10px)', scale: 0.5 }}
        className='fixed bottom-5 md:bottom-6 w-[calc(100%-56px)] sm:w-96 h-14 z-50 flex bg-white/80 dark:bg-black/80 backdrop-blur-xl rounded-[20px] shadow-base origin-bottom dark:border-1 dark:border-white/10'
      >
        {HeaderNavigationPaths.map(({ id, path, icon: Icon }) => {
          const buttonStyles = clsx(
            'w-full h-full flex justify-center items-center',
            {
              'opacity-50': path !== normalizedPath,
            },
          );

          if (flatRoute === '') {
            router.prefetch(path);
          }

          return (
            <Tooltip
              key={id}
              motionProps={TooltipTransitionVariants}
              content={t(`pages.${id}`)}
            >
              <Link
                href={path}
                aria-label={t(`pages.${id}`)}
                className={buttonStyles}
              >
                <Icon size={24} />
              </Link>
            </Tooltip>
          );
        })}

        <AnimatePresence>
          {isBackableRoute && (
            <m.button
              initial={{ y: 20, filter: 'blur(10px)', opacity: 0 }}
              animate={{
                y: 0,
                filter: 'blur(0px)',
                opacity: 1,
                transition: { delay: 0.2 },
              }}
              exit={{ y: 20, filter: 'blur(10px)', opacity: 0 }}
              transition={{ duration: 0.2 }}
              type='button'
              onClick={handleBack}
              className='absolute -top-10 left-0 md:-left-24 md:top-[14px] w-min h-min pl-2 pr-3 py-1 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-base dark:border-1 dark:border-white/10 flex gap-1 items-center text-sm font-semibold'
            >
              <PiCaretLeftBold />
              Назад
            </m.button>
          )}
        </AnimatePresence>
      </m.div>
      {/* )}
      </AnimatePresence> */}
    </>
  );
};
