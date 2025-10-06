'use client'

import React, { useEffect, useState } from 'react';
import Link from "next/link";

export default function Home() {
  const [animatedValues, setAnimatedValues] = useState({
    eurusd: 1.0847,
    gbpusd: 1.2634,
    usdjpy: 149.23,
    btcusd: 43250
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

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950/90 to-indigo-950/80 text-white py-24 md:py-32 overflow-hidden">
        {/* Advanced Trading Background Animation */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Animated Candlestick Charts */}
          <div className="absolute top-20 left-10 opacity-25">
            <svg width="240" height="140" className="animate-pulse">
              {/* Candlestick 1 - Green */}
              <rect x="10" y="50" width="8" height="30" fill="#10b981" className="animate-candle-grow" />
              <line x1="14" y1="40" x2="14" y2="90" stroke="#10b981" strokeWidth="1" />
              
              {/* Candlestick 2 - Red */}
              <rect x="30" y="60" width="8" height="25" fill="#ef4444" className="animate-candle-grow delay-200" />
              <line x1="34" y1="45" x2="34" y2="95" stroke="#ef4444" strokeWidth="1" />
              
              {/* Candlestick 3 - Green */}
              <rect x="50" y="45" width="8" height="35" fill="#10b981" className="animate-candle-grow delay-400" />
              <line x1="54" y1="35" x2="54" y2="95" stroke="#10b981" strokeWidth="1" />
              
              {/* Candlestick 4 - Red */}
              <rect x="70" y="55" width="8" height="20" fill="#ef4444" className="animate-candle-grow delay-600" />
              <line x1="74" y1="40" x2="74" y2="85" stroke="#ef4444" strokeWidth="1" />
              
              {/* Candlestick 5 - Green */}
              <rect x="90" y="40" width="8" height="40" fill="#10b981" className="animate-candle-grow delay-800" />
              <line x1="94" y1="30" x2="94" y2="90" stroke="#10b981" strokeWidth="1" />
              
              {/* Grid Lines */}
              <line x1="0" y1="30" x2="120" y2="30" stroke="#1e293b" strokeWidth="0.5" opacity="0.3" />
              <line x1="0" y1="60" x2="120" y2="60" stroke="#1e293b" strokeWidth="0.5" opacity="0.3" />
              <line x1="0" y1="90" x2="120" y2="90" stroke="#1e293b" strokeWidth="0.5" opacity="0.3" />
            </svg>
          </div>

          <div className="absolute top-40 right-20 opacity-20">
            <svg width="200" height="120" className="animate-pulse delay-1000">
              {/* Larger Candlestick Chart */}
              <rect x="15" y="40" width="12" height="35" fill="#22d3ee" className="animate-candle-grow" />
              <line x1="21" y1="30" x2="21" y2="85" stroke="#22d3ee" strokeWidth="1.5" />
              
              <rect x="40" y="50" width="12" height="28" fill="#ef4444" className="animate-candle-grow delay-300" />
              <line x1="46" y1="35" x2="46" y2="88" stroke="#ef4444" strokeWidth="1.5" />
              
              <rect x="65" y="35" width="12" height="42" fill="#22d3ee" className="animate-candle-grow delay-600" />
              <line x1="71" y1="25" x2="71" y2="85" stroke="#22d3ee" strokeWidth="1.5" />
              
              <rect x="90" y="45" width="12" height="30" fill="#ef4444" className="animate-candle-grow delay-900" />
              <line x1="96" y1="35" x2="96" y2="85" stroke="#ef4444" strokeWidth="1.5" />
              
              {/* Price Line */}
              <path d="M10,60 Q30,55 50,50 T90,45 T130,40" stroke="url(#priceGradient)" strokeWidth="1.5" fill="none" className="animate-dash" />
              
              <defs>
                <linearGradient id="priceGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="absolute bottom-40 left-20 opacity-25">
            <svg width="180" height="100" className="animate-pulse delay-500">
              {/* Mini Candlestick Pattern */}
              <rect x="10" y="45" width="6" height="20" fill="#10b981" className="animate-candle-grow" />
              <line x1="13" y1="40" x2="13" y2="70" stroke="#10b981" strokeWidth="0.8" />
              
              <rect x="25" y="50" width="6" height="15" fill="#ef4444" className="animate-candle-grow delay-200" />
              <line x1="28" y1="45" x2="28" y2="70" stroke="#ef4444" strokeWidth="0.8" />
              
              <rect x="40" y="42" width="6" height="23" fill="#10b981" className="animate-candle-grow delay-400" />
              <line x1="43" y1="35" x2="43" y2="70" stroke="#10b981" strokeWidth="0.8" />
              
              <rect x="55" y="48" width="6" height="18" fill="#22d3ee" className="animate-candle-grow delay-600" />
              <line x1="58" y1="42" x2="58" y2="70" stroke="#22d3ee" strokeWidth="0.8" />
              
              <rect x="70" y="40" width="6" height="25" fill="#10b981" className="animate-candle-grow delay-800" />
              <line x1="73" y1="35" x2="73" y2="70" stroke="#10b981" strokeWidth="0.8" />
              
              {/* Volume bars */}
              <rect x="10" y="80" width="6" height="8" fill="#1e293b" opacity="0.5" />
              <rect x="25" y="78" width="6" height="10" fill="#1e293b" opacity="0.5" />
              <rect x="40" y="82" width="6" height="6" fill="#1e293b" opacity="0.5" />
              <rect x="55" y="79" width="6" height="9" fill="#1e293b" opacity="0.5" />
              <rect x="70" y="81" width="6" height="7" fill="#1e293b" opacity="0.5" />
            </svg>
          </div>

          {/* Large Background Candlestick Chart */}
          <div className="absolute top-1/4 right-1/4 opacity-10">
            <svg width="300" height="200" className="animate-pulse delay-2000">
              {[...Array(12)].map((_, i) => {
                const isGreen = Math.random() > 0.5;
                const height = 20 + Math.random() * 30;
                const y = 100 - height/2;
                return (
                  <g key={i}>
                    <rect 
                      x={15 + i * 20} 
                      y={y} 
                      width="10" 
                      height={height} 
                      fill={isGreen ? "#10b981" : "#ef4444"} 
                      className="animate-candle-grow"
                      style={{animationDelay: `${i * 100}ms`}}
                    />
                    <line 
                      x1={20 + i * 20} 
                      y1={y - 10} 
                      x2={20 + i * 20} 
                      y2={y + height + 10} 
                      stroke={isGreen ? "#10b981" : "#ef4444"} 
                      strokeWidth="1"
                      opacity="0.8"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Floating Currency Pairs */}
          <div className="absolute top-32 right-10 bg-slate-900/30 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/20 animate-float">
            <div className="text-cyan-400 text-sm font-mono">
              <div className="flex justify-between items-center mb-2">
                <span>EUR/USD</span>
                <span className="text-green-400">{animatedValues.eurusd.toFixed(4)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>GBP/USD</span>
                <span className="text-red-400">{animatedValues.gbpusd.toFixed(4)}</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-32 right-32 bg-slate-900/30 backdrop-blur-sm rounded-lg p-4 border border-blue-500/20 animate-float delay-1000">
            <div className="text-cyan-400 text-sm font-mono">
              <div className="flex justify-between items-center mb-2">
                <span>USD/JPY</span>
                <span className="text-green-400">{animatedValues.usdjpy.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>BTC/USD</span>
                <span className="text-green-400">${animatedValues.btcusd.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Gradient Orbs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-60 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 right-60 w-60 h-60 bg-gradient-to-br from-cyan-500/10 to-sky-500/5 rounded-full blur-2xl animate-pulse delay-500"></div>

          {/* Moving Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent w-1 h-full animate-slide-right"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent h-1 w-full animate-slide-down"></div>
          </div>
        </div>

        <div className="container mx-auto text-center px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-4 py-2 mb-8 animate-fadeInUp">
              <span className="text-sm font-medium text-cyan-300">🚀 #1 Th3 Trad3rs</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Master{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
                Forex Trading
              </span>{" "}
              with Experts
            </h1>
            
            <p className="text-lg md:text-xl mb-10 text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              Transform your financial future with our comprehensive forex trading courses. 
              Learn from industry experts and join hundreds of successful traders.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <Link
                href="/student-application"
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Learning Today</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link
                href="/courses"
                className="group border-2 border-cyan-400/40 text-cyan-300 hover:text-white px-8 py-4 rounded-full font-semibold hover:bg-cyan-500/20 backdrop-blur-sm transition-all duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v9a2 2 0 01-2 2z" />
                </svg>
                <span>Explore Courses</span>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-16 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">500+</div>
                <div className="text-slate-300 text-sm">Students Since 2018</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">95%</div>
                <div className="text-slate-300 text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">24/7</div>
                <div className="text-slate-300 text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800/60 to-slate-900/60 relative overflow-hidden">
        {/* Background Chart Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-1/4">
            <svg width="150" height="80">
              <rect x="10" y="30" width="4" height="15" fill="#10b981" />
              <rect x="20" y="25" width="4" height="20" fill="#ef4444" />
              <rect x="30" y="35" width="4" height="10" fill="#10b981" />
              <rect x="40" y="20" width="4" height="25" fill="#ef4444" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Why Choose Th3 Trad3rs?
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              We provide everything you need to become a successful forex trader
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "📚",
                title: "Expert-Led Courses",
                description: "Learn from traders with 10+ years of market experience",
                gradient: "from-blue-500 to-indigo-600"
              },
              {
                icon: "💡",
                title: "Real-Time Strategies",
                description: "Get access to current market strategies and live trading sessions",
                gradient: "from-cyan-500 to-blue-600"
              },
              {
                icon: "📈",
                title: "Proven Results",
                description: "95% of our students see profitable results within 3 months",
                gradient: "from-blue-600 to-indigo-700"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/10 transform hover:-translate-y-2 transition-all duration-500 border border-slate-700/50"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-slate-300 leading-relaxed">{feature.description}</p>
                <div className={`w-full h-1 bg-gradient-to-r ${feature.gradient} rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Overview */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950/90 to-indigo-950/80 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-20 right-20">
            <svg width="120" height="80">
              {[...Array(6)].map((_, i) => {
                const isGreen = i % 2 === 0;
                return (
                  <rect 
                    key={i}
                    x={i * 18} 
                    y={40 - Math.random() * 20} 
                    width="8" 
                    height={15 + Math.random() * 10} 
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
              Our Trading Courses
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Choose from our comprehensive range of forex trading courses designed for every skill level
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Basic Course",
                description: "Learn forex trading from scratch with our comprehensive beginner-friendly curriculum covering fundamentals.",
                duration: "3 Month",
                students: "200+",
                rating: "4.8",
                price: "PKR 20,000",
                originalPrice: "PKR 30,000",
                href: "/course",
                gradient: "from-blue-600 to-indigo-700"
              },
              {
                title: "Advance Course",
                description: "Deep dive into technical analysis, risk management, and advanced trading strategies for serious traders.",
                duration: "5 Month",
                students: "180+",
                rating: "4.9",
                price: "PKR 30,000",
                originalPrice: "PKR 45,000",
                href: "/course",
                gradient: "from-cyan-500 to-blue-600"
              },
              {
                title: "Pro Course",
                description: "Master-level training with live trading sessions, advanced psychology, and institutional strategies.",
                duration: "8 Month",
                students: "120+",
                rating: "4.9",
                price: "PKR 40,000",
                originalPrice: "PKR 60,000",
                href: "/course",
                gradient: "from-blue-600 to-indigo-700"
              }
            ].map((course, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/10 transform hover:-translate-y-2 transition-all duration-500 border border-slate-700/50"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative overflow-hidden">
                  <div className={`w-full h-48 bg-gradient-to-br ${course.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                    <div className="text-6xl opacity-30 relative z-10">📊</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 to-transparent"></div>
                  </div>
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                    {course.rating} ⭐
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-cyan-400 text-sm font-semibold bg-cyan-500/20 border border-cyan-400/30 px-3 py-1 rounded-full">
                      {course.duration}
                    </span>
                    <span className="text-slate-400 text-sm">{course.students} students</span>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {course.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-4 leading-relaxed">
                    {course.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-cyan-400">{course.price}</span>
                      <span className="text-slate-500 line-through text-sm">{course.originalPrice}</span>
                    </div>
                    
                    <Link 
                      href={course.href} 
                      className="group/btn bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-2.5 rounded-full font-medium transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-cyan-500/25"
                    >
                      <span>Learn More</span>
                      <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-800/60 to-slate-900/60 relative overflow-hidden">
        {/* Background Trading Elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-40 left-10">
            <svg width="100" height="60">
              <path d="M10,30 Q25,20 40,25 T70,15 T100,20" stroke="#22d3ee" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              What Our Students Say
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Real success stories from our trading community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                role: "Full-time Trader",
                content: "Th3 Trad3rs completely changed my understanding of forex. The strategies actually work!",
                avatar: "SJ",
                gradient: "from-blue-600 to-indigo-700"
              },
              {
                name: "Michael Chen",
                role: "Investment Analyst",
                content: "Professional, detailed, and practical. Best investment I've made in my trading education.",
                avatar: "MC",
                gradient: "from-cyan-500 to-blue-600"
              },
              {
                name: "Emily Rodriguez",
                role: "Day Trader",
                content: "The live sessions are incredible. Learning from real trades made all the difference.",
                avatar: "ER",
                gradient: "from-blue-600 to-indigo-700"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl p-6 rounded-2xl shadow-lg hover:shadow-xl hover:shadow-cyan-500/10 transform hover:-translate-y-1 transition-all duration-300 border border-slate-700/50"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-semibold mr-4 shadow-lg`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-slate-400 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-slate-300 italic leading-relaxed mb-3">{testimonial.content}</p>
                <div className="flex text-cyan-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950/90 to-indigo-950/80 text-white py-20 overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Mini Trading Chart */}
          <div className="absolute top-20 right-10 opacity-15">
            <svg width="80" height="50">
              <rect x="5" y="25" width="3" height="10" fill="#10b981" />
              <rect x="12" y="20" width="3" height="15" fill="#ef4444" />
              <rect x="19" y="30" width="3" height="8" fill="#10b981" />
              <rect x="26" y="18" width="3" height="17" fill="#ef4444" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto text-center px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fadeInUp">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
                Forex Journey?
              </span>
            </h2>
            
            <p className="mb-8 text-lg md:text-xl text-slate-300 leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Join hundreds of students who have transformed their financial future with our proven trading methods and expert guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Link
                href="/student-application"
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:shadow-cyan-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Enroll Now - Limited Spots</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <div className="flex items-center space-x-4 text-slate-300">
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">3-Day Money Back</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Lifetime Access</span>
                </div>
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

        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes slide-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        
        @keyframes slide-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
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
        
        .animate-dash {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 8s linear infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-slide-right {
          animation: slide-right 15s linear infinite;
        }
        
        .animate-slide-down {
          animation: slide-down 20s linear infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}