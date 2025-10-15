import { PlaceAdFormState } from '../../model/form.type';
import { PlaceAdAddress } from './address';
import { PlaceAdAutocomplete } from './autocomplete';
import { PlaceAdNumber } from './number';
import { PlaceAdPhotos } from './photos';
import { PlaceAdPrice } from './price';
import { PlaceAdSingleSelect } from './single-select';
import { PlaceAdText } from './text';
import { PlaceAdTextarea } from './textarea';

export type PlaceAdInput = {
  name: string;
  type: 'textarea';
  variants: string[];
  value: string;
  form: PlaceAdFormState;
  updateForm: (draft: any) => void;
  isImagesLoaded?: boolean;
};

export const PlaceAdFormElement = ({
  name,
  type,
  variants,
  value,
  form,
  updateForm,
  isImagesLoaded,
}: PlaceAdInput) => {
  const FormElements = {
    address: PlaceAdAddress,
    textarea: PlaceAdTextarea,
    single: PlaceAdSingleSelect,
    price: PlaceAdPrice,
    images: PlaceAdPhotos,
    autocomplete: PlaceAdAutocomplete,
    text: PlaceAdText,
    number: PlaceAdNumber,
  };

  const Element = FormElements[type];

  if (type in FormElements)
    return (
      <Element
        isImagesLoaded={isImagesLoaded}
        title={name}
        variants={variants}
        form={form}
        updateForm={updateForm}
        value={value}
      />
    );

  return null;
};
