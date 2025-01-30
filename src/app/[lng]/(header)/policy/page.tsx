import { PolicyPage } from '@albomoni/page/public/policy';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';

type Props = {
  params: I18nLangParam;
};

export default function Policy({ params: { lng } }: Props) {
  return <PolicyPage />;
}
