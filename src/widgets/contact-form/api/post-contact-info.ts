import { API_URL } from '@albomoni/shared/config';
import { ContactFormDataI } from '../model/contact-form-data';

export const postContactInfo = async (data: ContactFormDataI) => {
  const formData = new FormData();
  formData.append('email', data.email);
  formData.append('appeal', data.appeal);
  formData.append('selectedContactVariant', data.selectedContactVariant);
  if (data.attachments) {
    formData.append('attachments', data.attachments);
  }
  try {
    return await fetch(`${API_URL}feedback-message/`, {
      headers: {
        Accept: '*/*',
      },
      method: 'POST',
      body: formData,
    });
  } catch (error) {
    return error;
  }
};
