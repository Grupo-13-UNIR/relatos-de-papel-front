import type { AuthUser, User } from '@/types/user.ts';
import { usersMock } from '@/mock/user-mock.ts';

export const userService = {
  login: async (credentials: { email: string; password: string }): Promise<User> => {
    const user = usersMock.find(
      (user) => user.email == credentials.email && user.password == credentials.password
    );
    if (!user) {
      throw new Error('Credenciales inválidas');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return Promise.resolve(userWithoutPassword);
  },
  register: async (user: AuthUser): Promise<User> => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;
    return Promise.resolve({ ...userWithoutPassword, id: 1 });
  },
};
