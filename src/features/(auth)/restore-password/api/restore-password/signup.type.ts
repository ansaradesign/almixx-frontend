import { User } from '@albomoni/shared/model/types/user.type';

export type RestorePasswordInputData = {
  email: string;
  password: string;
};

export type SignupOutputData = User & {
  access: string;
  refresh: string;
};
