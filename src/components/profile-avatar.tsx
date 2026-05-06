import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import type { User } from '@/types/user.ts';

import noAvatar from '@/assets/no-avatar.png';
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export interface ProfileAvatarProps {
  user: User;
  onLogout: () => void;
  onEditProfile: () => void;
}
export const ProfileAvatar = ({ user, onLogout, onEditProfile }: ProfileAvatarProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0) + user.lastname.charAt(0)}</AvatarFallback>
            <AvatarBadge className="bg-green-600 dark:bg-green-800" />
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-32 bg-popover border border-border rounded-md shadow-lg"
      >
        <DropdownMenuItem
          className="px-4 py-2 hover:bg-muted cursor-pointer"
          onClick={onEditProfile}
        >
          Editar perfil
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={onLogout}
          className="px-4 py-2 hover:bg-muted cursor-pointer"
        >
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
