import { PromoOptions } from '@albomoni/shared/lib/providers/modal/ui/variants/promote-ad';
import { TLocation } from '@albomoni/shared/model/types/location.type';

export type ImageType = { full: string; preview: string };

type AdInfo = {
  id: number;
  description: string;
  title: string | null;
  cost: number;
  currency: string;
  date: string;
  hash: string;
  geoposition: string;
  plan: PromoOptions;
  isService: boolean;
  category: string[];
  images: ImageType[];
  status: 'active' | 'moderating' | 'archived' | 'ended';
  status_text: 'correct' | 'error' | 'phone';
  views: number;
  favorites: number;
  phone_views: number;
  seller: 'owner' | 'broker';
  additional: {
    [key: string]: string;
  };
} & TLocation;

export type PublicAdType = {
  id: number;
  user_id: number;
  description: string;
  title: string | null;
  cost: number;
  date: string;
  seller: 'owner';
  geoposition: string;
  isService: boolean;
  plan: PromoOptions;
  additional: {
    [key: string]: string;
  };
  hash: string;
  category_id: number;
  currency: 'RUB' | 'USD' | 'EUR';
  status: 'active' | 'moderating' | 'archived' | 'ended';
  category: string[];
  image: {
    id: number;
    file: string;
    file_preview: string;
    hash: string;
  }[];
};

export type Ad = {
  ad: AdInfo;
  seller: {
    user_id: number;
    name: string;
    avatar: string | null;
    subscription: boolean;
    rating: number;
    feedback_count: number;
  };
};

export type MyAd = AdInfo & {
  views: number;
  favorites: number;
  phone_views: number;
};
