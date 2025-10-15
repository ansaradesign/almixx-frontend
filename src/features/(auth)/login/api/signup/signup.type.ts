import { User } from '@albomoni/shared/model/types/user.type';

export type SignupInputData = {
  email: string;
  first_name: string;
  password: string;
};

export type SignupOutputData = User & {
  access: string;
  refresh: string;
};
