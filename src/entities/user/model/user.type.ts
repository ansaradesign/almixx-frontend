import { TLocation } from '@albomoni/shared/model/types/location.type';

type PhoneType = { id: number; phone: string; name: string };

export type UserType = {
  user_id: number;
  first_name: string;
  last_name: string | null;
  patronymic: string | null;
  email: string;
  avatar: string | null;
  money: number;
  currency: string;
  subscription: boolean;
  phones: PhoneType[];
  notifications: number;
  products: number;
  plans: number;
  views: number[];
  date_joined: string;
  description: string;
} & TLocation;

export type PublicUserType = {
  user_id: number;
  first_name: string;
  last_name: string | null;
  patronymic: string | null;
  avatar: string | null;
  subscription: boolean;
  regDate: string;
  rate: number;
  feedback: number;
  date_joined: string;
  description: string;
};
