import { ContactFormDataI } from '../model/contact-form-data';
import { appealFormSchema, emailFormSchema } from '../model/schemas';

export const validator = async (data: ContactFormDataI) => {
  try {
    await emailFormSchema.validate(
      { email: data.email },
      { abortEarly: false },
    );
    try {
      await appealFormSchema.validate(
        { appeal: data.appeal },
        { abortEarly: false },
      );
      return [true, true];
    } catch (error) {
      return [true, false];
    }
  } catch (error) {
    return [false, true];
  }
};
