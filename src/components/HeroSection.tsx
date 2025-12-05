import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Banknote } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-28 pb-20 gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium mb-6">
            <Shield className="h-4 w-4" />
            Sin garantes • Sin trámites extensos
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            Préstamos inmediatos con{" "}
            <span className="text-primary">garantía en artículos</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Obtén liquidez al instante usando tus bienes como respaldo temporal. 
            Proceso rápido, seguro y 100% digital.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="gap-2 text-base px-8" asChild>
              <Link to="/solicitar">
                Solicitar préstamo
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8">
              Ver cómo funciona
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Aprobación rápida</p>
                <p className="text-sm text-muted-foreground">En minutos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">100% Seguro</p>
                <p className="text-sm text-muted-foreground">Custodia garantizada</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                <Banknote className="h-6 w-6 text-primary" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground">Hasta 60%</p>
                <p className="text-sm text-muted-foreground">Del valor del artículo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
