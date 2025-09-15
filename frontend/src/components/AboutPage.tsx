import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Palette, Handshake, Leaf } from 'lucide-react';

export function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">About Varnika</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Preserving India's rich heritage of handicrafts while empowering artisans 
          and connecting them with art lovers worldwide.
        </p>
      </div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p className="text-gray-600 mb-4">
            Varnika aims to bridge the gap between traditional Indian artisans and the modern world. 
            We believe that every handcrafted piece tells a story of heritage, skill, and passion 
            that deserves to be preserved and celebrated.
          </p>
          <p className="text-gray-600">
            Our platform provides artisans with the tools and reach they need to showcase their 
            work to a global audience, while ensuring fair compensation and recognition for their skills.
          </p>
        </div>
        <div className="rounded-lg overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1632726733402-4a059a476028?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0ZXh0aWxlcyUyMGhhbmRpY3JhZnRzfGVufDF8fHx8MTc1NzU3NDkwMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Artisan at work"
            className="w-full h-80 object-cover"
          />
        </div>
      </div>

      {/* Values */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Values</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Palette className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">Authenticity</h4>
              <p className="text-gray-600 leading-relaxed">
                We ensure every product is genuinely handcrafted using traditional techniques 
                passed down through generations.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Handshake className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">Fair Trade</h4>
              <p className="text-gray-600 leading-relaxed">
                We believe in fair compensation for artisans and transparent pricing 
                that reflects the true value of their work.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <h4 className="text-xl font-bold mb-4 text-gray-900">Sustainability</h4>
              <p className="text-gray-600 leading-relaxed">
                We promote eco-friendly practices and sustainable materials in all 
                our partnered craftworks.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Story Section */}
      <div className="bg-amber-50 rounded-lg p-8 mb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h3>
        <p className="text-gray-600 mb-4">
          Varnika was born from a deep appreciation for India's rich tradition of handicrafts. 
          Founded in 2024, we started with a simple vision: to create a platform where the 
          incredible skill and artistry of Indian craftspeople could reach art lovers around the world.
        </p>
        <p className="text-gray-600">
          The name "Varnika" comes from the Sanskrit word meaning "colorful" or "painter," 
          reflecting our commitment to celebrating the vibrant colors and diverse artistic 
          traditions that make Indian handicrafts so special.
        </p>
      </div>

      {/* Impact Numbers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div>
          <div className="text-3xl font-bold text-amber-600 mb-2">500+</div>
          <p className="text-gray-600">Artisans Supported</p>
        </div>
        <div>
          <div className="text-3xl font-bold text-amber-600 mb-2">2,000+</div>
          <p className="text-gray-600">Products Listed</p>
        </div>
        <div>
          <div className="text-3xl font-bold text-amber-600 mb-2">15+</div>
          <p className="text-gray-600">States Covered</p>
        </div>
        <div>
          <div className="text-3xl font-bold text-amber-600 mb-2">95%</div>
          <p className="text-gray-600">Customer Satisfaction</p>
        </div>
      </div>
    </div>
  );
}