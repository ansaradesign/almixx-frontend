import { UserReviewsPage } from '@albomoni/page/public/user-reviews';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';

type Props = {
  params: I18nLangParam & { userId: string };
};

export default async function UserReviews({ params: { lng, userId } }: Props) {
  return <UserReviewsPage lng={lng} userId={userId} />;
}
