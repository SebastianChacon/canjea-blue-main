import { Smartphone, Watch, Laptop, Camera, Gem, Car } from "lucide-react";
import ScrollAnimator from "./ui/ScrollAnimator";

const items = [
  { icon: Smartphone, name: "Celulares" },
  { icon: Watch, name: "Relojes" },
  { icon: Laptop, name: "Laptops" },
  { icon: Camera, name: "Cámaras" },
  { icon: Gem, name: "Joyas" },
  { icon: Car, name: "Vehículos" },
];

const AcceptedItems = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <ScrollAnimator>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Artículos aceptados
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Aceptamos una amplia variedad de artículos de valor
            </p>
          </div>
        </ScrollAnimator>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((item, index) => (
            <ScrollAnimator
              key={index}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className="bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-soft hover:-translate-y-2 transition-all duration-300 text-center group cursor-pointer"
              >
                <div className="h-16 w-16 rounded-full bg-accent-2/10 mx-auto mb-4 flex items-center justify-center group-hover:bg-accent-2 transition-colors duration-300">
                  <item.icon className="h-8 w-8 text-accent-2 group-hover:text-accent-2-foreground transition-all duration-300 group-hover:scale-125" />
                </div>
                <p className="font-medium text-foreground">{item.name}</p>
              </div>
            </ScrollAnimator>
          ))}
        </div>

        <ScrollAnimator style={{ animationDelay: `${items.length * 100}ms` }}>
          <p className="text-center text-muted-foreground mt-8">
            ¿Tienes otro artículo? <span className="text-primary font-medium cursor-pointer hover:underline">Contáctanos</span> para evaluarlo
          </p>
        </ScrollAnimator>
      </div>
    </section>
  );
};

export default AcceptedItems;
