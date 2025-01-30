'use server';

import { setCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';
import { cookies } from 'next/headers';

export default async function addCookie(
  key: string,
  value: string,
  options?: OptionsType,
) {
  setCookie(key, value, { cookies });
}
