import { SearchPage } from '@albomoni/page/public/search';

type Props = {
  params: {
    lng: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Search({ params: { lng }, searchParams }: Props) {
  return <SearchPage searchParams={searchParams} />;
}
