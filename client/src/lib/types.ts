export interface CauseWithInvestment {
  id: number;
  title: string;
  description: string;
  category: string;
  iconName: string;
  averageReturn: string;
  companyCount: number;
  impactMetrics?: Record<string, any>;
  imageUrl?: string;
  color: string;
  investmentAmount?: number;
}

export interface PortfolioAllocation {
  causeId: number;
  cause: string;
  amount: string;
  percentage: string;
  color: string;
}

export interface DetailedPortfolio {
  id: number;
  userId: string;
  totalValue: string;
  totalReturn: string;
  impactScore: number;
  allocations: PortfolioAllocation[];
  activeCauses: number;
}

export interface ImpactMetrics {
  treesPlanted: number;
  cleanEnergyMWh: number;
  peopleImpacted: number;
  studentsEducated: number;
}

export interface PendingInvestment {
  causeId: number;
  causeTitle: string;
  amount: number;
}
