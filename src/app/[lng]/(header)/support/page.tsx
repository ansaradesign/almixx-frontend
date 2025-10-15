import { SupportPage } from '@albomoni/page/public/support';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';

type Props = {
  params: I18nLangParam;
};

export default function Support({ params: { lng } }: Props) {
  return <SupportPage />;
}
