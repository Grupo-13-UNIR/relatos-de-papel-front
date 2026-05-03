export interface User {
  id: number;
  username: string;
  name: string;
  lastname: string;
  avatar?: string;
  email: string;
}

export type AuthUser = User & { id?: number; password: string };
