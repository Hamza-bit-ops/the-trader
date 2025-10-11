'use client'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export default function CoursesPage() {
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
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#22d3ee" strokeWidth="0.5" />
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
              <line x1="0" y1="25" x2="220" y2="25" stroke="#1e293b" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2" />
              <line x1="0" y1="55" x2="220" y2="55" stroke="#1e293b" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2" />
              <line x1="0" y1="85" x2="220" y2="85" stroke="#1e293b" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2" />

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
                  <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
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
                  style={{ animationDelay: `${i * 80}ms` }}
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
              <line x1="0" y1="15" x2="190" y2="15" stroke="#ef4444" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2" />
              <line x1="0" y1="42" x2="190" y2="42" stroke="#1e293b" strokeWidth="0.5" opacity="0.5" />
              <line x1="0" y1="70" x2="190" y2="70" stroke="#10b981" strokeWidth="0.5" opacity="0.4" strokeDasharray="2,2" />

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

        <div className="container mx-auto text-center px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-gradient-to-r from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/40 rounded-full px-5 py-2.5 mb-8 animate-fadeInUp shadow-lg">
              <span className="text-sm font-medium text-cyan-300">📚 Professional Trading Courses</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Transform Your{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent animate-gradient-shift">
                Trading Skills
              </span>
            </h1>

            <p className="text-lg md:text-xl mb-10 text-slate-300 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              Choose from our comprehensive range of forex trading courses designed for every skill level.
              From basics to advanced strategies, we have everything you need to succeed.
            </p>

            <div className="flex flex-wrap justify-center gap-12 mt-16 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">500+</div>
                <div className="text-slate-300 text-sm mt-1">Happy Students</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">3</div>
                <div className="text-slate-300 text-sm mt-1">Course Levels</div>
              </div>
              <div className="text-center group cursor-pointer">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">95%</div>
                <div className="text-slate-300 text-sm mt-1">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
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
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </svg>
          </div>

          <div className="absolute bottom-20 right-1/4 animate-float delay-500">
            <svg width="120" height="60">
              <path d="M0,30 Q30,20 60,25 T120,15" stroke="#22d3ee" strokeWidth="2" fill="none" className="animate-dash" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
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
                gradient: "from-blue-600 to-indigo-700",
                popular: false
              }
            ].map((course, index) => (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl shadow-lg rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/20 transform hover:-translate-y-3 transition-all duration-500 border ${course.popular ? 'border-cyan-400/50' : 'border-slate-700/50'}`}
              >
                {course.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs px-4 py-2 rounded-full font-bold shadow-lg animate-pulse">
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/20 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>

                <div className="relative overflow-hidden">
                  <div className={`w-full h-48 bg-gradient-to-br ${course.gradient} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent"></div>

                    <div className="relative z-10 text-center">
                      <div className="text-5xl mb-2 opacity-90">📈</div>
                      <div className="text-white/80 text-sm font-semibold">{course.subtitle}</div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-800/80 to-transparent"></div>
                  </div>

                  <div className="absolute top-4 right-4 bg-emerald-500 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                    {course.rating} ⭐
                  </div>
                </div>

                <div className="p-8 relative z-10">
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
                      href="/student-application"
                      className="group/btn bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-6 py-3 rounded-full font-medium transform hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-cyan-500/25"
                    >
                      <span>Enroll Now</span>
                      <svg
                        className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </div>

                  <div className={`w-full h-1 bg-gradient-to-r ${course.gradient} rounded-full mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                </div>
              </div>
            ))}
          </div>

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
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </div>
  );
}