import { HomePage } from '@albomoni/page/public/home';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';

export default async function Home({
  params: { lng },
}: {
  params: I18nLangParam;
}) {
  return <HomePage lng={lng} />;
}
