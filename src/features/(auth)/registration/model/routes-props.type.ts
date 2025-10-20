import { ERegistrationRoutes } from './registration-routes.enum';

export type RegistrationRoutesProps = {
  setActiveRoute: (route: ERegistrationRoutes) => void;
  userEmail: string;
  setUserEmail: (email: string) => void;
};
