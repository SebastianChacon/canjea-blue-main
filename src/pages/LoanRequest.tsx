import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LoanRequestForm from "@/components/LoanRequestForm";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const LoanRequest = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-28 pb-16">
        <div className="container mx-auto px-4">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Volver al inicio
          </Link>
          
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Solicitar préstamo
              </h1>
              <p className="text-muted-foreground text-lg">
                Completa el formulario con tus datos y la información del artículo 
                que deseas usar como garantía.
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-2xl p-6 md:p-10 shadow-lg">
              <LoanRequestForm />
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoanRequest;
