import { MyAdsActivePage } from '@albomoni/page/personal/my-ads/ui/active';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';

type Props = {
  params: I18nLangParam;
};

export default async function MyAdsActive({ params: { lng } }: Props) {
  return <MyAdsActivePage lng={lng} />;
}
