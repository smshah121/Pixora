import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Discover your next",
    highlight: "creative idea",
    subtitle: "Explore millions of inspiring images, videos, and more",
    main: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
    card1: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80",
    card2: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    trending: ["Fashion", "Interior Design", "Art"]
  },
  {
    title: "Turn ideas into",
    highlight: "reality",
    subtitle: "Save and organize everything that inspires you",
    main: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80",
    card1: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&q=80",
    card2: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80",
    trending: ["Travel", "Food", "DIY Projects"]
  },
  {
    title: "Get inspired by",
    highlight: "what's trending",
    subtitle: "Join millions discovering new possibilities every day",
    main: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&q=80",
    card1: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=400&q=80",
    card2: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=400&q=80",
    trending: ["Photography", "Design", "Lifestyle"]
  }
];

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="w-full min-h-screen bg-white relative overflow-hidden">
      
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#e60023]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#e60023]/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-50/30 rounded-full blur-3xl"></div>
      </div>

      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false
        }}
        pagination={{
          clickable: true,
          el: '.custom-pagination',
          renderBullet: (index, className) =>
            `<span class="${className} !w-12 !h-1 !bg-red-200 hover:!bg-[#e60023] transition-all duration-300 !rounded-full inline-block mx-1.5"></span>`
        }}
        className="h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="max-w-7xl mx-auto h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-20">

              {/* LEFT CONTENT */}
              <div className="max-w-2xl space-y-8 z-10">
                
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 rounded-full shadow-sm">
                  <span className="text-xl">✨</span>
                  <span className="text-sm font-semibold text-[#e60023]">
                    Trending Now
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-5xl md:text-7xl font-bold leading-tight text-[#111]">
                  {slide.title}
                  <br />
                  <span className="text-[#e60023] relative inline-block">
                    {slide.highlight}
                    <svg 
                      className="absolute -bottom-2 left-0 w-full" 
                      height="12" 
                      viewBox="0 0 200 12" 
                      fill="none"
                    >
                      <path 
                        d="M2 10C60 4 140 4 198 10" 
                        stroke="#e60023" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                        opacity="0.3"
                      />
                    </svg>
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl text-[#333] max-w-xl leading-relaxed">
                  {slide.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className="flex items-center gap-4 flex-wrap">
                  <button 
                    onClick={() => navigate('/signup')}
                    className="px-8 py-4 bg-[#e60023] text-white rounded-full font-semibold text-lg hover:bg-[#d01f1f] transition-all shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    Get Started Free
                  </button>
                  <button 
                    onClick={() => navigate('/explore')}
                    className="px-8 py-4 bg-white border-2 border-red-100 text-[#e60023] rounded-full font-semibold text-lg hover:border-[#e60023] hover:bg-red-50 transition-all"
                  >
                    Explore Now
                  </button>
                </div>

                {/* Trending Topics */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xl">📈</span>
                  <span className="text-sm text-[#555] font-medium">Popular:</span>
                  {slide.trending.map((topic, idx) => (
                    <button 
                      key={idx}
                      onClick={() => navigate('/explore')}
                      className="px-4 py-2 bg-white border border-red-100 rounded-full text-sm text-[#333] hover:border-[#e60023] hover:text-[#e60023] hover:bg-red-50 transition-all font-medium"
                    >
                      {topic}
                    </button>
                  ))}
                </div>

                {/* Custom Pagination */}
                <div className="custom-pagination flex items-center gap-2 pt-4"></div>

              
              </div>

              {/* RIGHT IMAGES - Enhanced Layout */}
              <div className="relative hidden lg:block w-[500px] h-[600px]">
                
                {/* Background Decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-transparent rounded-[50px] -z-10 transform rotate-6"></div>
                
                {/* Main Image */}
                <div className="absolute top-0 left-0 w-[320px] h-[420px] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 border-4 border-white">
                  <img
                    src={slide.main}
                    alt="Main inspiration"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <span className="text-[#e60023] text-xl">❤️</span>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <span className="text-xs font-semibold text-[#111]">Save</span>
                    </div>
                  </div>
                </div>

                {/* Card 1 - Top Right */}
                <div className="absolute top-10 right-0 w-[200px] h-[260px] rounded-2xl overflow-hidden shadow-xl transform rotate-6 hover:rotate-3 transition-transform duration-500 border-4 border-white">
                  <img
                    src={slide.card1}
                    alt="Inspiration 1"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-3 right-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-[#e60023] text-lg">+</span>
                    </div>
                  </div>
                </div>

                {/* Card 2 - Bottom Right */}
                <div className="absolute bottom-0 right-12 w-[220px] h-[280px] rounded-2xl overflow-hidden shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-500 border-4 border-white">
                  <img
                    src={slide.card2}
                    alt="Inspiration 2"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  <div className="absolute top-4 right-4">
                    <div className="w-8 h-8 bg-[#e60023] rounded-full flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-bold">📌</span>
                    </div>
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute bottom-20 left-10 bg-white px-4 py-3 rounded-2xl shadow-xl border-2 border-red-50 animate-bounce-slow">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#e60023] rounded-full animate-pulse"></div>
                    <span className="text-sm font-semibold text-[#111]">1M+ ideas saved today</span>
                  </div>
                </div>

                {/* New User Badge */}
                <div className="absolute top-32 -left-8 bg-[#e60023] text-white px-4 py-2 rounded-full shadow-lg transform -rotate-12">
                  <span className="text-xs font-bold">🔥 HOT</span>
                </div>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-red-50/50 to-transparent pointer-events-none"></div>
      
     
      
    </section>
  );
}