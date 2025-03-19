
import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Users, Music, Calendar, Award } from 'lucide-react';
import aboutUs from '@/images/about-us.jpg';

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => (
  <div className="glass-card scroll-watch">
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 text-batucada-green">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const features = [
  {
    icon: <Users size={36} />,
    title: "Músicos Apasionados",
    description: "Un grupo de 20 percusionistas con amplia experiencia y pasión por el ritmo."
  },
  {
    icon: <Music size={36} />,
    title: "Ritmos Originales",
    description: "Fusión única de ritmos brasileños, africanos y contemporáneos."
  },
  {
    icon: <Calendar size={36} />,
    title: "Eventos Personalizados",
    description: "Adaptamos nuestro show a todo tipo de eventos, desde festivales hasta bodas."
  },
  {
    icon: <Award size={36} />,
    title: "Reconocimiento",
    description: "15 años de experiencia y reconocimiento en la escena cultural."
  }
];

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target.classList.contains('scroll-watch')) {
            entry.target.classList.add('active');
          }
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    const elements = document.querySelectorAll('.scroll-watch');
    elements.forEach(el => observer.observe(el));
    
    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-container bg-white py-24">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center scroll-watch">
          <h2 className="section-title mx-auto">Sobre Nosotros</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Somos un grupo de percusión que transmite energía y pasión a través de nuestros ritmos vibrantes. Nacimos de un amor compartido por la música y la cultura.
          </p>
        </div>
        
        <div className="relative mb-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="scroll-watch">
              <h3 className="text-3xl font-semibold mb-4">Nuestra Historia</h3>
              <p className="text-gray-600 mb-4">
                Nacimos en 2008 como un pequeño grupo de amigos unidos por la pasión de los ritmos afro-brasileños. Con el tiempo, nos hemos convertido en una referencia en la escena cultural de nuestra ciudad.
              </p>
              <p className="text-gray-600">
                Nuestro objetivo es transmitir la energía y alegría del ritmo, creando experiencias memorables para nuestro público. Cada presentación es única, combinando precisión técnica con una desbordante energía.
              </p>
            </div>
            <div className="relative h-80 md:h-96 overflow-hidden rounded-xl scroll-watch">
              <img 
                src={aboutUs}
                alt="Batucada en acción" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Feature 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
