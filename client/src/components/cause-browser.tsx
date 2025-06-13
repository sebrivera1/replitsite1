import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Leaf, Sun, GraduationCap, Heart, Droplets, Smartphone } from "lucide-react";
import { Cause } from "@shared/schema";
import { CauseWithInvestment, PendingInvestment } from "@/lib/types";

interface CauseBrowserProps {
  onAddInvestment: (investment: PendingInvestment) => void;
}

const iconMap = {
  leaf: Leaf,
  "solar-panel": Sun,
  "graduation-cap": GraduationCap,
  heartbeat: Heart,
  tint: Droplets,
  "mobile-alt": Smartphone,
};

const categories = [
  "All Categories",
  "Environment", 
  "Energy",
  "Social Impact",
  "Healthcare",
  "Technology"
];

export default function CauseBrowser({ onAddInvestment }: CauseBrowserProps) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [investmentAmounts, setInvestmentAmounts] = useState<Record<number, number>>({});
  const { toast } = useToast();

  const { data: causes, isLoading } = useQuery<Cause[]>({
    queryKey: ["/api/causes"],
  });

  const filteredCauses = causes?.filter(cause => 
    selectedCategory === "All Categories" || cause.category === selectedCategory
  ) || [];

  const handleSliderChange = (causeId: number, value: number) => {
    setInvestmentAmounts(prev => ({ ...prev, [causeId]: value }));
  };

  const handleInputChange = (causeId: number, value: string) => {
    const numValue = Math.min(10000, Math.max(0, parseInt(value) || 0));
    setInvestmentAmounts(prev => ({ ...prev, [causeId]: numValue }));
  };

  const handleInvest = (cause: Cause) => {
    const amount = investmentAmounts[cause.id] || 0;
    
    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter an investment amount greater than $0",
        variant: "destructive",
      });
      return;
    }

    if (amount > 10000) {
      toast({
        title: "Amount Too Large",
        description: "Maximum investment amount is $10,000 per cause",
        variant: "destructive",
      });
      return;
    }

    onAddInvestment({
      causeId: cause.id,
      causeTitle: cause.title,
      amount
    });

    toast({
      title: "Investment Added",
      description: `$${amount.toLocaleString()} added to ${cause.title}`,
    });

    // Reset the amount for this cause
    setInvestmentAmounts(prev => ({ ...prev, [cause.id]: 0 }));
  };

  if (isLoading) {
    return (
      <section id="causes" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-96" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="causes" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Explore Impact Categories</h2>
          <p className="text-lg text-slate-600">Choose causes that align with your values and investment goals</p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`px-6 py-3 rounded-full font-medium transition-colors ${
                selectedCategory === category 
                  ? "bg-trust-blue text-white hover:bg-blue-700" 
                  : "bg-white text-slate-600 hover:bg-slate-100 border-slate-200"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Cause Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCauses.map((cause) => {
            const IconComponent = iconMap[cause.iconName as keyof typeof iconMap] || Leaf;
            const amount = investmentAmounts[cause.id] || 0;
            
            return (
              <Card key={cause.id} className="bg-white shadow-sm hover:shadow-lg transition-all duration-300 border border-slate-200 overflow-hidden group investment-card">
                <div className="h-48 relative overflow-hidden">
                  {cause.imageUrl && (
                    <img 
                      src={cause.imageUrl} 
                      alt={cause.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 cause-image"
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-slate-700">{cause.category}</span>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{cause.title}</h3>
                      <p className="text-slate-600 text-sm line-clamp-3">{cause.description}</p>
                    </div>
                    <IconComponent className={`h-6 w-6 ml-4 flex-shrink-0 ${
                      cause.color === 'growth-green' ? 'text-growth-green' :
                      cause.color === 'yellow-500' ? 'text-yellow-500' :
                      cause.color === 'accent-purple' ? 'text-accent-purple' :
                      cause.color === 'red-500' ? 'text-red-500' :
                      cause.color === 'cyan-500' ? 'text-cyan-500' :
                      cause.color === 'indigo-500' ? 'text-indigo-500' :
                      'text-gray-500'
                    }`} />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-slate-500">Avg. Return</p>
                      <p className="font-semibold text-growth-green">+{cause.averageReturn}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Companies</p>
                      <p className="font-semibold text-slate-900">{cause.companyCount}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium text-slate-700">Investment Amount</Label>
                      <span className="text-sm text-slate-500">$0 - $10,000</span>
                    </div>
                    
                    <input 
                      type="range" 
                      min="0" 
                      max="10000" 
                      step="100" 
                      value={amount}
                      onChange={(e) => handleSliderChange(cause.id, parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, hsl(222, 84%, 38%) 0%, hsl(222, 84%, 38%) ${(amount / 10000) * 100}%, hsl(214, 32%, 91%) ${(amount / 10000) * 100}%, hsl(214, 32%, 91%) 100%)`
                      }}
                    />
                    
                    <div className="flex items-center justify-between gap-3">
                      <Input
                        type="number"
                        placeholder="0"
                        min="0"
                        max="10000"
                        value={amount || ""}
                        onChange={(e) => handleInputChange(cause.id, e.target.value)}
                        className="w-24 text-sm"
                      />
                      <Button 
                        onClick={() => handleInvest(cause)}
                        disabled={amount <= 0}
                        className="bg-trust-blue text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Invest
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredCauses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-500 text-lg">No causes found in this category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
