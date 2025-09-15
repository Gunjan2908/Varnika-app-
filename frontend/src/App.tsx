import { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { LandingPage } from './components/LandingPage';
import { HomePage } from './components/HomePage';
import { LoginDialog } from './components/LoginDialog';
import { Navigation } from './components/Navigation';
import { ProductsPage } from './components/ProductsPage';
import { AddProductPage } from './components/AddProductPage';
import { AboutPage } from './components/AboutPage';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  artisan: string;
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [userEmail, setUserEmail] = useState('');
  
  // Mock products data
  const [products, setProducts] = useState<Product[]>([
    {
      id: '1',
      name: 'Traditional Clay Pot',
      description: 'Handcrafted terracotta pot perfect for storing water and keeping it cool naturally.',
      price: '₹1,250',
      image: 'https://images.unsplash.com/photo-1716876995651-1ff85b65a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoYW5kaWNyYWZ0cyUyMHBvdHRlcnl8ZW58MXx8fHwxNzU3NTAwNDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'pottery',
      artisan: 'Ramesh Kumar'
    },
    {
      id: '2',
      name: 'Handwoven Silk Scarf',
      description: 'Beautiful silk scarf with traditional patterns, woven on a hand loom.',
      price: '₹3,500',
      image: 'https://images.unsplash.com/photo-1632726733402-4a059a476028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZXh0aWxlcyUyMGhhbmRpY3JhZnRzfGVufDF8fHx8MTc1NzU3NDkwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'textiles',
      artisan: 'Priya Devi'
    },
    {
      id: '3',
      name: 'Carved Wooden Elephant',
      description: 'Intricately carved wooden elephant sculpture showcasing traditional craftsmanship.',
      price: '₹2,800',
      image: 'https://images.unsplash.com/photo-1744893679733-1cf3c7837982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbmRpYW4lMjB3b29kd29yayUyMGNhcnZpbmclMjBoYW5kaWNyYWZ0cyUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc1NzU4Mzg2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'woodwork',
      artisan: 'Suresh Chand'
    },
    {
      id: '4',
      name: 'Silver Jhumka Earrings',
      description: 'Traditional silver jhumka earrings with intricate filigree work.',
      price: '₹4,200',
      image: 'https://images.unsplash.com/photo-1653227907864-560dce4c252d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBqZXdlbHJ5JTIwaGFuZGljcmFmdHN8ZW58MXx8fHwxNzU3NTc0OTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'jewelry',
      artisan: 'Meera Shah'
    },
    {
      id: '5',
      name: 'Brass Decorative Plate',
      description: 'Ornate brass plate with traditional engravings, perfect for decoration.',
      price: '₹1,800',
      image: 'https://images.unsplash.com/photo-1716876995651-1ff85b65a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBoYW5kaWNyYWZ0cyUyMHBvdHRlcnl8ZW58MXx8fHwxNzU3NTAwNDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'metalwork',
      artisan: 'Vijay Sharma'
    },
    {
      id: '6',
      name: 'Block Print Table Runner',
      description: 'Cotton table runner with traditional block print designs in vibrant colors.',
      price: '₹950',
      image: 'https://images.unsplash.com/photo-1632726733402-4a059a476028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbmRpYW4lMjB0ZXh0aWxlcyUyMHNpbGslMjB3ZWF2aW5nJTIwaGFuZGljcmFmdHN8ZW58MXx8fHwxNzU3NTgzODU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'textiles',
      artisan: 'Lakshmi Bai'
    },
    {
      id: '7',
      name: 'Bamboo Basket Set',
      description: 'Eco-friendly bamboo baskets handwoven with traditional techniques from Northeast India.',
      price: '₹1,650',
      image: 'https://images.unsplash.com/photo-1699800751646-6e0584f004f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbmRpYW4lMjBoYW5kaWNyYWZ0JTIwYmFtYm9vJTIwYmFza2V0JTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU3NTgzODgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'bamboo',
      artisan: 'Maya Sharma'
    },
    {
      id: '8',
      name: 'Madhubani Art Painting',
      description: 'Authentic Madhubani folk art painting depicting traditional themes and vibrant colors.',
      price: '₹5,200',
      image: 'https://images.unsplash.com/photo-1575550828602-aff2b22342a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbmRpYW4lMjBwYWludGVkJTIwbWFkaHViYW5pJTIwZm9sayUyMGFydHxlbnwxfHx8fDE3NTc1ODM4ODR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'art',
      artisan: 'Sunita Devi'
    },
    {
      id: '9',
      name: 'Kashmiri Pashmina Shawl',
      description: 'Luxurious hand-embroidered Pashmina shawl with traditional Kashmiri patterns.',
      price: '₹8,500',
      image: 'https://images.unsplash.com/photo-1632726733402-4a059a476028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbmRpYW4lMjB0ZXh0aWxlcyUyMHNpbGslMjB3ZWF2aW5nJTIwaGFuZGljcmFmdHN8ZW58MXx8fHwxNzU3NTgzODU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'textiles',
      artisan: 'Abdul Rahman'
    },
    {
      id: '10',
      name: 'Blue Pottery Vase',
      description: 'Jaipur blue pottery vase with floral motifs, showcasing Rajasthani ceramic artistry.',
      price: '₹2,100',
      image: 'https://images.unsplash.com/photo-1603712720632-7d5abdd039df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbmRpYW4lMjBwb3R0ZXJ5JTIwY2xheSUyMGNlcmFtaWNzJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU3NTgzODU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'pottery',
      artisan: 'Kailash Jangid'
    }
  ]);

  const handleGetStarted = () => {
    setShowLoginDialog(true);
  };

  const handleLogin = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail('');
    setCurrentPage('home');
  };

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const product = {
      ...newProduct,
      id: Date.now().toString()
    };
    setProducts(prev => [product, ...prev]);
    setCurrentPage('products');
  };

  if (!isLoggedIn) {
    return (
      <>
        <LandingPage onGetStarted={handleGetStarted} />
        <LoginDialog
          open={showLoginDialog}
          onOpenChange={setShowLoginDialog}
          onLogin={handleLogin}
        />
        <Toaster />
      </>
    );
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage products={products} onNavigate={setCurrentPage} />;
      case 'products':
        return <ProductsPage products={products} />;
      case 'add-product':
        return <AddProductPage onAddProduct={handleAddProduct} />;
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage products={products} onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
      />
      {renderCurrentPage()}
      <Toaster />
    </div>
  );
}