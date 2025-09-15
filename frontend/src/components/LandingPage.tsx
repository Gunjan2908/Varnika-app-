import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Palette, Users, Shield, ShoppingCart, Star, Truck, Phone, Mail } from 'lucide-react';
import varnikaLogo from '../imports/varnika-logo.svg';

interface LandingPageProps {
  onGetStarted: () => void;
}

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const featuredProducts = [
    {
      id: '1',
      name: 'Traditional Clay Pot',
      price: '₹1,250',
      originalPrice: '₹1,500',
      image: 'https://images.unsplash.com/photo-1716876995651-1ff85b65a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbmRpYW4lMjBoYW5kaWNyYWZ0cyUyMHBvdHRlcnl8ZW58MXx8fHwxNzU3NTAwNDEwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Pottery',
      rating: 4.8
    },
    {
      id: '2',
      name: 'Silk Scarf',
      price: '₹3,500',
      originalPrice: '₹4,200',
      image: 'https://images.unsplash.com/photo-1632726733402-4a059a476028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbmRpYW4lMjB0ZXh0aWxlcyUyMGhhbmRpY3JhZnRzfGVufDF8fHx8MTc1NzU3NDkwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Textiles',
      rating: 4.9
    },
    {
      id: '3',
      name: 'Wooden Elephant',
      price: '₹2,800',
      originalPrice: '₹3,200',
      image: 'https://images.unsplash.com/photo-1738508117775-883afd3d99da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBoYW5kaWNyYWZ0cyUyMGNhcnZpbmd8ZW58MXx8fHwxNzU3NTc0OTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Woodwork',
      rating: 4.7
    },
    {
      id: '4',
      name: 'Silver Jhumkas',
      price: '₹4,200',
      originalPrice: '₹5,000',
      image: 'https://images.unsplash.com/photo-1653227907864-560dce4c252d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbmRpYW4lMjBqZXdlbHJ5JTIwaGFuZGljcmFmdHN8ZW58MXx8fHwxNzU3NTc0OTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      category: 'Jewelry',
      rating: 5.0
    }
  ];

  const addToCart = (product: typeof featuredProducts[0]) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const cartTotal = cartItems.reduce((total, item) => {
    const price = parseInt(item.price.replace('₹', '').replace(',', ''));
    return total + (price * item.quantity);
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg border-b border-amber-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <img src={varnikaLogo} alt="Varnika" className="w-12 h-12 object-contain" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Varnika
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="relative border-amber-300 text-amber-700 hover:bg-amber-50"
                onClick={() => setShowCart(!showCart)}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                    {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={onGetStarted}
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Dropdown */}
      {showCart && (
        <div className="fixed top-20 right-4 w-96 bg-white rounded-xl shadow-2xl border border-amber-100 z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-100">
            <h3 className="font-semibold text-lg">Shopping Cart</h3>
          </div>
          <div className="p-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-500 text-center py-4">Your cart is empty</p>
            ) : (
              <>
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{item.name}</h4>
                        <p className="text-amber-600 font-semibold">{item.price} x {item.quantity}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:bg-red-50"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold">Total: ₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={onGetStarted}>
                    Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-amber-100 text-amber-800 px-4 py-2 text-sm font-medium">
            ✨ Authentic • Handcrafted • Heritage
          </Badge>
          <h2 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Discover Authentic
            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent block">
              Indian Handicrafts
            </span>
          </h2>
          <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto leading-relaxed">
            Varnika connects you with skilled artisans and their beautiful handcrafted treasures. 
            Experience the rich heritage of Indian craftsmanship, where every piece tells a story 
            of tradition, passion, and timeless artistry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={onGetStarted} 
              size="lg" 
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-10 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              Explore Collection
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-amber-300 text-amber-700 hover:bg-amber-50 px-10 py-4 text-lg font-semibold"
            >
              Watch Story
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">500+</div>
              <div className="text-sm text-gray-600">Skilled Artisans</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">2000+</div>
              <div className="text-sm text-gray-600">Unique Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600">15+</div>
              <div className="text-sm text-gray-600">Indian States</div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="text-center p-8 bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-0">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Palette className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Authentic Crafts</h3>
              <p className="text-gray-600 leading-relaxed">
                Discover genuine handcrafted items made by skilled artisans using traditional techniques 
                passed down through generations.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-8 bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-0">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Support Artisans</h3>
              <p className="text-gray-600 leading-relaxed">
                Directly support local craftspeople and help preserve traditional art forms 
                while empowering rural communities.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-8 bg-white/70 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-0">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900">Quality Assured</h3>
              <p className="text-gray-600 leading-relaxed">
                Every piece is carefully curated for quality and authenticity, 
                ensuring you receive genuine masterpieces.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Featured Products */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Featured Handicrafts</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Handpicked treasures from master artisans across India
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="group bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 overflow-hidden">
                <div className="relative overflow-hidden">
                  <ImageWithFallback 
                    src={product.image}
                    alt={product.name}
                    className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <Badge className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 text-xs">
                    {product.category}
                  </Badge>
                  <div className="absolute top-3 right-3 flex items-center bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                    <span className="text-xs font-semibold">{product.rating}</span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-2 text-gray-900">{product.name}</h4>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl font-bold text-amber-600">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  </div>
                  <Button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-12 mb-20 shadow-xl">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Varnika?</h3>
            <p className="text-lg text-gray-600">Experience the difference with our commitment to excellence</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">Free Shipping</h4>
              <p className="text-gray-600">Free delivery on orders above ₹2,000</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">Authenticity Guarantee</h4>
              <p className="text-gray-600">100% genuine handcrafted products</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-lg mb-2">24/7 Support</h4>
              <p className="text-gray-600">Always here to help you</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button 
            onClick={onGetStarted} 
            size="lg" 
            className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white px-10 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            Explore All Products
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={varnikaLogo} alt="Varnika" className="w-10 h-10 object-contain" />
                <h3 className="text-2xl font-bold text-amber-400">Varnika</h3>
              </div>
              <p className="text-gray-400 mb-4">Preserving Indian Heritage Through Handicrafts</p>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="w-8 h-8 bg-amber-600 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Products</li>
                <li>Artisans</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Pottery</li>
                <li>Textiles</li>
                <li>Jewelry</li>
                <li>Woodwork</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Shipping Info</li>
                <li>Returns</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Varnika. All rights reserved. Made with ❤️ for Indian artisans.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}