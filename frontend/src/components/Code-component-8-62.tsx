import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ShoppingCart, Star, TrendingUp, Award, Heart, ArrowRight } from 'lucide-react';

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

export function HomePage({ products, onNavigate }: HomePageProps) {
  const [cartItems, setCartItems] = useState<any[]>([]);

  const featuredProducts = products.slice(0, 6);
  const categories = [
    { name: 'Pottery', icon: '🏺', count: products.filter(p => p.category === 'pottery').length, color: 'from-amber-400 to-orange-500' },
    { name: 'Textiles', icon: '🧵', count: products.filter(p => p.category === 'textiles').length, color: 'from-blue-400 to-purple-500' },
    { name: 'Jewelry', icon: '💍', count: products.filter(p => p.category === 'jewelry').length, color: 'from-purple-400 to-pink-500' },
    { name: 'Woodwork', icon: '🪵', count: products.filter(p => p.category === 'woodwork').length, color: 'from-green-400 to-emerald-500' },
  ];

  const stats = [
    { label: 'Total Products', value: products.length, icon: ShoppingCart, color: 'from-blue-500 to-blue-600' },
    { label: 'Categories', value: 6, icon: Award, color: 'from-green-500 to-green-600' },
    { label: 'Happy Customers', value: '2.5k+', icon: Heart, color: 'from-red-500 to-red-600' },
    { label: 'Success Rate', value: '98%', icon: TrendingUp, color: 'from-purple-500 to-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Card 
                key={category.name} 
                className="group bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-3 cursor-pointer"
                onClick={() => onNavigate('products')}
              >
                <CardContent className="p-8 text-center">
                  <div className={`w-20 h-20 bg-gradient-to-br ${category.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <span className="text-3xl">{category.icon}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-2 text-gray-900">{category.name}</h3>
                  <p className="text-amber-600 font-semibold">{category.count} items</p>
                </CardContent>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                <CardContent className="p-6">
                  <h4 className="font-bold text-lg mb-2 text-gray-900">{product.name}</h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <p className="text-xs text-gray-500 mb-4">By {product.artisan}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-amber-600">{product.price}</span>
                    <Button 
                      size="sm"
                      className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
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