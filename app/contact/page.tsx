'use client'

import React, { useEffect, useState } from 'react';
import Link from "next/link";

export default function ContactPage() {
  const [animatedValues, setAnimatedValues] = useState({
    eurusd: 1.0847,
    gbpusd: 1.2634,
    usdjpy: 149.23,
    btcusd: 43250
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  // Simulate live forex data
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedValues(prev => ({
        eurusd: prev.eurusd + (Math.random() - 0.5) * 0.001,
        gbpusd: prev.gbpusd + (Math.random() - 0.5) * 0.001,
        usdjpy: prev.usdjpy + (Math.random() - 0.5) * 0.1,
        btcusd: prev.btcusd + (Math.random() - 0.5) * 100
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // You can add actual form submission logic here
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      course: '',
      message: ''
    });
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950/90 to-indigo-950/80 text-white py-20 md:py-28 overflow-hidden">
        {/* Background Trading Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Candlestick Charts */}
          <div className="absolute top-20 left-10 opacity-20">
            <svg width="180" height="120" className="animate-pulse">
              <rect x="10" y="50" width="6" height="25" fill="#10b981" className="animate-candle-grow" />
              <line x1="13" y1="40" x2="13" y2="80" stroke="#10b981" strokeWidth="1" />
              
              <rect x="25" y="55" width="6" height="20" fill="#ef4444" className="animate-candle-grow delay-200" />
              <line x1="28" y1="45" x2="28" y2="80" stroke="#ef4444" strokeWidth="1" />
              
              <rect x="40" y="45" width="6" height="30" fill="#10b981" className="animate-candle-grow delay-400" />
              <line x1="43" y1="35" x2="43" y2="80" stroke="#10b981" strokeWidth="1" />
            </svg>
          </div>

          <div className="absolute bottom-20 right-20 opacity-15">
            <svg width="160" height="100" className="animate-pulse delay-1000">
              <rect x="15" y="35" width="8" height="25" fill="#22d3ee" className="animate-candle-grow" />
              <line x1="19" y1="25" x2="19" y2="70" stroke="#22d3ee" strokeWidth="1" />
              
              <rect x="35" y="40" width="8" height="20" fill="#ef4444" className="animate-candle-grow delay-300" />
              <line x1="39" y1="30" x2="39" y2="70" stroke="#ef4444" strokeWidth="1" />
              
              <rect x="55" y="30" width="8" height="30" fill="#22d3ee" className="animate-candle-grow delay-600" />
              <line x1="59" y1="20" x2="59" y2="70" stroke="#22d3ee" strokeWidth="1" />
            </svg>
          </div>

          {/* Floating Currency Display */}
          <div className="absolute top-32 right-10 bg-slate-900/30 backdrop-blur-sm rounded-lg p-3 border border-cyan-500/20 animate-float">
            <div className="text-cyan-400 text-xs font-mono">
              <div className="flex justify-between items-center mb-1">
                <span>EUR/USD</span>
                <span className="text-green-400">{animatedValues.eurusd.toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>BTC/USD</span>
                <span className="text-green-400">${animatedValues.btcusd.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-60 -left-40 w-60 h-60 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto text-center px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-4 py-2 mb-8 animate-fadeInUp">
              <span className="text-sm font-medium text-cyan-300">📞 Get In Touch</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Contact{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
                Th3 Trad3rs
              </span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              Have questions about our courses? Need guidance on your trading journey? 
              We re here to help you succeed in forex trading.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800/60 to-slate-900/60 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-40 left-20">
            <svg width="120" height="80">
              <rect x="10" y="30" width="3" height="15" fill="#10b981" />
              <rect x="18" y="25" width="3" height="20" fill="#ef4444" />
              <rect x="26" y="35" width="3" height="10" fill="#10b981" />
              <rect x="34" y="20" width="3" height="25" fill="#22d3ee" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-slate-700/50">
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-slate-300 mb-2 font-medium">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-slate-300 mb-2 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-slate-300 mb-2 font-medium">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                      placeholder="+92 XXX XXXXXXX"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="course" className="block text-slate-300 mb-2 font-medium">
                      Interested Course
                    </label>
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300"
                    >
                      <option value="">Select a course</option>
                      <option value="basic">Basic Course - PKR 20,000</option>
                      <option value="advance">Advance Course - PKR 30,000</option>
                      <option value="pro">Pro Course - PKR 40,000</option>
                      <option value="consultation">Just need consultation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-slate-300 mb-2 font-medium">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all duration-300 resize-vertical"
                    placeholder="Tell us about your trading goals, questions, or anything else we can help you with..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                  <span>Send Message</span>
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              
              {/* Contact Details */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-slate-700/50">
                <h3 className="text-2xl font-bold mb-6 text-white">Get In Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-slate-300 text-sm">Phone</div>
                      <div className="text-white font-semibold">+92 343 1304090</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-slate-300 text-sm">Email</div>
                      <div className="text-white font-semibold">th3trad3rsofficial@gmail.com</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-slate-300 text-sm">Location</div>
                      <div className="text-white font-semibold">Layyah</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-slate-300 text-sm">Support Hours</div>
                      <div className="text-white font-semibold">24/7 Available</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-slate-700/50">
                <h3 className="text-2xl font-bold mb-6 text-white">Follow Us</h3>
                
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-110"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-gradient-to-r from-blue-700 to-blue-800 rounded-full flex items-center justify-center hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-110"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.719-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.083.346-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.748-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="#" 
                    className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center hover:from-green-400 hover:to-green-500 transition-all duration-300 transform hover:scale-110"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div>

                <p className="text-slate-300 text-sm mt-4">
                  Follow us for daily trading tips, market updates, and success stories from our community.
                </p>
              </div>

              {/* FAQ Quick Links */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-slate-700/50">
                <h3 className="text-2xl font-bold mb-6 text-white">Quick Help</h3>
                
                <div className="space-y-3">
                  <Link href="/faq" className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-300 group">
                    <span className="text-slate-300 group-hover:text-white">Frequently Asked Questions</span>
                    <svg className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  
                  <Link href="/courses" className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-300 group">
                    <span className="text-slate-300 group-hover:text-white">View All Courses</span>
                    <svg className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  
                  <Link href="/enroll" className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-300 group">
                    <span className="text-slate-300 group-hover:text-white">Enroll Now</span>
                    <svg className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950/90 to-indigo-950/80 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-20 right-20">
            <svg width="100" height="60">
              {[...Array(5)].map((_, i) => {
                const isGreen = i % 2 === 0;
                return (
                  <rect 
                    key={i}
                    x={i * 18} 
                    y={30 - Math.random() * 15} 
                    width="6" 
                    height={10 + Math.random() * 8} 
                    fill={isGreen ? "#10b981" : "#ef4444"}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Quick answers to common questions about our courses and trading programs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              {
                question: "How long does it take to complete a course?",
                answer: "Our courses range from 3-8 months depending on the level. Basic course takes 3 months, Advance takes 5 months, and Pro course takes 8 months with comprehensive training."
              },
              {
                question: "Do I need prior trading experience?",
                answer: "No prior experience required for the Basic course. We start from fundamentals and gradually build your knowledge. For Advance and Pro courses, some basic knowledge is helpful."
              },
              {
                question: "What support is provided during the course?",
                answer: "We provide 24/7 support, live trading sessions, one-on-one mentorship (Pro course), community access, and lifetime course material updates."
              },
              {
                question: "Is there a money-back guarantee?",
                answer: "Yes, we offer a 3-day money-back guarantee. If you're not satisfied with the course quality within the first 3 days, we'll provide a full refund."
              },
              {
                question: "Can I access course materials after completion?",
                answer: "Absolutely! You get lifetime access to all course materials, updates, and our trading community. You can revisit any content anytime."
              },
              {
                question: "What is the success rate of your students?",
                answer: "Our students have a 95% success rate in achieving profitable trading within 3 months of course completion. We track and support our students' progress closely."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white mb-3 flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">Q:</span>
                  {faq.question}
                </h3>
                <p className="text-slate-300 leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-400 mb-4">Still have questions?</p>
            <Link 
              href="#contact-form" 
              className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
            >
              <span>Send us a message</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Response Time Banner */}
      <section className="py-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-y border-cyan-400/20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-slate-300">Average Response Time: 2 Hours</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-slate-300">Professional Support Team</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-slate-300">24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes candle-grow {
          0% { 
            transform: scaleY(0);
            opacity: 0;
          }
          50% {
            opacity: 0.7;
          }
          100% { 
            transform: scaleY(1);
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-candle-grow {
          transform-origin: bottom;
          animation: candle-grow 2s ease-out forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        #contact-form {
          scroll-margin-top: 2rem;
        }
      `}</style>
    </div>
  );
}