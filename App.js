import React, { useState } from 'react';
import { Plus, Minus, ShoppingCart, Phone, MapPin } from 'lucide-react';
import './App.css';

const ExpressValetApp = () => {
  const [currentView, setCurrentView] = useState('home');
  const [cart, setCart] = useState({});
  const [clientInfo, setClientInfo] = useState({
    name: '',
    phone: '',
    address: '',
    email: '',
    points: 0
  });
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    email: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfileSubmit = () => {
    if (!formData.name || !formData.phone || !formData.address || !formData.email) {
      alert('Please fill in all required fields.');
      return;
    }
    
    setClientInfo({
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      email: formData.email,
      points: clientInfo.points || 0
    });
    
    alert('Profile updated successfully! You can now start new orders.');
  };

  const HangerLogo = () => (
    <div className="relative flex items-center justify-center">
      <div className="absolute -top-2 w-2 h-4 bg-gray-500 rounded-t-full"></div>
      <div className="w-12 h-6 border-2 border-blue-600 rounded-b-full flex items-center justify-center bg-white">
        <span className="text-xs font-bold text-blue-600">EVS</span>
      </div>
    </div>
  );

  const NavigationTabs = () => (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex space-x-8">
          <button
            onClick={() => setCurrentView('home')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              currentView === 'home' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => setCurrentView('services')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              currentView === 'services' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
            }`}
          >
            Services
          </button>
          <button
            onClick={() => setCurrentView('profile')}
            className={`py-4 px-2 border-b-2 font-medium text-sm ${
              currentView === 'profile' ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500'
            }`}
          >
            Client Profile
          </button>
        </div>
      </div>
    </div>
  );

  const services = [
    { id: 1, name: "Men's Slacks", price: 9.00, category: "mens" },
    { id: 2, name: "Men's Jacket", price: 9.00, category: "mens" },
    { id: 3, name: "Men's Suits", price: 18.00, category: "mens" },
    { id: 4, name: "Women's Slacks", price: 9.00, category: "womens" },
    { id: 5, name: "Women's Dresses", price: 17.00, category: "womens" },
    { id: 6, name: "Women's Blouse", price: 9.00, category: "womens" }
  ];

  const updateCart = (serviceId, quantity) => {
    setCart(prev => ({
      ...prev,
      [serviceId]: quantity
    }));
  };

  const calculateTotal = () => {
    return Object.entries(cart).reduce((total, [serviceId, quantity]) => {
      const service = services.find(s => s.id === parseInt(serviceId));
      return total + (service ? service.price * quantity : 0);
    }, 0);
  };

  const getCartItems = () => {
    return Object.entries(cart)
      .filter(([_, quantity]) => quantity > 0)
      .map(([serviceId, quantity]) => {
        const service = services.find(s => s.id === parseInt(serviceId));
        return { service, quantity };
      });
  };

  const renderHome = () => (
    <div className="min-h-screen bg-gray-100">
      <NavigationTabs />
      <header className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <HangerLogo />
            <div>
              <h1 className="text-4xl font-bold text-black">ExpressValetServices</h1>
              <div className="flex items-center mt-2">
                <Phone className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-xl text-blue-600 font-semibold">732 306 2251</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-r from-blue-600 to-gray-700 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold mb-6">
            Customized Dry Cleaning and Laundry and Alterations
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Premium valet services delivered to your doorstep
          </p>
          <button 
            onClick={() => {
              if (clientInfo.name && clientInfo.phone) {
                setCurrentView('services');
              } else {
                alert('Please create a client profile first!');
              }
            }}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100"
          >
            Start New Order
          </button>
          <p className="text-white text-sm mt-4 opacity-75">
            Create a Profile before Ordering
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-3xl font-bold text-blue-600 mb-2">50+</h3>
              <p className="text-gray-600">Orders Processed</p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-green-600 mb-2">Tue/Wed/Thu</h3>
              <p className="text-gray-600 text-sm">Pick Up & Delivery Schedule</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-600 mb-2">5 Points</h3>
              <p className="text-gray-600 text-sm">Earn for Every $100 Spent</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const renderServices = () => (
    <div className="min-h-screen bg-gray-100">
      <NavigationTabs />
      <div className="flex">
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-3xl font-bold text-black">ExpressValetServices</h1>
            <p className="text-gray-600">Professional Cleaning Services</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(service => (
              <div key={service.id} className="bg-white rounded-lg shadow-md p-6 border">
                <h3 className="text-xl font-bold text-black mb-2">{service.name}</h3>
                <p className="text-blue-600 font-bold text-lg mb-4">${service.price.toFixed(2)}</p>
                
                <div className="flex items-center justify-between">
                  <span className="font-medium">Amount:</span>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => updateCart(service.id, Math.max(0, (cart[service.id] || 0) - 1))}
                      className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-bold">{cart[service.id] || 0}</span>
                    <button 
                      onClick={() => updateCart(service.id, (cart[service.id] || 0) + 1)}
                      className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="w-80 bg-white shadow-xl p-4">
          <div className="flex items-center mb-4">
            <ShoppingCart className="w-5 h-5 text-blue-600 mr-2" />
            <h2 className="text-lg font-bold">Your Order</h2>
          </div>

          {getCartItems().length === 0 ? (
            <p className="text-gray-500 text-center py-8">No items in cart</p>
          ) : (
            <div className="space-y-3 mb-4">
              {getCartItems().map(({ service, quantity }) => (
                <div key={service.id} className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between">
                    <span className="font-bold">{service.name}</span>
                    <span className="font-bold text-green-600">
                      ${(service.price * quantity).toFixed(2)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">Quantity: {quantity}</p>
                </div>
              ))}
            </div>
          )}

          {getCartItems().length > 0 && (
            <div className="border-t pt-3">
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-bold">Total:</span>
                <span className="text-xl font-bold text-green-600">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-bold">
                Generate Service Ticket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="min-h-screen bg-gray-100">
      <NavigationTabs />
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-2xl font-bold">Client Profile</h1>
            {clientInfo.name && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800">
                  <strong>Current Profile:</strong> {clientInfo.name} - {clientInfo.phone}
                </p>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Address *</label>
                  <textarea
                    rows="3"
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter complete address"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Cell Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>

                <div>
                  <label className="block font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Customer Points</h3>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {clientInfo.points || 0}
                    </div>
                    <p className="text-gray-600 text-sm">Points Earned</p>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Earn 5 points for every $100 spent!</strong>
                    </p>
                  </div>
                </div>

                <div className="bg-white border border-gray-300 p-6 rounded-lg">
                  <h3 className="text-xl font-bold mb-4">Pick Up & Delivery</h3>
                  {clientInfo.address ? (
                    <div>
                      <div className="bg-gray-100 p-4 rounded-lg mb-4">
                        <p className="text-sm text-gray-700 mb-2">
                          <strong>Current Delivery Address:</strong>
                        </p>
                        <p className="text-gray-900">{clientInfo.address}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const address = encodeURIComponent(clientInfo.address);
                          window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
                        }}
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 font-semibold flex items-center justify-center"
                      >
                        <MapPin className="w-5 h-5 mr-2" />
                        View on Google Maps
                      </button>
                    </div>
                  ) : (
                    <div className="text-center py-6">
                      <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                      <p className="text-gray-500">Save your profile to view delivery location</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={handleProfileSubmit}
                className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 font-bold text-lg"
              >
                Update Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {currentView === 'home' && renderHome()}
      {currentView === 'services' && renderServices()}
      {currentView === 'profile' && renderProfile()}
    </div>
  );
};

export default ExpressValetApp;