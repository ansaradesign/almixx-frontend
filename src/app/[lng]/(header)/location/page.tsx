import { LocationPage } from '@albomoni/page/public/location';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';

type Props = {
  params: I18nLangParam;
};

export default async function Location({ params: { lng } }: Props) {
  return <LocationPage />;
}
