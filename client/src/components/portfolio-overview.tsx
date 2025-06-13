import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, Heart, Star } from "lucide-react";
import { DetailedPortfolio } from "@/lib/types";

const MOCK_USER_ID = "user123"; // Mock user ID for demo

export default function PortfolioOverview() {
  const { data: portfolio, isLoading } = useQuery<DetailedPortfolio>({
    queryKey: [`/api/portfolio/${MOCK_USER_ID}/detailed`],
  });

  if (isLoading) {
    return (
      <section id="portfolio" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const totalValue = parseFloat(portfolio?.totalValue || "0");
  const formattedValue = totalValue.toLocaleString();

  return (
    <section id="portfolio" className="py-16 bg-gradient-to-b from-white to-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold watercolor-blue mb-4">Your Impact Portfolio</h2>
          <p className="text-lg text-slate-600">Track your investments and their real-world impact</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-r from-watercolor-sage to-watercolor-mint text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Total Investment</h3>
                <TrendingUp className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold">${formattedValue}</p>
              <p className="text-white/80">+{portfolio?.totalReturn || "0"}% this month</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-watercolor-blue to-watercolor-coral text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Active Causes</h3>
                <Heart className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold">{portfolio?.activeCauses || 0}</p>
              <p className="text-white/80">Across multiple categories</p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-watercolor-lavender to-watercolor-peach text-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Impact Score</h3>
                <Star className="h-6 w-6" />
              </div>
              <p className="text-3xl font-bold">{portfolio?.impactScore || 0}</p>
              <p className="text-white/80">
                {(portfolio?.impactScore || 0) > 80 ? "High impact rating" : 
                 (portfolio?.impactScore || 0) > 50 ? "Moderate impact rating" : 
                 "Growing impact rating"}
              </p>
            </CardContent>
          </Card>
        </div>

        {portfolio?.allocations && portfolio.allocations.length > 0 && (
          <Card className="bg-slate-50">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-slate-900 mb-6">Current Allocation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  {portfolio.allocations.map((allocation, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${
                          allocation.color === 'growth-green' ? 'bg-growth-green' :
                          allocation.color === 'trust-blue' ? 'bg-trust-blue' :
                          allocation.color === 'accent-purple' ? 'bg-accent-purple' :
                          allocation.color === 'red-500' ? 'bg-red-500' :
                          allocation.color === 'cyan-500' ? 'bg-cyan-500' :
                          allocation.color === 'indigo-500' ? 'bg-indigo-500' :
                          'bg-gray-500'
                        }`} />
                        <span className="font-medium text-slate-900">{allocation.cause}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-slate-900">{allocation.amount}</p>
                        <p className="text-sm text-slate-500">{allocation.percentage}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-slate-900">${(totalValue / 1000).toFixed(1)}K</p>
                        <p className="text-sm text-slate-500">Total</p>
                      </div>
                    </div>
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="8"/>
                    </svg>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {(!portfolio?.allocations || portfolio.allocations.length === 0) && (
          <Card className="bg-slate-50">
            <CardContent className="p-12 text-center">
              <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Start Your Investment Journey</h3>
              <p className="text-slate-600 mb-6">Choose causes you care about below to begin building your impact portfolio.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}
