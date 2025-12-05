import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import AcceptedItems from "@/components/AcceptedItems";
import Footer from "@/components/Footer";
import LoanRequest from "./LoanRequest";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <HowItWorks />
        <Benefits />
        <LoanRequest />
        <AcceptedItems />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
