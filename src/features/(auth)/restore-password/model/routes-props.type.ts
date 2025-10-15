import { ERestorePasswordRoutes } from './restore-password-routes.enum';

export type RegistrationRoutesProps = {
  setActiveRoute: (route: ERestorePasswordRoutes) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
};
