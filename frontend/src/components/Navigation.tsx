import { Button } from './ui/button';
import { Home, Package, Plus, Info, LogOut, Palette, ShoppingCart } from 'lucide-react';
import varnikaLogo from '../imports/varnika-logo.svg';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  onLogout: () => void;
  isLoggedIn: boolean;
}

export function Navigation({ currentPage, onPageChange, onLogout, isLoggedIn }: NavigationProps) {
  if (!isLoggedIn) return null;

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'products', label: 'Products', icon: ShoppingCart },
    { id: 'add-product', label: 'Add Product', icon: Plus },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-lg border-b border-amber-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-3">
              <img src={varnikaLogo} alt="Varnika" className="w-10 h-10 object-contain" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Varnika</h1>
            </div>
            <div className="hidden md:flex space-x-4">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? 'default' : 'ghost'}
                    onClick={() => onPageChange(item.id)}
                    className={`flex items-center space-x-2 rounded-xl font-medium transition-all duration-200 ${
                      currentPage === item.id 
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg' 
                        : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50'
                    }`}
                  >
                    <IconComponent size={16} />
                    <span>{item.label}</span>
                  </Button>
                );
              })}
            </div>
          </div>
          <Button 
            variant="outline" 
            onClick={onLogout} 
            className="flex items-center space-x-2 border-amber-300 text-amber-700 hover:bg-amber-50 rounded-xl"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </Button>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden flex justify-around py-2 border-t">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'default' : 'ghost'}
                onClick={() => onPageChange(item.id)}
                className="flex flex-col items-center space-y-1 h-auto py-2"
                size="sm"
              >
                <IconComponent size={16} />
                <span className="text-xs">{item.label}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}