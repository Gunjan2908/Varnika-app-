import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShoppingCart, Star, TrendingUp, Award, Heart, ArrowRight, X } from 'lucide-react';
import varnikaLogo from '../imports/varnika-logo.svg';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  artisan: string;
}

interface HomePageProps {
  products: Product[];
  onNavigate: (page: string) => void;
}

interface CartItem {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
}

export function HomePage({ products, onNavigate }: HomePageProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);

  const featuredProducts = products.slice(0, 8);
  const categories = [
    { 
      name: 'Pottery', 
      image: 'https://images.unsplash.com/photo-1603712720632-7d5abdd039df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBwb3R0ZXJ5JTIwY2xheSUyMGNlcmFtaWNzJTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU3NTgzODU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 
      count: products.filter(p => p.category === 'pottery').length, 
      color: 'from-amber-400 to-orange-500' 
    },
    { 
      name: 'Textiles', 
      image: 'https://images.unsplash.com/photo-1632726733402-4a059a476028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbmRpYW4lMjB0ZXh0aWxlcyUyMHNpbGslMjB3ZWF2aW5nJTIwaGFuZGljcmFmdHN8ZW58MXx8fHwxNzU3NTgzODU3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 
      count: products.filter(p => p.category === 'textiles').length, 
      color: 'from-blue-400 to-purple-500' 
    },
    { 
      name: 'Jewelry', 
      image: 'https://images.unsplash.com/photo-1725446572865-61e02db0d159?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbmRpYW4lMjBqZXdlbHJ5JTIwdHJhZGl0aW9uYWwlMjBvcm5hbWVudHMlMjBnb2xkJTIwc2lsdmVyfGVufDF8fHx8MTc1NzU4Mzg2Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 
      count: products.filter(p => p.category === 'jewelry').length, 
      color: 'from-purple-400 to-pink-500' 
    },
    { 
      name: 'Woodwork', 
      image: 'https://images.unsplash.com/photo-1744893679733-1cf3c7837982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbmRpYW4lMjB3b29kd29yayUyMGNhcnZpbmclMjBoYW5kaWNyYWZ0cyUyMHRyYWRpdGlvbmFsfGVufDF8fHx8MTc1NzU4Mzg2Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 
      count: products.filter(p => p.category === 'woodwork').length, 
      color: 'from-green-400 to-emerald-500' 
    },
    { 
      name: 'Metalwork', 
      image: 'https://images.unsplash.com/photo-1699799085041-e288623615ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbmRpYW4lMjBicmFzcyUyMG1ldGFsd29yayUyMHRyYWRpdGlvbmFsJTIwaGFuZGljcmFmdHN8ZW58MXx8fHwxNzU3NTgzODY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 
      count: products.filter(p => p.category === 'metalwork').length, 
      color: 'from-yellow-400 to-amber-500' 
    },
    { 
      name: 'Bamboo Crafts', 
      image: 'https://images.unsplash.com/photo-1699800751646-6e0584f004f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbmRpYW4lMjBoYW5kaWNyYWZ0JTIwYmFtYm9vJTIwYmFza2V0JTIwdHJhZGl0aW9uYWx8ZW58MXx8fHwxNzU3NTgzODgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral', 
      count: products.filter(p => p.category === 'bamboo').length, 
      color: 'from-green-500 to-teal-500' 
    },
  ];

  const artisanStories = [
    {
      id: '1',
      name: 'Meera Devi',
      craft: 'Traditional Pottery',
      location: 'Rajasthan',
      story: 'For over 30 years, Meera has been creating beautiful terracotta pots using techniques passed down through five generations. Her work supports her family and preserves ancient pottery traditions.',
      image: 'https://images.unsplash.com/photo-1716876995651-1ff85b65a6d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbmRpYW4lMjBhcnRpc2FuJTIwd29tYW4lMjBjcmFmdCUyMG1ha2luZyUyMHBvdHRlcnl8ZW58MXx8fHwxNzU3NTgzODczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      impact: 'Supports 12 family members and trains 8 young artisans'
    },
    {
      id: '2',
      name: 'Ravi Kumar',
      craft: 'Handloom Weaving',
      location: 'West Bengal',
      story: 'Ravi comes from a family of master weavers. Despite modern challenges, he continues to create exquisite silk textiles, keeping alive the 200-year-old family tradition of handloom weaving.',
      image: 'https://images.unsplash.com/photo-1599303000936-1cf21eac4456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhpbmRpYW4lMjB0ZXh0aWxlJTIwd2VhdmVyJTIwYXJ0aXNhbiUyMHdvcmtpbmclMjBsb29tfGVufDF8fHx8MTc1NzU4Mzg3N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      impact: 'Provides livelihood to 25 weavers in his village'
    }
  ];

  const addToCart = (product: Product) => {
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

  const stats = [
    { label: 'Total Products', value: products.length, icon: ShoppingCart, color: 'from-blue-500 to-blue-600' },
    { label: 'Categories', value: 6, icon: Award, color: 'from-green-500 to-green-600' },
    { label: 'Happy Customers', value: '2.5k+', icon: Heart, color: 'from-red-500 to-red-600' },
    { label: 'Success Rate', value: '98%', icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Cart Button */}
      <div className="fixed top-24 right-6 z-40">
        <Button 
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-full p-4"
          onClick={() => setShowCart(!showCart)}
        >
          <ShoppingCart className="w-6 h-6" />
          {cartItems.length > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] h-5 flex items-center justify-center">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </Badge>
          )}
        </Button>
      </div>

      {/* Cart Dropdown */}
      {showCart && (
        <div className="fixed top-32 right-6 w-96 bg-white rounded-xl shadow-2xl border border-amber-100 z-50 max-h-96 overflow-y-auto">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <h3 className="font-semibold text-lg">Shopping Cart</h3>
            <Button variant="ghost" size="sm" onClick={() => setShowCart(false)}>
              <X className="w-4 h-4" />
            </Button>
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
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold">Total: ₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={() => onNavigate('products')}>
                    Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Welcome to 
            <span className="bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 bg-clip-text text-transparent block">
              Varnika Dashboard
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover, manage, and showcase authentic Indian handicrafts from talented artisans across the country.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Categories Section */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Browse by Category</h2>
            <Button 
              variant="outline" 
              onClick={() => onNavigate('products')}
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.name} 
                className="group bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 cursor-pointer overflow-hidden"
                onClick={() => onNavigate('products')}
              >
                <div className="relative overflow-hidden">
                  <ImageWithFallback 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 group-hover:opacity-50 transition-opacity duration-300`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                      <p className="text-sm font-medium">{category.count} items</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Button 
              variant="outline" 
              onClick={() => onNavigate('products')}
              className="border-amber-300 text-amber-700 hover:bg-amber-50"
            >
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    <span className="text-xs font-semibold">4.8</span>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-bold text-base mb-2 text-gray-900">{product.name}</h4>
                  <p className="text-gray-600 text-xs mb-2 line-clamp-2">{product.description}</p>
                  <p className="text-xs text-gray-500 mb-3">By {product.artisan}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-amber-600">{product.price}</span>
                    <Button 
                      size="sm"
                      onClick={() => addToCart(product)}
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-xs px-3 py-1"
                    >
                      <ShoppingCart className="w-3 h-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Artisan Stories */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Artisan Stories</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the talented craftspeople behind our beautiful handicrafts and learn their inspiring journeys
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12">
            {artisanStories.map((story) => (
              <Card key={story.id} className="bg-white/80 backdrop-blur-sm shadow-2xl border-0 hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2">
                    <ImageWithFallback 
                      src={story.image}
                      alt={story.name}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-1/2 p-8">
                    <div className="flex items-center mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">{story.name}</h3>
                        <p className="text-amber-600 font-semibold">{story.craft}</p>
                        <p className="text-sm text-gray-500">{story.location}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-6 leading-relaxed">{story.story}</p>
                    <div className="bg-amber-50 rounded-lg p-4">
                      <p className="text-sm font-semibold text-amber-800 mb-1">Impact:</p>
                      <p className="text-sm text-amber-700">{story.impact}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/50 backdrop-blur-sm rounded-3xl p-12 shadow-xl">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Quick Actions</h2>
            <p className="text-lg text-gray-600">Manage your handicraft marketplace efficiently</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card 
              className="group bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => onNavigate('add-product')}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">➕</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Add New Product</h3>
                <p className="opacity-90">Upload and showcase new handicrafts</p>
              </CardContent>
            </Card>

            <Card 
              className="group bg-gradient-to-br from-blue-400 to-purple-500 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => onNavigate('products')}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2">View Products</h3>
                <p className="opacity-90">Browse and manage all products</p>
              </CardContent>
            </Card>

            <Card 
              className="group bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              onClick={() => onNavigate('about')}
            >
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl">ℹ️</span>
                </div>
                <h3 className="text-xl font-bold mb-2">About Varnika</h3>
                <p className="opacity-90">Learn about our mission and values</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}