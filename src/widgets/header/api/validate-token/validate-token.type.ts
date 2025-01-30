import { UserType } from '@albomoni/entities/user/model/user.type';

export type ValidateTokenInputData = {
  token: string;
};

export type ValidateTokenOutputData = UserType;
