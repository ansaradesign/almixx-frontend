import { MyAdPage } from '@albomoni/page/personal/my-ad/ui';

type Props = {
  params: {
    lng: string;
    adId: string;
  };
};

export default async function Ad({ params: { lng, adId } }: Props) {
  return <MyAdPage lng={lng} adId={adId} />;
}
