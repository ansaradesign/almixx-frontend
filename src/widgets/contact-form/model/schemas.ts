import * as yup from 'yup';

export const emailFormSchema = yup.object().shape({
  email: yup.string().email().required(),
});

export const appealFormSchema = yup.object().shape({
  appeal: yup.string().required().min(9),
});
