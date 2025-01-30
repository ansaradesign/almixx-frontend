import { MyAdsModeratingPage } from '@albomoni/page/personal/my-ads/ui/moderating';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';

type Props = {
  params: I18nLangParam;
};

export default async function MyAdsModerating({ params: { lng } }: Props) {
  return <MyAdsModeratingPage lng={lng} />;
}
