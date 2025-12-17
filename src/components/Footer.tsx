import canjeaLogo from "@/assets/canjea_logo.jpeg";
import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contacto" className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src={canjeaLogo} 
                alt="Canjea Logo" 
                className="h-10 w-10 rounded-lg object-cover"
              />
              <span className="text-xl font-bold font-['Plus_Jakarta_Sans']">
                Canjea
              </span>
            </div>
            <p className="text-background/70 max-w-sm mb-6">
              Solución rápida, segura y accesible para quienes necesitan liquidez 
              inmediata sin garantes, usando sus bienes como respaldo temporal.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-3 text-background/70">
              <li>
                <a href="#como-funciona" className="hover:text-background transition-colors">
                  Cómo funciona
                </a>
              </li>
              <li>
                <a href="#beneficios" className="hover:text-background transition-colors">
                  Beneficios
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Términos y condiciones
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-background transition-colors">
                  Política de privacidad
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contacto</h4>
            <ul className="space-y-3 text-background/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                canjeaecuador@outlook.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                096 386 2520
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Cuenca, Azuay
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/10 pt-8 text-center text-background/50 text-sm">
          <p>© {new Date().getFullYear()} Canjea. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
