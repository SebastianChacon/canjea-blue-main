import { Camera, CheckCircle, Wallet, Package } from "lucide-react";

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
    title: "Recibe tu dinero",
    description:
      "Aprobación inmediata y transferencia directa a tu cuenta o billetera digital.",
  },
  {
    icon: Package,
    step: "04",
    title: "Recupera tu artículo",
    description:
      "Paga el préstamo + almacenamiento del articulo.",
  },
];

const HowItWorks = () => {
  return (
    <section id="como-funciona" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            si acepta la oferta, entrega el objeto. y recibes la transferencia
            inmediata{" "}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((item, index) => (
            <div key={index} className="relative group">
              <div className="bg-card rounded-2xl p-6 shadow-card border border-border hover:border-primary/30 transition-all duration-300 h-full">
                <div className="text-primary/20 text-6xl font-bold absolute top-4 right-4">
                  {item.step}
                </div>
                <div className="h-14 w-14 rounded-xl bg-primary flex items-center justify-center mb-5">
                  <item.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
