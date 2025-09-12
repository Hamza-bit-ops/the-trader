'use client'
import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  Globe, 
  Shield, 
  BookOpen,
  BarChart3,
  Award,
  Clock,
  LineChart,
  DollarSign,
  Activity,
  PieChart
} from 'lucide-react';

const ForexAboutUs = () => {
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

  // Trading chart SVG paths for animation
  const chartPaths = [
    "M0,100 Q25,80 50,75 T100,60 T150,45 T200,40",
    "M0,120 Q25,110 50,95 T100,85 T150,70 T200,65",
    "M0,80 Q25,85 50,90 T100,95 T150,85 T200,80"
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950/90 to-indigo-950/80">
      {/* Advanced Trading Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Chart Elements */}
        <div className="absolute top-20 left-10 opacity-20">
          <svg width="200" height="120" className="animate-pulse">
            <path 
              d={chartPaths[0]} 
              stroke="url(#gradient1)" 
              strokeWidth="2" 
              fill="none"
              className="animate-dash"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00f5ff" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.4" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute top-40 right-20 opacity-15">
          <svg width="180" height="100" className="animate-pulse delay-1000">
            <path 
              d={chartPaths[1]} 
              stroke="url(#gradient2)" 
              strokeWidth="2" 
              fill="none"
              className="animate-dash"
            />
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.3" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute bottom-40 left-20 opacity-20">
          <svg width="160" height="80" className="animate-pulse delay-500">
            <path 
              d={chartPaths[2]} 
              stroke="url(#gradient3)" 
              strokeWidth="2" 
              fill="none"
              className="animate-dash"
            />
            <defs>
              <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
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

        {/* Floating Trading Icons */}
        <div className="absolute top-60 left-32 text-cyan-400/20 animate-spin-slow">
          <PieChart size={40} />
        </div>
        
        <div className="absolute bottom-60 right-40 text-blue-400/20 animate-bounce-slow">
          <LineChart size={35} />
        </div>

        <div className="absolute top-96 right-16 text-cyan-300/20 animate-pulse">
          <Activity size={30} />
        </div>

        <div className="absolute bottom-96 left-40 text-blue-300/20 animate-spin-slow">
          <DollarSign size={32} />
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

      <div className="relative z-10">
        {/* Header Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-cyan-400/20 to-blue-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-full px-6 py-2 text-sm font-medium text-cyan-300">
                Professional Trading Education
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              About{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 animate-gradient">
                  Th3 Trad3rs Academy
                </span>
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400/50 to-blue-500/50 rounded-full animate-pulse"></div>
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
              Empowering traders worldwide with knowledge, strategy, and confidence since 2018. 
              Transform your trading potential with our comprehensive educational programs.
            </p>
          </div>

          {/* Enhanced Stats Section */}
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
            <div className="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-700/50">
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

          {/* Enhanced Features Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Why Choose Us
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                Discover what makes our academy the premier choice for serious traders
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="group relative bg-gradient-to-br from-slate-800/40 to-slate-900/40 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-slate-700/50 hover:border-cyan-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/15 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 to-blue-500/8 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative z-10">
                    <div className="text-cyan-400 mb-6 group-hover:scale-110 group-hover:text-cyan-300 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-4 text-white group-hover:text-cyan-100 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 rounded-3xl blur-2xl"></div>
            <div className="relative bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-xl rounded-3xl p-8 sm:p-12 lg:p-16 text-center border border-slate-700/50">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Ready to Begin Your Trading Journey?
              </h2>
              <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
                Join our community of successful traders and transform your approach to Forex trading with proven strategies and expert guidance
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold py-4 px-8 sm:px-10 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/50 text-lg">
                  <span className="relative z-10">Start Learning Today</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                <button className="group relative bg-transparent border-2 border-cyan-400/50 hover:border-cyan-400 text-cyan-300 hover:text-white font-bold py-4 px-8 sm:px-10 rounded-2xl transition-all duration-300 text-lg hover:bg-cyan-400/10">
                  View Courses
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
        
        .animate-dash {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 8s linear infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
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
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        `}
        </style>
    </div>
  );
};

export default ForexAboutUs;