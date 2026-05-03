import type { AuthUser, User } from '@/types/user.ts';
import { usersMock } from '@/mock/user-mock.ts';

export const userService = {
  login: async (credentials: { username: string; password: string }): Promise<User> => {
    const user = usersMock.find(
      (user) => user.username == credentials.username && user.password == credentials.password
    );
    if (!user) {
      throw new Error('Credenciales inválidas');
    }
    const { password, ...userWithoutPassword } = user;
    return Promise.resolve(userWithoutPassword);
  },
  register: async (user: AuthUser): Promise<User> => {
    const { password, ...userWithoutPassword } = user;
    return Promise.resolve({ ...userWithoutPassword, id: 1 });
  },
};
