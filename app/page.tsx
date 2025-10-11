'use client'

import React, { useEffect, useState } from 'react';

export default function Home() {
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

          {/* Multiple Candlestick Charts */}
          <div className="absolute top-20 left-10 opacity-30">
            <svg width="280" height="160" className="animate-pulse">
              {[...Array(10)].map((_, i) => {
                const isGreen = i % 2 === 0;
                const height = 15 + Math.random() * 25;
                const y = 80 - height/2;
                return (
                  <g key={i}>
                    <rect 
                      x={10 + i * 25} 
                      y={y} 
                      width="10" 
                      height={height} 
                      fill={isGreen ? "#10b981" : "#ef4444"} 
                      className="animate-candle-grow"
                      style={{animationDelay: `${i * 150}ms`}}
                    />
                    <line 
                      x1={15 + i * 25} 
                      y1={y - 8} 
                      x2={15 + i * 25} 
                      y2={y + height + 8} 
                      stroke={isGreen ? "#10b981" : "#ef4444"} 
                      strokeWidth="1.5"
                      opacity="0.8"
                    />
                  </g>
                );
              })}
              {/* Trend Line */}
              <path 
                d="M10,70 Q60,60 110,65 T210,60 T280,55" 
                stroke="#22d3ee" 
                strokeWidth="2" 
                fill="none" 
                className="animate-dash"
              />
            </svg>
          </div>

          <div className="absolute top-40 right-20 opacity-25">
            <svg width="250" height="150" className="animate-pulse delay-1000">
              {/* Bollinger Bands Style */}
              <path d="M10,50 Q60,45 110,48 T210,45" stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="3,3"/>
              <path d="M10,75 Q60,70 110,73 T210,70" stroke="#06b6d4" strokeWidth="2" fill="none" className="animate-dash"/>
              <path d="M10,100 Q60,95 110,98 T210,95" stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="3,3"/>
              
              {/* Candlesticks on trend */}
              {[...Array(8)].map((_, i) => {
                const isGreen = Math.random() > 0.5;
                const height = 12 + Math.random() * 18;
                const x = 20 + i * 28;
                const y = 75 - height/2;
                return (
                  <g key={i}>
                    <rect 
                      x={x} 
                      y={y} 
                      width="8" 
                      height={height} 
                      fill={isGreen ? "#10b981" : "#ef4444"}
                      className="animate-candle-pulse"
                      style={{animationDelay: `${i * 200}ms`}}
                    />
                    <line 
                      x1={x + 4} 
                      y1={y - 6} 
                      x2={x + 4} 
                      y2={y + height + 6} 
                      stroke={isGreen ? "#10b981" : "#ef4444"} 
                      strokeWidth="1"
                    />
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="absolute bottom-40 left-20 opacity-30">
            <svg width="200" height="120">
              {/* Volume Profile */}
              {[...Array(8)].map((_, i) => (
                <rect 
                  key={i}
                  x={10 + i * 23} 
                  y={100 - (15 + Math.random() * 30)} 
                  width="18" 
                  height={15 + Math.random() * 30} 
                  fill={i % 2 === 0 ? "#10b981" : "#ef4444"}
                  opacity="0.7"
                  className="animate-volume-pulse"
                  style={{animationDelay: `${i * 100}ms`}}
                />
              ))}
            </svg>
          </div>

          {/* Large Background Chart */}
          <div className="absolute top-1/4 right-1/4 opacity-15">
            <svg width="400" height="250">
              {/* Price Area Chart */}
              <defs>
                <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path 
                d="M0,120 L40,110 L80,115 L120,105 L160,108 L200,100 L240,95 L280,90 L320,85 L360,80 L400,75 L400,250 L0,250 Z" 
                fill="url(#areaGradient)"
                className="animate-area-grow"
              />
              <path 
                d="M0,120 L40,110 L80,115 L120,105 L160,108 L200,100 L240,95 L280,90 L320,85 L360,80 L400,75" 
                stroke="#06b6d4" 
                strokeWidth="2.5" 
                fill="none"
                className="animate-dash"
              />
            </svg>
          </div>

          {/* Moving Average Indicators */}
          <div className="absolute top-60 left-1/3 opacity-20">
            <svg width="180" height="100">
              <path d="M0,50 Q45,40 90,45 T180,35" stroke="#f59e0b" strokeWidth="2" fill="none" className="animate-dash" opacity="0.8"/>
              <path d="M0,55 Q45,48 90,52 T180,45" stroke="#10b981" strokeWidth="2" fill="none" className="animate-dash delay-500" opacity="0.8"/>
              <path d="M0,60 Q45,55 90,58 T180,52" stroke="#ef4444" strokeWidth="2" fill="none" className="animate-dash delay-1000" opacity="0.8"/>
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
            
            {/* Price Display */}
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
              {/* Volume Bars */}
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
              
              {/* Volume MA Line */}
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

          {/* Live Trading Panel 3 - Trend Indicator */}
          <div className="absolute bottom-32 left-10 bg-slate-900/50 backdrop-blur-md rounded-xl p-4 border border-purple-500/40 shadow-2xl animate-float delay-500">
            <div className="text-cyan-400 text-xs font-bold mb-3 flex items-center justify-between">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-ping"></span>
                RSI
              </span>
              <span className="text-purple-400 font-mono">USD/JPY</span>
            </div>
            <svg width="190" height="85">
              {/* RSI Levels */}
              <line x1="0" y1="15" x2="190" y2="15" stroke="#ef4444" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2"/>
              <line x1="0" y1="42" x2="190" y2="42" stroke="#1e293b" strokeWidth="0.5" opacity="0.5"/>
              <line x1="0" y1="70" x2="190" y2="70" stroke="#10b981" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2"/>
              
              {/* RSI Line */}
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
                <span className="text-emerald-400 font-bold"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-[10px]">EUR/USD</span>
                <span className="text-emerald-400 font-bold"></span>
              </div>
              <div className="flex flex-col">
                <span className="text-slate-400 text-[10px]">GBP/USD</span>
                <span className="text-red-400 font-bold"></span>
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
            {/* Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/40 rounded-full px-5 py-2.5 mb-8 animate-fadeInUp shadow-lg">
              <span className="text-sm font-medium text-cyan-300">🚀 #1 Th3 Trad3rs - Live Since 2018</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Master{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-shift">
                Forex Trading
              </span>{" "}
              with Experts
            </h1>
            
            <p className="text-lg md:text-xl mb-10 text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              Transform your financial future with our comprehensive forex trading courses. 
              Learn from industry experts and join hundreds of successful traders.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <a
                href="#"
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:shadow-cyan-500/30 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Learning Today</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              
              <a
                href="#"
                className="group border-2 border-cyan-400/50 text-cyan-300 hover:text-white px-8 py-4 rounded-full font-semibold hover:bg-cyan-500/20 hover:border-cyan-400 backdrop-blur-sm transition-all duration-300 flex items-center space-x-2 shadow-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h6m2 5H7a2 2 0 01-2-2V8a2 2 0 012-2h10a2 2 0 012 2v9a2 2 0 01-2 2z" />
                </svg>
                <span>Explore Courses</span>
              </a>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-12 mt-16 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-slate-300 text-sm mt-1">Students Since 2018</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">95%</div>
                <div className="text-slate-300 text-sm mt-1">Success Rate</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">24/7</div>
                <div className="text-slate-300 text-sm mt-1">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-950 relative overflow-hidden">
        {/* Animated Background Elements */}
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
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
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
                description: "Learn from traders with 10+ years of market experience and proven track records",
                gradient: "from-blue-500 to-indigo-600",
                features: ["Live Sessions", "Recorded Classes", "1-on-1 Mentoring"]
              },
              {
                icon: "💡",
                title: "Real-Time Strategies",
                description: "Get access to current market strategies and live trading sessions daily",
                gradient: "from-cyan-500 to-blue-600",
                features: ["Daily Signals", "Market Analysis", "Trade Setups"]
              },
              {
                icon: "📈",
                title: "Proven Results",
                description: "95% of our students see profitable results within 3 months of completion",
                gradient: "from-blue-600 to-indigo-700",
                features: ["Risk Management", "Psychology", "Money Management"]
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-3 transition-all duration-500 border border-slate-700/50 hover:border-cyan-500/50 relative overflow-hidden"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Animated Border Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                
                <div className="relative z-10">
                  <div className="text-5xl mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed mb-4">{feature.description}</p>
                  
                  {/* Feature List */}
                  <ul className="space-y-2 mt-4">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center text-sm text-slate-400 group-hover:text-cyan-300 transition-colors duration-300">
                        <svg className="w-4 h-4 mr-2 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                  
                  <div className={`w-full h-1 bg-gradient-to-r ${feature.gradient} rounded-full mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Overview */}
      <section className="py-20 bg-gradient-to-br from-slate-950 via-blue-950/90 to-indigo-950/80 relative overflow-hidden">
        {/* Background Trading Charts */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-20 right-20 animate-float">
            <svg width="150" height="100">
              {[...Array(8)].map((_, i) => {
                const isGreen = i % 2 === 0;
                const height = 15 + Math.random() * 25;
                return (
                  <rect 
                    key={i}
                    x={i * 18} 
                    y={80 - height} 
                    width="10" 
                    height={height} 
                    fill={isGreen ? "#10b981" : "#ef4444"}
                    className="animate-candle-pulse"
                    style={{animationDelay: `${i * 100}ms`}}
                  />
                );
              })}
            </svg>
          </div>
          
          <div className="absolute top-40 left-20 animate-float delay-1000">
            <svg width="120" height="80">
              <path d="M0,40 Q30,30 60,35 T120,25" stroke="#22d3ee" strokeWidth="2" fill="none" className="animate-dash"/>
              <path d="M0,50 Q30,42 60,45 T120,38" stroke="#3b82f6" strokeWidth="1.5" fill="none" className="animate-dash delay-300"/>
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
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
                level: "Beginner",
                description: "Learn forex trading from scratch with our comprehensive beginner-friendly curriculum covering fundamentals.",
                duration: "3 Month",
                students: "200+",
                rating: "4.8",
                price: "PKR 20,000",
                originalPrice: "PKR 30,000",
                gradient: "from-blue-600 to-indigo-700",
                modules: ["Forex Basics", "Chart Reading", "Technical Analysis", "Risk Management"],
                badge: "Most Popular"
              },
              {
                title: "Advance Course",
                level: "Intermediate",
                description: "Deep dive into technical analysis, risk management, and advanced trading strategies for serious traders.",
                duration: "5 Month",
                students: "180+",
                rating: "4.9",
                price: "PKR 30,000",
                originalPrice: "PKR 45,000",
                gradient: "from-cyan-500 to-blue-600",
                modules: ["Advanced Patterns", "Market Structure", "Trading Psychology", "Live Trading"],
                badge: "Best Value"
              },
              {
                title: "Pro Course",
                level: "Advanced",
                description: "Master-level training with live trading sessions, advanced psychology, and institutional strategies.",
                duration: "8 Month",
                students: "120+",
                rating: "4.9",
                price: "PKR 40,000",
                originalPrice: "PKR 60,000",
                gradient: "from-blue-600 to-indigo-700",
                modules: ["Institutional Trading", "Algorithm Design", "Portfolio Management", "1-on-1 Mentorship"],
                badge: "Premium"
              }
            ].map((course, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 border border-slate-700/50 hover:border-cyan-500/50 relative"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Badge */}
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white text-xs px-3 py-1.5 rounded-full font-bold shadow-lg">
                    {course.badge}
                  </span>
                </div>

                <div className="relative overflow-hidden">
                  <div className={`w-full h-52 bg-gradient-to-br ${course.gradient} flex items-center justify-center relative overflow-hidden`}>
                    {/* Animated Trading Chart in Background */}
                    <svg width="100%" height="100%" className="absolute inset-0 opacity-20">
                      {[...Array(10)].map((_, i) => {
                        const isGreen = i % 2 === 0;
                        const height = 20 + Math.random() * 40;
                        return (
                          <rect 
                            key={i}
                            x={20 + i * 28} 
                            y={120 - height} 
                            width="10" 
                            height={height} 
                            fill={isGreen ? "#10b981" : "#ef4444"}
                            className="animate-candle-pulse"
                            style={{animationDelay: `${i * 150}ms`}}
                          />
                        );
                      })}
                    </svg>
                    
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>
                    <div className="text-7xl opacity-40 relative z-10 group-hover:scale-110 transition-transform duration-500">📊</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                  </div>
                  
                  <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-lg flex items-center">
                    {course.rating} ⭐
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-cyan-400 text-sm font-semibold bg-cyan-500/20 border border-cyan-400/40 px-3 py-1.5 rounded-full">
                      {course.duration}
                    </span>
                    <span className="text-slate-400 text-sm flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                      </svg>
                      {course.students}
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <span className="text-xs text-purple-400 font-semibold bg-purple-500/20 px-2 py-1 rounded">
                      {course.level}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {course.title}
                  </h3>
                  
                  <p className="text-slate-300 mb-4 leading-relaxed text-sm">
                    {course.description}
                  </p>
                  
                  {/* Modules List */}
                  <div className="mb-4 space-y-2">
                    {course.modules.map((module, i) => (
                      <div key={i} className="flex items-center text-xs text-slate-400">
                        <svg className="w-3 h-3 mr-2 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        {module}
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-slate-700/50 pt-4 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-3xl font-bold text-cyan-400">{course.price}</span>
                        <div className="flex flex-col">
                          <span className="text-slate-500 line-through text-xs">{course.originalPrice}</span>
                          <span className="text-emerald-400 text-xs font-semibold">Save 33%</span>
                        </div>
                      </div>
                    </div>
                    
                    <a 
                      href="#" 
                      className="group/btn w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-cyan-500/30"
                    >
                      <span>Enroll Now</span>
                      <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-950 relative overflow-hidden">
        {/* Background Trading Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-40 left-10 animate-float">
            <svg width="100" height="60">
              <path d="M10,30 Q25,20 40,25 T70,15 T100,20" stroke="#22d3ee" strokeWidth="1.5" fill="none" className="animate-dash"/>
            </svg>
          </div>
          
          <div className="absolute bottom-40 right-20 animate-float delay-500">
            <svg width="120" height="70">
              {[...Array(6)].map((_, i) => (
                <rect 
                  key={i}
                  x={i * 18} 
                  y={40 - Math.random() * 20} 
                  width="8" 
                  height={15 + Math.random() * 15} 
                  fill={i % 2 === 0 ? "#10b981" : "#ef4444"}
                  className="animate-candle-pulse"
                  style={{animationDelay: `${i * 100}ms`}}
                />
              ))}
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
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
                content: "Th3 Trad3rs completely changed my understanding of forex. The strategies actually work and the mentors are incredibly supportive!",
                avatar: "SJ",
                gradient: "from-blue-600 to-indigo-700",
                profit: "+$12,450",
                months: "3"
              },
              {
                name: "Michael Chen",
                role: "Investment Analyst",
                content: "Professional, detailed, and practical. Best investment I've made in my trading education. The community is amazing!",
                avatar: "MC",
                gradient: "from-cyan-500 to-blue-600",
                profit: "+$18,200",
                months: "5"
              },
              {
                name: "Emily Rodriguez",
                role: "Day Trader",
                content: "The live sessions are incredible. Learning from real trades made all the difference. Highly recommend to everyone!",
                avatar: "ER",
                gradient: "from-blue-600 to-indigo-700",
                profit: "+$9,800",
                months: "2"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-2 transition-all duration-500 border border-slate-700/50 hover:border-cyan-500/50 relative overflow-hidden"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className={`w-14 h-14 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-bold text-white text-lg">{testimonial.name}</div>
                      <div className="text-slate-400 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  
                  <p className="text-slate-300 italic leading-relaxed mb-4">{testimonial.content}</p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-between mb-3 p-3 bg-slate-800/50 rounded-lg">
                    <div>
                      <div className="text-emerald-400 font-bold text-lg">{testimonial.profit}</div>
                      <div className="text-slate-400 text-xs">Total Profit</div>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 font-bold text-lg">{testimonial.months} months</div>
                      <div className="text-slate-400 text-xs">Learning Period</div>
                    </div>
                  </div>
                  
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Social Proof */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center space-x-8 bg-slate-800/50 backdrop-blur-md rounded-full px-8 py-4 border border-slate-700/50">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">4.9/5</div>
                <div className="text-slate-400 text-xs">Average Rating</div>
              </div>
              <div className="h-8 w-px bg-slate-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">500+</div>
                <div className="text-slate-400 text-xs">Reviews</div>
              </div>
              <div className="h-8 w-px bg-slate-700"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">95%</div>
                <div className="text-slate-400 text-xs">Recommend Us</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-slate-950 via-blue-950/90 to-indigo-950/80 text-white py-24 overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-cyan-500/15 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Mini Trading Chart */}
          <div className="absolute top-20 right-10 opacity-15 animate-float">
            <svg width="100" height="60">
              {[...Array(5)].map((_, i) => (
                <rect 
                  key={i}
                  x={5 + i * 18} 
                  y={30 - Math.random() * 15} 
                  width="6" 
                  height={15 + Math.random() * 20} 
                  fill={i % 2 === 0 ? "#10b981" : "#ef4444"}
                  className="animate-candle-pulse"
                  style={{animationDelay: `${i * 100}ms`}}
                />
              ))}
            </svg>
          </div>
          
          <div className="absolute bottom-20 left-10 opacity-15 animate-float delay-500">
            <svg width="90" height="50">
              <path d="M0,25 Q22,15 45,20 T90,10" stroke="#22d3ee" strokeWidth="2" fill="none" className="animate-dash"/>
            </svg>
          </div>
        </div>

        <div className="container mx-auto text-center px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeInUp leading-tight">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-shift">
                Forex Journey?
              </span>
            </h2>
            
            <p className="mb-10 text-lg md:text-xl text-slate-300 leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Join hundreds of students who have transformed their financial future with our proven trading methods and expert guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp mb-8" style={{ animationDelay: '0.4s' }}>
              <a
                href="#"
                className="group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:shadow-cyan-500/40 transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
              >
                <span>Enroll Now - Limited Spots</span>
                <svg className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>

              <a
                href="#"
                className="group border-2 border-cyan-400/50 text-cyan-300 hover:text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-cyan-500/20 hover:border-cyan-400 backdrop-blur-sm transition-all duration-300 flex items-center space-x-3 shadow-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>Talk to Advisor</span>
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-slate-300 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">3-Day Money Back</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Lifetime Access</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Free Updates</span>
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

        @keyframes candle-pulse {
          0%, 100% { 
            transform: scaleY(1);
            opacity: 1;
          }
          50% {
            transform: scaleY(1.1);
            opacity: 0.8;
          }
        }

        @keyframes volume-pulse {
          0%, 100% { 
            transform: scaleY(1);
            opacity: 0.7;
          }
          50% {
            transform: scaleY(1.2);
            opacity: 1;
          }
        }

        @keyframes dash {
          0% {
            stroke-dashoffset: 1000;
          }
          100% {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
          }
          50% { 
            transform: translateY(-15px) rotate(2deg);
          }
        }
        
        @keyframes slide-right {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        
        @keyframes slide-down {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { 
            background-position: 0% 50%;
            background-size: 200% 200%;
          }
          50% { 
            background-position: 100% 50%;
            background-size: 200% 200%;
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateX(0) scale(1);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scaleY(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scaleY(1);
          }
        }

        @keyframes area-grow {
          from {
            opacity: 0;
            transform: scaleY(0);
          }
          to {
            opacity: 1;
            transform: scaleY(1);
          }
        }

        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(40px, 40px);
          }
        }

        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.05);
          }
        }

        @keyframes particle {
          0% {
            opacity: 0;
            transform: translateY(0) translateX(0) scale(0);
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-100vh) translateX(50px) scale(1);
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-candle-grow {
          transform-origin: bottom;
          animation: candle-grow 2s ease-out forwards;
        }

        .animate-candle-pulse {
          transform-origin: bottom;
          animation: candle-pulse 2s ease-in-out infinite;
        }

        .animate-volume-pulse {
          transform-origin: bottom;
          animation: volume-pulse 3s ease-in-out infinite;
        }
        
        .animate-dash {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 3s ease-out forwards infinite;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-slide-right {
          animation: slide-right 15s linear infinite;
        }
        
        .animate-slide-down {
          animation: slide-down 20s linear infinite;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }

        .animate-slideIn {
          animation: slideIn 0.6s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.7s ease-out;
        }

        .animate-area-grow {
          transform-origin: bottom;
          animation: area-grow 2s ease-out forwards;
        }

        .animate-grid-move {
          animation: grid-move 20s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        .animate-particle {
          animation: particle linear infinite;
        }

        .candle-glow {
          filter: drop-shadow(0 0 3px currentColor);
        }

        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-800 { animation-delay: 800ms; }
        .delay-900 { animation-delay: 900ms; }
        .delay-1000 { animation-delay: 1000ms; }
        .delay-2000 { animation-delay: 2000ms; }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: #0f172a;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #06b6d4, #3b82f6);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #22d3ee, #60a5fa);
        }

        /* Glow effects on hover */
        .group:hover .candle-glow {
          filter: drop-shadow(0 0 8px currentColor);
        }
      `}</style>
    </div>
  );
}