import { useContext, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router';
import { Input } from '@/components/ui/input.tsx';
import { ProfileAvatar } from '@/components/profile-avatar.tsx';
import { AuthContext } from '@/context/auth/AuthContext.tsx';
import { BookOpen, ShoppingCart } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { AuthButtons } from '@/components/auth-buttons';
import { CartDropdown } from '@/components/cart/cartDropdown';

export interface NavigationBarProps {
  showSearch: boolean;
}

export const NavigationBar = ({ showSearch }: NavigationBarProps) => {
  const navigate = useNavigate();

  const { user, onLogout } = useContext(AuthContext);

  const [searchInput, setSearchInput] = useState('');

  const [showCart, setShowCart] = useState(false);

  const timeoutRef = useRef<number | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setShowCart(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = window.setTimeout(() => {
      setShowCart(false);
    }, 200);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchInput.trim()) {
      navigate(`/books?title=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput('');
    }
  };

  return (
    <div className="w-full bg-card shadow-md border-b border-border py-4 px-6 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Link to="/" className="text-xl font-bold text-foreground flex items-center">
          <BookOpen className="size-6 text-primary mr-2" />
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

      <div
        className="relative cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div onClick={() => navigate('/cart')} className="relative">
          <ShoppingCart className="w-6 h-6 text-gray-700" />
        </div>

        {showCart && <CartDropdown />}
      </div>

      <div>
        {user ? (
          <ProfileAvatar
            user={user}
            onEditProfile={() => navigate('/profile')}
            onLogout={onLogout}
          />
        ) : (
          <AuthButtons />
        )}
      </div>

      <div>
        <ModeToggle />
      </div>
    </div>
  );
};
