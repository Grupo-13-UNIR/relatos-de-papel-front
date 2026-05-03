import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import type { User } from '@/types/user.ts';

import noAvatar from '@/assets/no-avatar.png';

export interface ProfileAvatarProps {
  user?: User;
  onLogout?: () => void;
  onLogin?: () => void;
}
export const ProfileAvatar = ({ user, onLogin, onLogout }: ProfileAvatarProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="focus:outline-none">
          <img
            src={user?.avatar || noAvatar}
            alt="Avatar"
            className="w-10 h-10 rounded-full object-cover cursor-pointer"
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-32 bg-white border border-gray-200 rounded-md shadow-lg"
      >
        {user ? (
          <DropdownMenuItem
            onClick={onLogout}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Log out
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={onLogin}
            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          >
            Login
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
