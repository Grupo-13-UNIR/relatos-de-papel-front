import type { User } from '@/types/user.ts';

export const usersMock: (User & { password: string })[] = [
  {
    id: 1,
    username: 'user1',
    name: 'User',
    lastname: '1',
    avatar: 'https://i.pravatar.cc/150?img=1',
    email: 'user1@gmail.com',
    password: 'user1',
  },
  {
    id: 2,
    username: 'user2',
    name: 'User',
    lastname: '2',
    avatar: 'https://i.pravatar.cc/150?img=2',
    email: 'user2@gmail.com',
    password: 'user2',
  },
  {
    id: 3,
    username: 'user3',
    name: 'User',
    lastname: '3',
    avatar: 'https://i.pravatar.cc/150?img=3',
    email: 'user3@gmail.com',
    password: 'user3',
  },
  {
    id: 4,
    username: 'user4',
    name: 'User',
    lastname: '4',
    avatar: 'https://i.pravatar.cc/150?img=4',
    email: 'user4@gmail.com',
    password: 'user4',
  },
  {
    id: 5,
    username: 'user5',
    name: 'User',
    lastname: '5',
    avatar: 'https://i.pravatar.cc/150?img=5',
    email: 'user5@gmail.com',
    password: 'user5',
  },
];
