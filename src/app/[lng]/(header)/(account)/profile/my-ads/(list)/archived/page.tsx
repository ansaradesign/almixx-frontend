import { MyAdsArchivedPage } from '@albomoni/page/personal/my-ads/ui/archived';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';

type Props = {
  params: I18nLangParam;
};

export default async function MyAdsArchived({ params: { lng } }: Props) {
  return <MyAdsArchivedPage lng={lng} />;
}
