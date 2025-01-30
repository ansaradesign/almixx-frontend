export type PlaceAdFormState = {
  fields: {
    [key: string]:
      | string
      | string[]
      | FormData
      | File[]
      | { [key: string]: string | string[] | number };
  };
  filters: string[];
  errors: { [key: string]: string };
};

export type PlaceAdInputProps = {
  title: string;
  value: any;
  variants?: string[];
  form?: PlaceAdFormState;
  updateForm: (draft: any) => void;
  isImagesLoaded?: boolean;
};
