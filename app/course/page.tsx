'use client'

import React, { useEffect, useState } from 'react';
import Link from "next/link";

export default function CoursesPage() {
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
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950/90 to-indigo-950/80 text-white py-20 md:py-28 overflow-hidden">
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
        </div>

        <div className="container mx-auto text-center px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-4 py-2 mb-8 animate-fadeInUp">
              <span className="text-sm font-medium text-cyan-300">📚 Professional Trading Courses</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Transform Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-gradient">
                Trading Skills
              </span>
            </h1>
            
            <p className="text-lg md:text-xl mb-8 text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              Choose from our comprehensive range of forex trading courses designed for every skill level. 
              From basics to advanced strategies, we have everything you need to succeed.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 mt-12 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">500+</div>
                <div className="text-slate-300 text-sm">Happy Students</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">3</div>
                <div className="text-slate-300 text-sm">Course Levels</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400">95%</div>
                <div className="text-slate-300 text-sm">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
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
          <div className="absolute bottom-40 right-1/3">
            <svg width="120" height="60">
              <path d="M10,30 Q25,20 40,25 T70,15 T100,20" stroke="#22d3ee" strokeWidth="1" fill="none" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Our Trading Courses
            </h2>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              Expert-designed curriculum to take you from beginner to professional trader
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                title: "Basic Course",
                subtitle: "Perfect for Beginners",
                description: "Learn forex trading from scratch with our comprehensive beginner-friendly curriculum covering market fundamentals, basic analysis, and risk management.",
                features: [
                  "Market Fundamentals",
                  "Basic Technical Analysis", 
                  "Risk Management Basics",
                  "Trading Psychology",
                  "Platform Training",
                  "Demo Trading Practice"
                ],
                duration: "3 Months",
                students: "200+",
                rating: "4.8",
                price: "PKR 20,000",
                originalPrice: "PKR 30,000",
                href: "/courses/basics",
                gradient: "from-blue-600 to-indigo-700",
                popular: false
              },
              {
                title: "Advance Course",
                subtitle: "For Serious Traders",
                description: "Deep dive into advanced technical analysis, complex trading strategies, professional risk management, and market psychology for consistent profitability.",
                features: [
                  "Advanced Technical Analysis",
                  "Multiple Timeframe Analysis",
                  "Risk Management Mastery",
                  "Trading Strategies",
                  "Market Psychology",
                  "Live Trading Sessions"
                ],
                duration: "5 Months",
                students: "180+",
                rating: "4.9",
                price: "PKR 30,000",
                originalPrice: "PKR 45,000",
                href: "/courses/advance",
                gradient: "from-cyan-500 to-blue-600",
                popular: true
              },
              {
                title: "Pro Course",
                subtitle: "Master Level Training",
                description: "Professional-grade training with institutional strategies, advanced market analysis, algorithmic concepts, and intensive mentorship for elite traders.",
                features: [
                  "Institutional Strategies",
                  "Advanced Market Structure",
                  "Algorithmic Trading Basics",
                  "Professional Risk Models",
                  "1-on-1 Mentorship",
                  "Portfolio Management"
                ],
                duration: "8 Months",
                students: "120+",
                rating: "4.9",
                price: "PKR 40,000",
                originalPrice: "PKR 60,000",
                href: "/courses/pro",
                gradient: "from-blue-600 to-indigo-700",
                popular: false
              }
            ].map((course, index) => (
              <div 
                key={index}
                className={`group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl shadow-lg rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/10 transform hover:-translate-y-2 transition-all duration-500 border ${course.popular ? 'border-cyan-400/50' : 'border-slate-700/50'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {course.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs px-4 py-2 rounded-full font-bold shadow-lg animate-pulse">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="relative overflow-hidden">
                  <div className={`w-full h-48 bg-gradient-to-br ${course.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                    
                    {/* Trading Chart Icon */}
                    <div className="relative z-10 text-center">
                      <div className="text-5xl mb-2 opacity-90">📈</div>
                      <div className="text-white/80 text-sm font-semibold">{course.subtitle}</div>
                    </div>
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 to-transparent"></div>
                    
                    {/* Animated background elements */}
                    <div className="absolute top-4 left-4 opacity-30">
                      <svg width="40" height="30">
                        <rect x="2" y="15" width="3" height="8" fill="rgba(255,255,255,0.3)" />
                        <rect x="8" y="12" width="3" height="11" fill="rgba(255,255,255,0.4)" />
                        <rect x="14" y="18" width="3" height="5" fill="rgba(255,255,255,0.3)" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                    {course.rating} ⭐
                  </div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-cyan-400 text-sm font-semibold bg-cyan-500/20 border border-cyan-400/30 px-3 py-1 rounded-full">
                      {course.duration}
                    </span>
                    <span className="text-slate-400 text-sm">{course.students} students</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {course.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-6 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Course Features */}
                  <div className="mb-6">
                    <h4 className="text-white font-semibold mb-3">What You ll Learn:</h4>
                    <ul className="space-y-2">
                      {course.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-slate-300 text-sm">
                          <svg className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-slate-700/50">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-cyan-400">{course.price}</span>
                      <span className="text-slate-500 line-through text-sm">{course.originalPrice}</span>
                    </div>
                    
                    <Link 
                      href={course.href} 
                      className="group/btn bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-full font-medium transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-cyan-500/25"
                    >
                      <span>Enroll Now</span>
                      <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl p-8 border border-slate-700/50 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Why Choose Our Courses?</h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-semibold text-cyan-400 mb-2">Practical Learning</h4>
                  <p className="text-slate-300 text-sm">Real market scenarios and live trading sessions</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">👨‍💼</div>
                  <h4 className="font-semibold text-cyan-400 mb-2">Expert Instructors</h4>
                  <p className="text-slate-300 text-sm">Learn from professionals with 10+ years experience</p>
                </div>
                <div>
                  <div className="text-3xl mb-2">📞</div>
                  <h4 className="font-semibold text-cyan-400 mb-2">24/7 Support</h4>
                  <p className="text-slate-300 text-sm">Get help whenever you need it</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950/90 to-indigo-950/80 text-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container mx-auto text-center px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Still Have Questions?
            </h2>
            
            <p className="mb-8 text-slate-300 leading-relaxed">
              Get in touch with our team to find the perfect course for your trading goals.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/contact"
                className="group border-2 border-cyan-400/40 text-cyan-300 hover:text-white px-8 py-3 rounded-full font-semibold hover:bg-cyan-500/20 backdrop-blur-sm transition-all duration-300 flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Contact Us</span>
              </Link>
              
              <div className="text-slate-400 text-sm">
                Or call us at: <span className="text-cyan-400 font-semibold">+92 XXX XXXXXXX</span>
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
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}