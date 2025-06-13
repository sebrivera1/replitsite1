import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import PortfolioOverview from "@/components/portfolio-overview";
import CauseBrowser from "@/components/cause-browser";
import InvestmentSummary from "@/components/investment-summary";
import ImpactMetrics from "@/components/impact-metrics";
import Footer from "@/components/footer";
import { useState } from "react";
import { PendingInvestment } from "@/lib/types";

export default function Home() {
  const [pendingInvestments, setPendingInvestments] = useState<PendingInvestment[]>([]);
  
  const handleAddInvestment = (investment: PendingInvestment) => {
    setPendingInvestments(prev => {
      const existing = prev.find(p => p.causeId === investment.causeId);
      if (existing) {
        return prev.map(p => p.causeId === investment.causeId 
          ? { ...p, amount: p.amount + investment.amount }
          : p
        );
      }
      return [...prev, investment];
    });
  };

  const handleClearPending = () => {
    setPendingInvestments([]);
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <HeroSection />
      <PortfolioOverview />
      <CauseBrowser onAddInvestment={handleAddInvestment} />
      <InvestmentSummary 
        pendingInvestments={pendingInvestments} 
        onClearPending={handleClearPending}
      />
      <ImpactMetrics />
      <Footer />
    </div>
  );
}
