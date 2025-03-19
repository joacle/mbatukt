
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowDown } from 'lucide-react';
import heroBackground from '@/images/hero-background.jpg';

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    // Initial animations
    setTimeout(() => {
      if (titleRef.current) titleRef.current.classList.add('animate-fade-in');
    }, 300);
    
    setTimeout(() => {
      if (subtitleRef.current) subtitleRef.current.classList.add('animate-fade-in');
    }, 600);
    
    setTimeout(() => {
      if (buttonRef.current) buttonRef.current.classList.add('animate-fade-in');
    }, 900);
    
    // Parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const xPos = (window.innerWidth / 2 - e.clientX) / 30;
      const yPos = (window.innerHeight / 2 - e.clientY) / 30;
      
      heroRef.current.style.backgroundPosition = `calc(50% + ${xPos}px) calc(50% + ${yPos}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center text-center py-20 px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="glass-card bg-opacity-40 p-8 md:p-12">
          <h1 
            ref={titleRef}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white opacity-0"
          >
            Mbatuk't
          </h1>
          <p 
            ref={subtitleRef}
            className="text-xl md:text-2xl text-white mb-8 opacity-0"
          >
            Ritmo, pasión y energía que transforma cualquier evento
          </p>
          <a 
            ref={buttonRef}
            href="#contact" 
            className="inline-block btn-primary text-lg opacity-0"
          >
            Contáctanos
          </a>
        </div>
      </div>
      
      <a 
        href="#about" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white animate-float"
        aria-label="Scroll down"
      >
        <ArrowDown size={32} />
      </a>
      
      {/* Decorative circles */}
      <div className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-batucada-green opacity-20 mix-blend-overlay animate-pulse-subtle"></div>
      <div className="absolute bottom-[30%] right-[15%] w-40 h-40 rounded-full bg-batucada-purple opacity-20 mix-blend-overlay animate-pulse-subtle" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-[40%] right-[20%] w-24 h-24 rounded-full bg-batucada-green opacity-20 mix-blend-overlay animate-pulse-subtle" style={{ animationDelay: '1.5s' }}></div>
    </section>
  );
};

export default Hero;
