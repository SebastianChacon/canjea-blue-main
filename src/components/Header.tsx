import canjeaLogo from "@/assets/canjea_logo.jpeg";
import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const openWhatsApp = () => {
    const phone = "593960800211";
    const text = encodeURIComponent("Hola!");
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/">
          <div className="flex items-center gap-3">
            <img
              src={canjeaLogo}
              alt="Canjea Logo"
              className="h-8 w-8 rounded-lg object-cover"
            />
            <span className="text-lg font-bold font-['Plus_Jakarta_Sans']">
              Canjea
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#como-funciona"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Cómo funciona hola
          </a>
          <a
            href="#beneficios"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Beneficios
          </a>
          <a
            href="#contacto"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Contacto
          </a>
        </nav>

        <Button className="gap-2" onClick={openWhatsApp}>
          <Phone className="h-4 w-4" />
          Contáctanos
        </Button>
      </div>
    </header>
  );
};

export default Header;
