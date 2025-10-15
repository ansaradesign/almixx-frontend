import { EditAdPage } from '@albomoni/page/personal/edit-ad';

type Props = {
  params: {
    lng: string;
    adId: string;
  };
};

export default async function Ad({ params: { lng, adId } }: Props) {
  return <EditAdPage lng={lng} adId={adId} />;
}
