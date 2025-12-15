import { 
  UserCheck, 
  Zap, 
  Lock, 
  CreditCard, 
  Star, 
  FileCheck 
} from "lucide-react";
import ScrollAnimator from "./ui/ScrollAnimator";

const benefits = [
  {
    icon: UserCheck,
    title: "Sin garantes",
    description: "No necesitas que nadie responda por ti. Tu artículo es tu garantía.",
  },
  {
    icon: Zap,
    title: "Proceso rápido",
    description: "Aprobación en minutos, sin trámites extensos ni papeleos.",
  },
  {
    icon: Lock,
    title: "Custodia segura",
    description: "Tus artículos protegidos en puntos autorizados con seguro.",
  },
  {
    icon: CreditCard,
    title: "Pago flexible",
    description: "Transferencia a tu cuenta bancaria o billetera digital preferida.",
  },
  {
    icon: Star,
    title: "Historial de reputación",
    description: "Construye tu historial y accede a mejores condiciones.",
  },
  {
    icon: FileCheck,
    title: "Contrato digital",
    description: "Todo legal y transparente con contrato de garantía temporal.",
  },
];

const Benefits = () => {
  return (
    <section id="beneficios" className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <ScrollAnimator>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              ¿Por qué elegir Canjea?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              La forma más rápida y segura de obtener liquidez inmediata
            </p>
          </div>
        </ScrollAnimator>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <ScrollAnimator
              key={index}
              animationClassName={`animate-fade-in-up`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className="bg-card rounded-2xl p-6 h-full border border-border hover:shadow-card hover:scale-105 transition-all duration-300 group"
              >
                <div className="h-12 w-12 rounded-xl bg-accent-2/10 flex items-center justify-center mb-4 transition-colors group-hover:bg-accent-2/20">
                  <benefit.icon className="h-6 w-6 text-accent-2 transition-transform group-hover:scale-110" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            </ScrollAnimator>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
