
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

interface NavLink {
  id: string;
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { id: 'home', label: 'Inicio', href: '#hero' },
  { id: 'about', label: 'Sobre Nosotros', href: '#about' },
  { id: 'gallery', label: 'Galería', href: '#gallery' },
  { id: 'contact', label: 'Contacto', href: '#contact' }
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
      
      // Detect which section is in view
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.pageYOffset;
      
      sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300 py-4 px-4 md:px-8",
        isScrolled ? "bg-white bg-opacity-90 backdrop-blur-md shadow-md py-3" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="#hero" className="flex items-center">
          <div className={cn(
            "text-2xl font-display font-bold transition-colors duration-300",
            isScrolled ? "text-batucada-orange" : "text-batucada-dark"
          )}>
            Batucada Vibrante
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={cn(
                "nav-link",
                activeSection === link.id && "active"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-batucada-dark hover:text-batucada-orange transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        className={cn(
          "fixed inset-0 z-40 bg-white bg-opacity-95 backdrop-blur-sm md:hidden flex flex-col justify-center items-center space-y-8 transition-all duration-300 transform",
          mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            className="text-2xl font-medium text-batucada-dark hover:text-batucada-orange transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            {link.label}
          </a>
        ))}
      </div>
    </header>
  );
};

export default Navbar;
