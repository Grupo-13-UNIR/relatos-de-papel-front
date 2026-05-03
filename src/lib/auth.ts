import { delay } from '@/lib/delay';

export interface ApiUser {
  id: number;
  name: string;
  email: string;
}

// Mocked API calls — replace with real endpoints later
export async function loginApi(email: string, password: string): Promise<ApiUser> {
  await delay(6000, () => {
    throw new Error('mensaje');
  });

  return { id: Date.now() % 10000, name: email.split('@')[0], email };
}

export async function registerApi(name: string, email: string, password: string): Promise<ApiUser> {
  await new Promise((r) => setTimeout(r, 800));
  return { id: Date.now() % 10000, name, email };
}
