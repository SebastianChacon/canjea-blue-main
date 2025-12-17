import { Camera, CheckCircle, Wallet, Package } from "lucide-react";
import ScrollAnimator from "./ui/ScrollAnimator";

const steps = [
  {
    icon: Camera,
    step: "01",
    title: "Sube tu artículo",
    description:
      "Toma fotos y describe tu artículo en garantía. Registro rápido con cédula y selfie.",
  },
  {
    icon: CheckCircle,
    step: "02",
    title: "Evaluación y aprobación",
    description:
      "Evaluamos tu artículo y definimos el monto máximo del préstamo (hasta 60% del valor).",
  },
  {
    icon: Wallet,
    step: "03",
    title: "Acepta y recibe tu dinero",
    description:
      "Si acepta la oferta, entrega el bien y reviras el dinero de inmediato de forma segura.",
  },
  {
    icon: Package,
    step: "04",
    title: "Recupera tu artículo",
    description:
      "Retorna el capital recibido, recibe tu bien.",
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <ScrollAnimator>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Si aceptas la oferta, entregas el objeto y recibes la transferencia inmediata.
            </p>
          </div>
        </ScrollAnimator>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <ScrollAnimator
              key={index}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative group h-full">
                <div className="bg-card rounded-2xl p-6 shadow-card border border-border group-hover:border-primary/30 group-hover:scale-105 transition-all duration-300 h-full">
                  <div className="text-accent-2/10 text-6xl font-bold absolute top-4 right-6 group-hover:text-accent-2/20 transition-all duration-300 group-hover:-translate-x-2">
                    {item.step}
                  </div>
                  <div className="h-14 w-14 rounded-xl bg-accent-2 flex items-center justify-center mb-5 transition-transform group-hover:-translate-y-1">
                    <item.icon className="h-7 w-7 text-accent-2-foreground transition-transform group-hover:scale-110 group-hover:rotate-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
