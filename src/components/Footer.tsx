
import { cn } from '@/lib/utils';
import { ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-batucada-dark text-white py-12">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-display font-bold">Mbatuk't</h2>
            <p className="text-gray-400 mt-2">Ritmo, pasión y energía</p>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="w-12 h-12 rounded-full bg-batucada-green flex items-center justify-center hover:bg-white hover:text-batucada-green transition-colors"
            aria-label="Volver arriba"
          >
            <ArrowUp size={24} />
          </button>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Mbatuk't. Todos los derechos reservados.
          </p>
          
          <nav className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Política de Privacidad</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Términos y Condiciones</a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Aviso Legal</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
