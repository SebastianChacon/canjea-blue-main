import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Clock, Banknote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";
import ScrollAnimator from "./ui/ScrollAnimator";
import { useRef } from "react";
import useParallax from "@/hooks/useParallax";

const HeroSection = () => {
  const navigate = useNavigate();
  const parallaxRef = useRef<HTMLDivElement>(null);
  useParallax(parallaxRef);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        ref={parallaxRef}
        className="absolute inset-[-40px] z-0 gradient-hero transition-transform duration-300 ease-out"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundBlendMode: 'multiply',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
       <div className="absolute inset-0 z-0 bg-background opacity-70" />

      <div className="container mx-auto px-4 z-10 relative">
        <div className="max-w-4xl mx-auto text-center">
          <ScrollAnimator>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-2 text-accent-2-foreground text-sm font-medium mb-6">
              <Shield className="h-4 w-4" />
              Sin garantes • Sin trámites extensos
            </div>
          </ScrollAnimator>

          <ScrollAnimator animationClassName="animate-fade-in-up [animation-delay:100ms]">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Dinero inmediato,{" "}
              <span className="text-primary">sin garantes ni papeleos</span>
            </h1>
          </ScrollAnimator>

          <ScrollAnimator animationClassName="animate-fade-in-up [animation-delay:200ms]">
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Obtén liquidez al instante Canjeando tus bienes como respaldo temporal.
            </p>
          </ScrollAnimator>

          <ScrollAnimator animationClassName="animate-fade-in-up [animation-delay:300ms]">
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" className="gap-2 text-base px-8 transition-transform hover:scale-105" asChild>
                <a href="#solicitar">
                  Solicitar
                  <ArrowRight className="h-5 w-5" />
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 transition-transform hover:scale-105">
                Ver cómo funciona
              </Button>
            </div>
          </ScrollAnimator>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <ScrollAnimator animationClassName="animate-fade-in-up [animation-delay:400ms]">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                  <Clock onClick={() => navigate('/solicitudes')} className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">
                    Aprobación rápida
                  </p>
                  <p className="text-sm text-muted-foreground">En minutos</p>
                </div>
              </div>
            </ScrollAnimator>

            <ScrollAnimator animationClassName="animate-fade-in-up [animation-delay:500ms]">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">100% Seguro</p>
                  <p className="text-sm text-muted-foreground">
                    Custodia garantizada
                  </p>
                </div>
              </div>
            </ScrollAnimator>

            <ScrollAnimator animationClassName="animate-fade-in-up [animation-delay:600ms]">
              <div className="flex items-center gap-3 justify-center md:justify-start">
                <div className="h-12 w-12 rounded-full bg-secondary flex items-center justify-center">
                  <Banknote className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Hasta 60%</p>
                  <p className="text-sm text-muted-foreground">
                    Del valor del artículo
                  </p>
                </div>
              </div>
            </ScrollAnimator>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
