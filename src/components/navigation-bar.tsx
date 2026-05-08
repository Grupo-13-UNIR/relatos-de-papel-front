import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Input } from '@/components/ui/input.tsx';
import { ProfileAvatar } from '@/components/profile-avatar.tsx';
import { AuthContext } from '@/context/auth/AuthContext.tsx';
import { ShoppingCart } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { AuthButtons } from '@/components/auth-buttons';

export interface NavigationBarProps {
  showSearch: boolean;
}

export const NavigationBar = ({ showSearch }: NavigationBarProps) => {
  const navigate = useNavigate();
  const { user, onLogout } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState('');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      navigate(`/books?title=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="w-full bg-card shadow-md border-b border-border py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-xl font-bold text-foreground">
          Relatos de Papel
        </Link>
      </div>
      {showSearch && (
        <Input
          placeholder="Busca tu producto"
          value={searchInput}
          onKeyDown={handleKeyDown}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full max-w-xs border-border"
        />
      )}
      <div className="transition-colors">
        <Link to="/books" className="text-gray-700">
          Catálogo
        </Link>
      </div>
      <div className="relative cursor-pointer" onClick={() => navigate('/cart')}>
        <ShoppingCart className="w-6 h-6 text-gray-700" />
      </div>

      <div>
        {user ? (
          <ProfileAvatar
            user={user}
            onEditProfile={() => navigate('/profile')}
            onLogout={onLogout}
          />
        ) : (
          <AuthButtons></AuthButtons>
        )}
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
};
