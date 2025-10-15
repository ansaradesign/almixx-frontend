/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import * as yup from 'yup';

const requiredField = 'Обязательное поле.';

export const EmailCheckSchema = yup
  .object({
    email: yup
      .string()
      .email('registration.validation.email')
      .matches(/^(?!.*@[^,]*,)/, 'email.validation.email')
      .required('registration.validation.required'),
  })
  .required();

export type EmailCheckSchemaFormData = yup.InferType<typeof EmailCheckSchema>;

export const EmailConfirmSchema = yup
  .object({
    code: yup
      .string()
      .matches(/^\d+$/, 'Код содержит только цифры.')
      .min(6, 'Код шестизначный.')
      .required('Введите проверочный код.'),
  })
  .required();

export type EmailConfirmSchemaFormData = yup.InferType<
  typeof EmailConfirmSchema
>;

export const UserDataSchema = yup
  .object({
    password: yup
      .string()
      .required(requiredField)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!-@#\$%\^&\*])(?=.{8,})/,
        'Пароль должен содержать минимум 8 символов, одну заглавную букву, одну прописную букву, одну цифру и один спецсимвол.',
      ),
    confirmPassword: yup
      .string()
      .when('password', (password, field) =>
        password
          ? field
            .required(requiredField)
            .oneOf([yup.ref('password')], 'Пароли должны совпадать.')
          : field,
      ),
    approveRules: yup.boolean().oneOf([true]),
  })
  .required();

export type UserDataSchemaFormData = yup.InferType<typeof UserDataSchema>;
