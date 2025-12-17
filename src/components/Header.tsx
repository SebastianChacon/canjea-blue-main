import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone } from "lucide-react";
import canjeaLogo from "@/assets/canjea_logo.jpeg";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openWhatsApp = () => {
    const phone = "593960800211";
    const text = encodeURIComponent("Hola!");
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  const navLinks = [
    { href: "#como-funciona", label: "Cómo funciona" },
    { href: "#beneficios", label: "Beneficios" },
    { href: "#contacto", label: "Contacto" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-sm border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
          <img
            src={canjeaLogo}
            alt="Canjea Logo"
            className="h-8 w-8 rounded-lg object-cover"
          />
          <span className="text-lg font-bold">
            Canjea
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
        
        <div className="hidden md:flex">
            <Button className="gap-2 bg-green-600 hover:bg-green-700 transition-colors" onClick={openWhatsApp}>
                <Phone className="h-4 w-4" />
                Whatsapp
            </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`absolute top-16 left-0 w-full bg-background shadow-lg md:hidden transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "transform translate-y-0" : "transform -translate-y-[150%]"
        }`}
      >
        <nav className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-lg font-medium text-muted-foreground hover:text-primary"
              onClick={() => setIsMenuOpen(false)} // Close menu on link click
            >
              {link.label}
            </a>
          ))}
          <Button className="gap-2 bg-green-600 hover:bg-green-700 transition-colors" onClick={openWhatsApp}>
            <Phone className="h-4 w-4" />
            Whatsapp
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
