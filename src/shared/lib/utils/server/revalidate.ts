'use server';

import { revalidatePath } from 'next/cache';

export default async function revalidateRoute(route: string) {
  revalidatePath(route);
}
