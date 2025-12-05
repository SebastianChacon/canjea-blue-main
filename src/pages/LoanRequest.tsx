import LoanRequestForm from "@/components/LoanRequestForm";

const LoanRequest = () => {
  return (

      <section id="solicitar" className="flex-1 py-20">
        <div className="container mx-auto px-4">

          <div className="max-w-5xl mx-auto">
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
      </section>
  );
};

export default LoanRequest;
