import { UserAdsEnded } from '@albomoni/page/public/user/ui/ads-ended';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';

type Props = {
  params: I18nLangParam & { userId: string };
};

export default async function UserEnded({ params: { lng, userId } }: Props) {
  return <UserAdsEnded lng={lng} userId={userId} />;
}
