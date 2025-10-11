'use client'

import React, { useEffect, useState } from 'react';
import { TrendingUp, Users, Globe, Shield, BookOpen, BarChart3, Award, Clock } from 'lucide-react';

export default function AboutPage() {
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

  const stats = [
    { icon: <Users size={28} />, value: '10,000+', label: 'Active Traders' },
    { icon: <Globe size={28} />, value: '50+', label: 'Countries' },
    { icon: <TrendingUp size={28} />, value: '2018', label: 'Established' },
    { icon: <Award size={28} />, value: '95%', label: 'Success Rate' },
  ];

  const features = [
    {
      icon: <Shield size={40} />,
      title: 'Risk Management',
      description: 'Learn proven techniques to protect your capital while maximizing profit potential with advanced risk assessment tools.'
    },
    {
      icon: <BookOpen size={40} />,
      title: 'Structured Learning',
      description: 'Step-by-step curriculum designed to take you from beginner to advanced trader with personalized learning paths.'
    },
    {
      icon: <BarChart3 size={40} />,
      title: 'Live Market Analysis',
      description: 'Get real-time insights and practical application of trading strategies with daily market breakdowns.'
    },
    {
      icon: <Clock size={40} />,
      title: '24/7 Support',
      description: 'Round-the-clock assistance and mentorship to guide you through every step of your trading journey.'
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/90 to-indigo-950/80">
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

        {/* Live Trading Panel 1 */}
        <div className="absolute top-32 right-10 bg-slate-900/50 backdrop-blur-md rounded-xl p-4 border border-cyan-500/40 shadow-2xl animate-float">
          <div className="text-cyan-400 text-xs font-bold mb-3 flex items-center justify-between">
            <span className="flex items-center">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-ping"></span>
              LIVE MARKET
            </span>
            <span className="text-emerald-400 font-mono">EUR/USD</span>
          </div>
          <svg width="220" height="110">
            <line x1="0" y1="25" x2="220" y2="25" stroke="#1e293b" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2"/>
            <line x1="0" y1="55" x2="220" y2="55" stroke="#1e293b" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2"/>
            <line x1="0" y1="85" x2="220" y2="85" stroke="#1e293b" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2"/>
            
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

        {/* Live Trading Panel 2 */}
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

        {/* Live Trading Panel 3 */}
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

      <div className="relative z-10">
        {/* Header Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-6 py-2 text-sm font-medium text-cyan-300">
                Professional Trading Education
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight animate-fadeInUp">
              About{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 animate-gradient-shift">
                  Th3 Trad3rs Academy
                </span>
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed animate-fadeInUp" style={{animationDelay: '0.2s'}}>
              Empowering traders worldwide with knowledge, strategy, and confidence since 2018. 
              Transform your trading potential with our comprehensive educational programs.
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-20">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 text-center border border-slate-700/50 hover:border-cyan-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/25 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-slate-400 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Mission Section */}
          <div className="relative mb-20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-cyan-500/15 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-700/50">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-center mb-8">
                  <div className="w-12 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-4 animate-pulse"></div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                    Our Mission
                  </h2>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full ml-4 animate-pulse"></div>
                </div>
                <div className="space-y-6 text-slate-300">
                  <p className="text-lg sm:text-xl leading-relaxed">
                    At Th3 Trad3rs Academy, we believe that financial freedom starts with knowledge. 
                    Our mission is simple: to turn beginners into skilled traders through structured lessons, 
                    practical training, and real market insights.
                  </p>
                  <p className="text-lg sm:text-xl leading-relaxed">
                    We offer more than just theory—our students learn proven trading methods, risk management 
                    techniques, and gain access to live market analysis that transforms theoretical knowledge into practical success.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Why Choose Us
              </h2>
              <p className="text-slate-300 text-lg max-w-2xl mx-auto">
                Discover what makes our academy the premier choice for serious traders
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-700/50 hover:border-cyan-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 hover:-translate-y-3"
                  style={{animationDelay: `${index * 200}ms`}}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-cyan-400 mb-6 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white group-hover:text-cyan-100 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors duration-300">
                      {feature.description}
                    </p>
                    <div className="w-full h-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-3xl p-8 sm:p-12 lg:p-16 text-center border border-slate-700/50">
              <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Ready to Begin Your Trading Journey?
              </h2>
              <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join our community of successful traders and transform your approach to Forex trading with proven strategies and expert guidance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/50 text-lg">
                  <span className="relative z-10">Start Learning Today</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="group relative bg-transparent border-2 border-cyan-400/50 hover:border-cyan-400 text-cyan-300 hover:text-white font-bold py-4 px-10 rounded-2xl transition-all duration-300 text-lg hover:bg-cyan-400/10">
                  View Courses  
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
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
        .animate-dash { stroke-dasharray: 1000; stroke-dashoffset: 1000; animation: dash 3s ease-out forwards infinite; }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-gradient-shift { background-size: 200% 200%; animation: gradient-shift 4s ease infinite; }
        .animate-slideIn { animation: slideIn 0.6s ease-out; }
        .animate-slideUp { animation: slideUp 0.7s ease-out; }
        .animate-grid-move { animation: grid-move 20s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-particle { animation: particle linear infinite; }
        .candle-glow { filter: drop-shadow(0 0 3px currentColor); }
        .delay-500 { animation-delay: 500ms; }
        .delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </div>
  );
} 