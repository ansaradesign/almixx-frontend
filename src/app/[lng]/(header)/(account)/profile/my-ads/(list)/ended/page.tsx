import { MyAdsEndedPage } from '@albomoni/page/personal/my-ads/ui/ended';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';

type Props = {
  params: I18nLangParam;
};

export default async function MyAdsEnded({ params: { lng } }: Props) {
  return <MyAdsEndedPage lng={lng} />;
}
