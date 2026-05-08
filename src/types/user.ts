export interface User {
  id: number;
  email: string;
  name: string;
  lastname: string;
  avatar?: string;
}

export type AuthUser = User & { id?: number; password: string };
