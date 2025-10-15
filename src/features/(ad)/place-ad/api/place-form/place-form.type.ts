export type PlaceFormInputData = {
  filters: string[];
  token: string | null;
};

export type PlaceFormOutputData = {
  [key: string]: object | string;
};
