export type PlaceAdInputData = {
  filters?: string[];
  fields?: {
    [key: string]:
      | string
      | string[]
      | FormData
      | File[]
      | { [key: string]: string | string[] | number };
  };
  images?: FormData;
  hash: string;
  token: string | null;
};

export type PlaceAdOutputData = {
  [key: string]: object | string;
};
