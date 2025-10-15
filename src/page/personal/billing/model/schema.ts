import { luhnCheck } from '@albomoni/page/personal/billing/lib/luhn-check';
import * as yup from 'yup';

const expiryDateRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
const currentYear = new Date().getFullYear() % 100;
const currentMonth = new Date().getMonth() + 1;
const internationalPhoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
const latinNameRegex = /^[A-Za-z\s]+$/;

export const BillingSchema = yup
  .object({
    sum: yup
      .number()
      .typeError('Введите корректную сумму пополнения')
      .min(1, 'Сумма должна быть не менее 1')
      .integer('Сумма должна быть целым числом')
      .required('Введите сумму пополнения'),
    'card-number': yup
      .string()
      .required('Введите номер карты')
      .test('is-valid-card-number', 'Номер карты введён некорректно', (value) =>
        luhnCheck(value || ''),
      )
      .matches(
        /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9]{2})[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11}|220[0-4][0-9]{12})$/,
        'Номер карты введён некорректно',
      )
      .min(13, 'Номер карты должен состоять не менее чем из 13 цифр.')
      .max(19, 'Номер карты должен состоять не более чем из 19 цифр.'),
    email: yup.string().email('Неверный email'),
    'card-date': yup
      .string()
      .required('Укажите дату истечения срока действия карты')
      .matches(expiryDateRegex, 'Формат даты истечения срока действия: ММ/ГГ')
      .test('expiryDate', 'Срок годности карты уже в прошлом', (value) => {
        if (!value) return false;

        const [month, year] = value.split('/').map(Number);
        return (
          year > currentYear || (year === currentYear && month >= currentMonth)
        );
      }),
    cvv: yup
      .string()
      .required('Укажите CVV код карты')
      .matches(/^[0-9]{3,4}$/, 'CVV должен состоять из 3 или 4 цифр'),
    cardholder: yup
      .string()
      .required('Укажите имя и фамилию держателя карты')
      .matches(
        latinNameRegex,
        'Имя и фамилия должны быть указаны латинскими буквами',
      )
      .min(2, 'Имя и фамилия должны быть не менее 2 символов')
      .max(50, 'Имя и фамилия должны быть не более 50 символов'),
    tel: yup
      .string()
      .required('Укажите номер телефона')
      .matches(
        internationalPhoneRegex,
        'Номер телефона недействителен, он должен начинаться с «+».',
      ),
  })
  .required();
