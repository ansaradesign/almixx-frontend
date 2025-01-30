'use server';

import { deleteCookie } from 'cookies-next';
import { cookies } from 'next/headers';

export default async function removeCookie(key: string) {
  deleteCookie(key, { cookies });
}
