import React, { useState } from 'react';
import { ShoppingCart, Plus, Search, Star, MapPin, Heart, MessageCircle, User, LogOut, Home, Upload, TrendingUp } from 'lucide-react';

const MarketplaceApp = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [products, setProducts] = useState([
    { id: 1, seller: 'Alice', title: 'Handmade Leather Wallet', price: 45, category: 'Fashion', image: '👜', rating: 4.8, sales: 128, location: 'NYC' },
    { id: 2, seller: 'Bob', title: 'Photography Course', price: 199, category: 'Education', image: '📸', rating: 5, sales: 45, location: 'LA' },
    { id: 3, seller: 'Carol', title: 'Vintage Desk Lamp', price: 85, category: 'Home', image: '💡', rating: 4.5, sales: 67, location: 'Chicago' },
    { id: 4, seller: 'David', title: 'Logo Design Service', price: 299, category: 'Services', image: '🎨', rating: 4.9, sales: 234, location: 'Remote' },
  ]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sellMode, setSellMode] = useState(false);
  const [newProduct, setNewProduct] = useState({ title: '', price: '', category: 'Fashion', description: '' });

  const categories = ['All', 'Fashion', 'Education', 'Home', 'Services', 'Electronics', 'Art'];

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert(`Added "${product.title}" to cart!`);
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);
  const commission = Math.round(totalPrice * 0.18 * 100) / 100;
  const sellerGets = totalPrice - commission;

  const addProduct = () => {
    if (!newProduct.title || !newProduct.price) return;
    const product = {
      id: products.length + 1,
      seller: currentUser,
      title: newProduct.title,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      image: '📦',
      rating: 5,
      sales: 0,
      location: 'Your City',
    };
    setProducts([product, ...products]);
    setNewProduct({ title: '', price: '', category: 'Fashion', description: '' });
    alert('Product listed! Start earning now!');
  };

  const filteredProducts = products.filter(p =>
    (selectedCategory === 'All' || p.category === selectedCategory) &&
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Landing Page
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');
          
          * { font-family: 'Poppins', sans-serif; }
          
          .hero-text {
            background: linear-gradient(135deg, #d97706 0%, #dc2626 50%, #b91c1c 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 800;
          }
          
          .card-shadow {
            box-shadow: 0 20px 40px rgba(217, 119, 6, 0.15);
            border-radius: 24px;
          }
          
          .btn-primary {
            background: linear-gradient(135deg, #d97706, #dc2626);
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          }
          
          .btn-primary:hover {
            transform: translateY(-4px);
            box-shadow: 0 16px 32px rgba(220, 38, 38, 0.4);
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-20px); }
          }
          
          .float-animation {
            animation: float 4s ease-in-out infinite;
          }
        `}</style>

        {/* Navbar */}
        <nav className="backdrop-blur-md border-b border-orange-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🛍️</div>
              <span className="text-3xl font-bold hero-text">MarketHub</span>
            </div>
          </div>
        </nav>

        {/* Hero */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="hero-text">Sell Anything.</span><br />
                <span className="text-gray-800">Earn Instantly.</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                The easiest marketplace to buy and sell. Products, services, courses, designs. Create your store in 2 minutes. Start earning today.
              </p>
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => {
                    setCurrentUser('Guest');
                    setUserType('buyer');
                  }}
                  className="btn-primary px-8 py-4 rounded-xl font-bold text-lg text-white"
                >
                  👤 Start Shopping
                </button>
                <button
                  onClick={() => {
                    setCurrentUser('Guest');
                    setUserType('seller');
                  }}
                  className="px-8 py-4 rounded-xl font-bold text-lg border-2 border-orange-600 text-orange-600 hover:bg-orange-50 transition"
                >
                  📦 Start Selling
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-6">No credit card required • Instant seller approval</p>
            </div>

            <div className="relative">
              <div className="text-9xl float-animation">🛍️</div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '💰', title: 'Instant Payouts', desc: 'Get paid within 24 hours' },
              { icon: '🌍', title: 'Global Reach', desc: '100+ countries, any product' },
              { icon: '🔒', title: 'Buyer Protection', desc: 'Safe transactions guaranteed' },
            ].map((feature, i) => (
              <div key={i} className="card-shadow p-8 bg-white hover:shadow-2xl transition">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="mt-20 bg-white card-shadow p-12">
            <h2 className="text-4xl font-bold mb-8 text-center hero-text">Simple Commission Model</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 border-2 border-orange-300 rounded-2xl">
                <h3 className="text-2xl font-bold mb-4">For Sellers</h3>
                <p className="text-lg text-gray-600 mb-4">You keep <span className="text-2xl font-bold text-green-600">82%</span> of each sale</p>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>✓ 18% commission per sale</p>
                  <p>✓ Instant seller verification</p>
                  <p>✓ Unlimited product listings</p>
                  <p>✓ Marketing support included</p>
                </div>
              </div>
              <div className="p-8 border-2 border-orange-600 rounded-2xl bg-orange-50">
                <h3 className="text-2xl font-bold mb-4">For Buyers</h3>
                <p className="text-lg text-gray-600 mb-4">Browse <span className="text-2xl font-bold text-orange-600">10,000+</span> products</p>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>✓ Thousands of sellers</p>
                  <p>✓ Buyer protection guarantee</p>
                  <p>✓ Easy checkout in 30 seconds</p>
                  <p>✓ Seller ratings & reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Buyer View
  if (userType === 'buyer') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');
          * { font-family: 'Poppins', sans-serif; }
          .card-shadow { box-shadow: 0 10px 30px rgba(217, 119, 6, 0.1); }
        `}</style>

        {/* Navbar */}
        <nav className="bg-white card-shadow sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🛍️</div>
              <span className="text-2xl font-bold text-orange-600">MarketHub</span>
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setShowCart(!showCart)} className="relative">
                <ShoppingCart size={28} className="text-orange-600" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
              <button onClick={() => setCurrentUser(null)} className="text-gray-600 hover:text-orange-600">
                <LogOut size={24} />
              </button>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Search & Filter */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-3 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-orange-300 focus:outline-none focus:border-orange-600"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-orange-600 text-white'
                      : 'bg-white text-gray-800 border border-orange-300 hover:bg-orange-50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Cart Modal */}
          {showCart && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl p-8 max-w-md w-full card-shadow">
                <h2 className="text-3xl font-bold mb-6 text-orange-600">Shopping Cart</h2>
                {cart.length === 0 ? (
                  <p className="text-gray-600 text-center py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-3 mb-6 max-h-80 overflow-y-auto">
                      {cart.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                          <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-gray-600">${item.price}</p>
                          </div>
                          <button onClick={() => removeFromCart(idx)} className="text-red-600 hover:bg-red-50 p-2 rounded">
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="border-t-2 border-orange-300 pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal:</span>
                        <span className="font-bold">${totalPrice}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                        <span>Savings (18% fee):</span>
                        <span>+${commission}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold border-t pt-2">
                        <span>Total:</span>
                        <span className="text-orange-600">${totalPrice}</span>
                      </div>
                    </div>

                    <button className="w-full bg-orange-600 text-white py-3 rounded-lg font-bold mt-6 hover:bg-orange-700 transition">
                      Proceed to Checkout
                    </button>
                  </>
                )}
                <button
                  onClick={() => setShowCart(false)}
                  className="w-full text-gray-600 py-2 mt-4 hover:text-orange-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-xl card-shadow overflow-hidden hover:shadow-2xl transition">
                <div className="aspect-square bg-gradient-to-br from-orange-200 to-rose-200 flex items-center justify-center text-6xl">
                  {product.image}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-sm mb-2 line-clamp-2">{product.title}</h3>
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-2xl font-bold text-orange-600">${product.price}</p>
                      <p className="text-xs text-gray-500">{product.sales} sold</p>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-1">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-xs font-bold">{product.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 mb-4 flex items-center gap-1">
                    <MapPin size={12} /> {product.location}
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-orange-600 text-white py-2 rounded-lg font-bold hover:bg-orange-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Seller View
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }
        .card-shadow { box-shadow: 0 10px 30px rgba(34, 197, 94, 0.1); }
      `}</style>

      {/* Navbar */}
      <nav className="bg-white card-shadow sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-3xl">📦</div>
            <span className="text-2xl font-bold text-green-600">MarketHub Seller</span>
          </div>
          <button onClick={() => setCurrentUser(null)} className="text-gray-600 hover:text-green-600">
            <LogOut size={24} />
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Product Form */}
          <div className="lg:col-span-1">
            <div className="bg-white card-shadow p-8 rounded-2xl sticky top-20">
              <h2 className="text-2xl font-bold mb-6 text-green-600 flex items-center gap-2">
                <Upload size={24} /> List Product
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                  placeholder="Product title"
                  className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-600"
                />
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Description"
                  className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-600 h-24 resize-none"
                />
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-600"
                >
                  {categories.slice(1).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder="Price ($)"
                  className="w-full px-4 py-2 border-2 border-green-300 rounded-lg focus:outline-none focus:border-green-600"
                />
                <button
                  onClick={addProduct}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition flex items-center justify-center gap-2"
                >
                  <Plus size={20} /> List Product
                </button>
              </div>

              {/* Your Earnings */}
              <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-300">
                <h3 className="font-bold text-green-800 mb-4 flex items-center gap-2">
                  <TrendingUp size={20} /> Your Earnings
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Total Sales:</span>
                    <span className="font-bold">$12,450</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Commission Rate:</span>
                    <span className="font-bold">18%</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-green-600 pt-2 border-t border-green-300">
                    <span>Your Earnings:</span>
                    <span>$10,209</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Your Products */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-8 text-green-600">Your Products ({products.length})</h2>
            <div className="space-y-4">
              {products.map(product => (
                <div key={product.id} className="bg-white card-shadow p-6 rounded-xl flex gap-6 hover:shadow-2xl transition">
                  <div className="text-5xl">{product.image}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <p className="text-xs text-gray-500">Price</p>
                        <p className="text-lg font-bold text-green-600">${product.price}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Sales</p>
                        <p className="text-lg font-bold">{product.sales}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Rating</p>
                        <p className="text-lg font-bold">⭐ {product.rating}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 mb-2">Revenue (82% of {product.sales * product.price})</p>
                    <p className="text-2xl font-bold text-green-600">${Math.round(product.sales * product.price * 0.82)}</p>
                    <button className="text-sm text-blue-600 hover:underline mt-4">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceApp;
