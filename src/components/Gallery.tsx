
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const images = [
  {
    src: "https://images.unsplash.com/photo-1552911669-41c5ecc803ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Batucada en festival",
    caption: "Festival de Verano 2022"
  },
  {
    src: "https://images.unsplash.com/photo-1551854838-212c9a5fde6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Percusionistas en acción",
    caption: "Carnaval Urbano"
  },
  {
    src: "https://images.unsplash.com/photo-1496449065494-95e041d67022?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Batería horizontal",
    caption: "Ensayo General"
  },
  {
    src: "https://images.unsplash.com/photo-1595251298505-73de3d2317e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Tambores tradicionales",
    caption: "Instrumentos Tradicionales"
  },
  {
    src: "https://images.unsplash.com/photo-1658786762873-cafbce11d2df?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Concierto nocturno",
    caption: "Noche de Ritmos"
  },
  {
    src: "https://images.unsplash.com/photo-1545959570-a94066772b63?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    alt: "Grupo completo",
    caption: "El Equipo Completo"
  }
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  
  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };
  
  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'auto';
  };
  
  const navigate = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    
    if (direction === 'prev') {
      setSelectedImage(prev => (prev === 0 ? images.length - 1 : prev - 1));
    } else {
      setSelectedImage(prev => (prev === images.length - 1 ? 0 : prev + 1));
    }
  };
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigate('prev');
      if (e.key === 'ArrowRight') navigate('next');
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);
  
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
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
    <section 
      id="gallery" 
      className="section-container parallax-bg py-24"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url("https://images.unsplash.com/photo-1589829545856-d10d557cf95f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80")',
      }}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="mb-16 text-center scroll-watch">
          <h2 className="section-title mx-auto text-white">Galería</h2>
          <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
            Momentos memorables de nuestros conciertos y eventos que hemos realizado
          </p>
        </div>
        
        <div 
          ref={galleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {images.map((image, index) => (
            <div 
              key={index}
              className="aspect-w-16 aspect-h-12 overflow-hidden rounded-lg scroll-watch opacity-0 transform translate-y-8"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openLightbox(index)}
            >
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105 cursor-pointer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <p className="text-white font-medium">{image.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
          <button 
            className="absolute top-4 right-4 text-white hover:text-batucada-orange transition-colors"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          
          <button 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-batucada-orange transition-colors"
            onClick={() => navigate('prev')}
          >
            <ChevronLeft size={40} />
          </button>
          
          <div className="max-w-4xl max-h-[80vh] relative">
            <img 
              src={images[selectedImage].src} 
              alt={images[selectedImage].alt}
              className="max-w-full max-h-[80vh] object-contain animate-scale-in"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
              <p className="text-white text-center">{images[selectedImage].caption}</p>
            </div>
          </div>
          
          <button 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-batucada-orange transition-colors"
            onClick={() => navigate('next')}
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
