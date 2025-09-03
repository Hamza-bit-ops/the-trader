'use client'

import Link from "next/link";

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white py-24 md:py-32 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* Floating elements */}
          <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-white/30 rounded-full animate-bounce" style={{ animationDelay: '1.2s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-white/25 rounded-full animate-bounce" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto text-center px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8 animate-fadeInUp">
              <span className="text-sm font-medium">🚀 #1 Forex Trading Academy</span>
            </div>

            <h1 className="text-4xl md:text-7xl font-bold mb-6 leading-tight animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Master{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Forex Trading
              </span>{" "}
              with Experts
            </h1>
            
            <p className="text-lg md:text-xl mb-10 text-blue-100 max-w-2xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              Transform your financial future with our comprehensive forex trading courses. 
              Learn from industry experts and join thousands of successful traders.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <Link
                href="/enroll"
                className="group bg-white text-blue-700 px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Start Learning Today</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              
              <Link
                href="/courses"
                className="group border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 flex items-center space-x-2"
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
                <div className="text-3xl font-bold text-yellow-300">10,000+</div>
                <div className="text-blue-100 text-sm">Students Enrolled</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">95%</div>
                <div className="text-blue-100 text-sm">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300">24/7</div>
                <div className="text-blue-100 text-sm">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Why Choose Forex Academy?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We provide everything you need to become a successful forex trader
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "📚",
                title: "Expert-Led Courses",
                description: "Learn from traders with 10+ years of market experience"
              },
              {
                icon: "💡",
                title: "Real-Time Strategies",
                description: "Get access to current market strategies and live trading sessions"
              },
              {
                icon: "📈",
                title: "Proven Results",
                description: "95% of our students see profitable results within 3 months"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-gray-100"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Overview */}
      <section className="py-20 container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Our Popular Courses
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our comprehensive range of forex trading courses designed for every skill level
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              image: "/course1.jpg",
              title: "Beginner Forex Course",
              description: "Learn forex trading from scratch with our comprehensive beginner-friendly curriculum.",
              duration: "8 Weeks",
              students: "2,500+",
              rating: "4.9",
              price: "$99",
              href: "/courses/1"
            },
            {
              image: "/course2.jpg",
              title: "Advanced Strategies",
              description: "Deep dive into technical analysis, risk management, and advanced trading strategies.",
              duration: "12 Weeks",
              students: "1,800+",
              rating: "4.8",
              price: "$199",
              href: "/courses/2"
            },
            {
              image: "/course3.jpg",
              title: "Live Trading Sessions",
              description: "Trade live with experienced mentors and gain real-time market experience.",
              duration: "Ongoing",
              students: "1,200+",
              rating: "4.9",
              price: "$299",
              href: "/courses/3"
            }
          ].map((course, index) => (
            <div 
              key={index}
              className="group bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative overflow-hidden">
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                  <div className="text-6xl opacity-20">📊</div>
                </div>
                <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                  {course.rating} ⭐
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-blue-600 text-sm font-semibold bg-blue-50 px-3 py-1 rounded-full">
                    {course.duration}
                  </span>
                  <span className="text-gray-500 text-sm">{course.students} students</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                  {course.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {course.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-blue-600">{course.price}</span>
                    <span className="text-gray-400 line-through text-sm">$399</span>
                  </div>
                  
                  <Link 
                    href={course.href} 
                    className="group/btn bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-2.5 rounded-full font-medium transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
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
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              What Our Students Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Johnson",
                role: "Full-time Trader",
                content: "This academy completely changed my understanding of forex. The strategies actually work!",
                avatar: "SJ"
              },
              {
                name: "Michael Chen",
                role: "Investment Analyst",
                content: "Professional, detailed, and practical. Best investment I've made in my trading education.",
                avatar: "MC"
              },
              {
                name: "Emily Rodriguez",
                role: "Day Trader",
                content: "The live sessions are incredible. Learning from real trades made all the difference.",
                avatar: "ER"
              }
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                style={{ animationDelay: `${index * 300}ms` }}
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">{testimonial.content}</p>
                <div className="flex text-yellow-400 mt-3">
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
      <section className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 overflow-hidden">
        {/* Background animation */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-white/5 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container mx-auto text-center px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 animate-fadeInUp">
              Ready to Start Your{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                Forex Journey?
              </span>
            </h2>
            
            <p className="mb-8 text-lg md:text-xl text-blue-100 leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Join thousands of students who have transformed their financial future with our proven trading methods and expert guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Link
                href="/enroll"
                className="group bg-white text-blue-700 px-8 py-4 rounded-full font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
              >
                <span>Enroll Now - Limited Spots</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <div className="flex items-center space-x-4 text-blue-100">
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">30-Day Money Back</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Lifetime Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}