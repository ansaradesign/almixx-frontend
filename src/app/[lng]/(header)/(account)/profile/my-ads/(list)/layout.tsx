import { MyAdsPage } from '@albomoni/page/personal/my-ads';
import { I18nLangParam } from '@albomoni/shared/model/types/i18n.type';
import { ReactNode } from 'react';

type Props = {
  params: I18nLangParam;
  children: ReactNode;
};

export default async function MyAdsLayout({
  params: { lng },
  children,
}: Props) {
  return <MyAdsPage lng={lng}>{children}</MyAdsPage>;
}
