'use client'

import React, { useEffect, useState } from 'react';

export default function ContactPage() {
  const [candleData, setCandleData] = useState(
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      height: 20 + Math.random() * 35,
      isGreen: Math.random() > 0.5,
      wickTop: 5 + Math.random() * 10,
      wickBottom: 5 + Math.random() * 10
    }))
  );

  const [volumeData, setVolumeData] = useState(
    Array.from({ length: 12 }, () => Math.random() * 20 + 5)
  );

  const [trendLine, setTrendLine] = useState(
    Array.from({ length: 10 }, (_, i) => 50 + Math.sin(i * 0.5) * 20)
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  // Animate candlesticks
  useEffect(() => {
    const interval = setInterval(() => {
      setCandleData(prev => {
        const newCandles = [...prev.slice(1)];
        newCandles.push({
          id: Date.now(),
          height: 20 + Math.random() * 35,
          isGreen: Math.random() > 0.5,
          wickTop: 5 + Math.random() * 10,
          wickBottom: 5 + Math.random() * 10
        });
        return newCandles;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Animate volume bars
  useEffect(() => {
    const interval = setInterval(() => {
      setVolumeData(prev => {
        const newVol = [...prev.slice(1)];
        newVol.push(Math.random() * 20 + 5);
        return newVol;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Animate trend line
  useEffect(() => {
    const interval = setInterval(() => {
      setTrendLine(prev => {
        const newLine = [...prev.slice(1)];
        newLine.push(50 + Math.sin(Date.now() * 0.001) * 20);
        return newLine;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', course: '', message: '' });
  };

  return (
    <div className="overflow-hidden bg-slate-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950/90 to-indigo-950/80 text-white py-24 md:py-32 overflow-hidden">
        {/* Advanced Trading Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22d3ee" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" className="animate-grid-move" />
            </svg>
          </div>

          {/* Live Trading Panel 1 - EUR/USD */}
          <div className="absolute top-32 right-10 bg-slate-900/50 backdrop-blur-md rounded-xl p-4 border border-cyan-500/40 shadow-2xl animate-float">
            <div className="text-cyan-400 text-xs font-bold mb-3 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-ping"></span>
                LIVE MARKET
              </span>
              <span className="text-emerald-400 font-mono">EUR/USD</span>
            </div>
            <svg width="220" height="110" className="overflow-visible">
              <defs>
                <linearGradient id="chartGlow" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Grid */}
              <line x1="0" y1="25" x2="220" y2="25" stroke="#1e293b" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2"/>
              <line x1="0" y1="55" x2="220" y2="55" stroke="#1e293b" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2"/>
              <line x1="0" y1="85" x2="220" y2="85" stroke="#1e293b" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2"/>
              
              {/* Candlesticks with glow */}
              {candleData.map((candle, i) => {
                const x = 15 + i * 26;
                const y = 90 - candle.height;
                return (
                  <g key={candle.id} className="animate-slideIn">
                    <line 
                      x1={x + 4} 
                      y1={y - candle.wickTop} 
                      x2={x + 4} 
                      y2={y + candle.height + candle.wickBottom} 
                      stroke={candle.isGreen ? "#10b981" : "#ef4444"} 
                      strokeWidth="1.5"
                      opacity="0.9"
                    />
                    <rect 
                      x={x} 
                      y={y} 
                      width="8" 
                      height={candle.height} 
                      fill={candle.isGreen ? "#10b981" : "#ef4444"}
                      opacity="0.95"
                      rx="1"
                      className="candle-glow"
                    />
                  </g>
                );
              })}
              
              {/* EMA Line */}
              <path 
                d={`M15,65 ${candleData.map((_, i) => `L${41 + i * 26},${60 + Math.sin(i * 0.8) * 18}`).join(' ')}`}
                stroke="#22d3ee" 
                strokeWidth="2" 
                fill="none"
                opacity="0.7"
                className="animate-dash"
              />
            </svg>
            
            <div className="mt-2 flex justify-between items-center text-xs">
              <span className="text-emerald-400 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd"/>
                </svg>
                +0.12%
              </span>
            </div>
          </div>

          {/* Live Trading Panel 2 - Volume Analysis */}
          <div className="absolute bottom-40 right-20 bg-slate-900/50 backdrop-blur-md rounded-xl p-4 border border-blue-500/40 shadow-2xl animate-float delay-1000">
            <div className="text-cyan-400 text-xs font-bold mb-3 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-ping"></span>
                VOLUME
              </span>
              <span className="text-blue-400 font-mono">GBP/USD</span>
            </div>
            <svg width="200" height="90">
              {volumeData.map((vol, i) => (
                <rect 
                  key={i}
                  x={5 + i * 16} 
                  y={85 - vol} 
                  width="12" 
                  height={vol} 
                  fill={i % 3 === 0 ? "#10b981" : i % 3 === 1 ? "#ef4444" : "#1e293b"}
                  opacity="0.8"
                  className="animate-slideUp"
                  style={{animationDelay: `${i * 80}ms`}}
                  rx="1"
                />
              ))}
              
              <path 
                d={`M10,${85 - volumeData[0]} ${volumeData.slice(1).map((v, i) => `L${26 + i * 16},${85 - v}`).join(' ')}`}
                stroke="#f59e0b" 
                strokeWidth="1.5" 
                fill="none"
                opacity="0.6"
                className="animate-dash"
              />
            </svg>
            
            <div className="mt-2 flex justify-between items-center text-xs">
              <span className="text-slate-400">Vol: 2.4M</span>
            </div>
          </div>

          {/* Live Trading Panel 3 - RSI */}
          <div className="absolute bottom-32 left-10 bg-slate-900/50 backdrop-blur-md rounded-xl p-4 border border-purple-500/40 shadow-2xl animate-float delay-500">
            <div className="text-cyan-400 text-xs font-bold mb-3 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-ping"></span>
                RSI
              </span>
              <span className="text-purple-400 font-mono">USD/JPY</span>
            </div>
            <svg width="190" height="85">
              <line x1="0" y1="15" x2="190" y2="15" stroke="#ef4444" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2"/>
              <line x1="0" y1="42" x2="190" y2="42" stroke="#1e293b" strokeWidth="0.5" opacity="0.5"/>
              <line x1="0" y1="70" x2="190" y2="70" stroke="#10b981" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2"/>
              
              <path 
                d={`M0,42 ${trendLine.map((val, i) => `L${19 * (i + 1)},${val}`).join(' ')}`}
                stroke="url(#rsiGradient)" 
                strokeWidth="2.5" 
                fill="none"
                className="animate-dash"
              />
              
              <defs>
                <linearGradient id="rsiGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="50%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="mt-2 flex justify-between items-center text-xs">
              <span className="text-emerald-400">RSI: 58.3</span>
            </div>
          </div>

          {/* Floating Price Ticker */}
          <div className="absolute top-10 left-1/4 bg-slate-900/60 backdrop-blur-md rounded-lg px-6 py-3 border border-cyan-500/30 shadow-xl animate-float delay-300">
            <div className="flex items-center space-x-6 text-xs font-mono">
              <div className="flex flex-col">
                <span className="text-slate-400 text-[10px]">BTC/USD</span>
                <span className="text-emerald-400 font-bold">$43,250</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-[10px]">EUR/USD</span>
                <span className="text-emerald-400 font-bold">1.0847</span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-[10px]">GBP/USD</span>
                <span className="text-red-400 font-bold">1.2634</span>
              </div>
            </div>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-500/15 to-blue-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-60 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/15 to-indigo-500/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
          <div className="absolute bottom-40 right-60 w-60 h-60 bg-gradient-to-br from-purple-500/15 to-pink-500/5 rounded-full blur-3xl animate-pulse-slow delay-500"></div>

          {/* Particle Effects */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto text-center px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-gradient-to-r from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/40 rounded-full px-5 py-2.5 mb-8 animate-fadeInUp shadow-lg">
              <span className="text-sm font-medium text-cyan-300">📞 Get In Touch</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Contact{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-shift">
                Th3 Trad3rs
              </span>
            </h1>
            
            <p className="text-lg md:text-xl mb-10 text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              Have questions about our courses? Need guidance on your trading journey? 
              We re here to help you succeed in forex trading.
            </p>

            <div className="flex flex-wrap justify-center gap-12 mt-16 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">2 Hours</div>
                <div className="text-slate-300 text-sm mt-1">Response Time</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-slate-300 text-sm mt-1">Support</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">100%</div>
                <div className="text-slate-300 text-sm mt-1">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/4 animate-float">
            <svg width="150" height="80">
              {[...Array(6)].map((_, i) => (
                <rect 
                  key={i}
                  x={10 + i * 22} 
                  y={30 + Math.sin(i) * 15} 
                  width="6" 
                  height={20 + Math.random() * 15} 
                  fill={i % 2 === 0 ? "#10b981" : "#ef4444"}
                  className="animate-candle-pulse"
                  style={{animationDelay: `${i * 100}ms`}}
                />
              ))}
            </svg>
          </div>
          
          <div className="absolute bottom-20 right-1/4 animate-float delay-500">
            <svg width="120" height="60">
              <path d="M0,30 Q30,20 60,25 T120,15" stroke="#22d3ee" strokeWidth="2" fill="none" className="animate-dash"/>
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-500">
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
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-500">
                <h3 className="text-2xl font-bold mb-6 text-white">Get In Touch</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-slate-300 text-sm">Phone</div>
                      <div className="text-white font-semibold">+92 343 1304090</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-slate-300 text-sm">Email</div>
                      <div className="text-white font-semibold text-sm">th3trad3rsofficial@gmail.com</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="text-slate-300 text-sm">Location</div>
                      <div className="text-white font-semibold">Layyah, Pakistan</div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4 group cursor-pointer">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
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
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-500">
                <h3 className="text-2xl font-bold mb-6 text-white">Follow Us</h3>
                
                <div className="flex space-x-4 mb-4">
                  <a 
                    href="https://www.facebook.com/th3trad3rsofficial" 
                    className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
                    </svg>
                  </a>
                  
                  <a 
                    href="https://www.instagram.com/th3_trad3rs?igsh=eGx4ejIwZjN6MHNn" 
                    className="w-12 h-12 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform hover:scale-110 shadow-lg"
                  >
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>

                <p className="text-slate-300 text-sm">
                  Follow us for daily trading tips, market updates, and success stories from our community.
                </p>
              </div>

              {/* FAQ Quick Links */}
              <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg border border-slate-700/50 hover:border-cyan-400/30 transition-all duration-500">
                <h3 className="text-2xl font-bold mb-6 text-white">Quick Help</h3>
                
                <div className="space-y-3">
                  <a href="#" className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-300 group">
                    <span className="text-slate-300 group-hover:text-white">Frequently Asked Questions</span>
                    <svg className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  
                  <a href="#" className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-300 group">
                    <span className="text-slate-300 group-hover:text-white">View All Courses</span>
                    <svg className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  
                  <a href="#" className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg hover:bg-slate-700/50 transition-colors duration-300 group">
                    <span className="text-slate-300 group-hover:text-white">Enroll Now</span>
                    <svg className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950/90 to-indigo-950/80 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-20 right-20 animate-float">
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
                    className="animate-candle-pulse"
                    style={{animationDelay: `${i * 100}ms`}}
                  />
                );
              })}
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
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
                className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-700/50 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-2"
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
            <a 
              href="#contact-form" 
              className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-full font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
            >
              <span>Send us a message</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Response Time Banner */}
      <section className="py-12 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-y border-cyan-400/20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-8 flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
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

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes candle-pulse {
          0%, 100% { transform: scaleY(1); opacity: 1; }
          50% { transform: scaleY(1.1); opacity: 0.8; }
        }
        @keyframes dash {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(2deg); }
        }
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; background-size: 200% 200%; }
          50% { background-position: 100% 50%; background-size: 200% 200%; }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-30px) scale(0.9); }
          to { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px) scaleY(0.8); }
          to { opacity: 1; transform: translateY(0) scaleY(1); }
        }
        @keyframes grid-move {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        @keyframes particle {
          0% { opacity: 0; transform: translateY(0) translateX(0) scale(0); }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { opacity: 0; transform: translateY(-100vh) translateX(50px) scale(1); }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; opacity: 0; }
        .animate-candle-pulse { transform-origin: bottom; animation: candle-pulse 2s ease-in-out infinite; }
        .animate-dash { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: dash 3s ease-out forwards infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-gradient-shift { background-size: 200% 200%; animation: gradient-shift 4s ease infinite; }
        .animate-slideIn { animation: slideIn 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.7s ease-out; }
        .animate-grid-move { animation: grid-move 20s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-particle { animation: particle linear infinite; }
        .candle-glow { filter: drop-shadow(0 0 3px currentColor); }
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-1000 { animation-delay: 1000ms; }
        
        html { scroll-behavior: smooth; }
        
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #0f172a; }
        ::-webkit-scrollbar-thumb { background: linear-gradient(to bottom, #06b6d4, #3b82f6); border-radius: 5px; }
        ::-webkit-scrollbar-thumb:hover { background: linear-gradient(to bottom, #22d3ee, #60a5fa); }
      `}</style>
    </div>
  );
}