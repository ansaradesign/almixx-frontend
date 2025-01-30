import { FavoritePage } from '@albomoni/page/public/favorite';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Favorites({
  params: { lng },
}: {
  params: I18nLangParam;
}) {
  const favoritesId = getCookie('favorites', { cookies });

  return <FavoritePage lng={lng} favoritesId={favoritesId as string} />;
}
