import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { PendingInvestment } from "@/lib/types";

interface InvestmentSummaryProps {
  pendingInvestments: PendingInvestment[];
  onClearPending: () => void;
}

const MOCK_USER_ID = "user123"; // Mock user ID for demo

export default function InvestmentSummary({ pendingInvestments, onClearPending }: InvestmentSummaryProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const totalPending = pendingInvestments.reduce((sum, inv) => sum + inv.amount, 0);

  const createInvestmentMutation = useMutation({
    mutationFn: async (investment: { causeId: number; amount: string; userId: string }) => {
      return apiRequest("POST", "/api/investments", investment);
    },
    onSuccess: () => {
      // Invalidate relevant queries to refresh data
      queryClient.invalidateQueries({ queryKey: [`/api/portfolio/${MOCK_USER_ID}/detailed`] });
      queryClient.invalidateQueries({ queryKey: [`/api/investments/${MOCK_USER_ID}`] });
    },
  });

  const handleCompleteInvestment = async () => {
    if (pendingInvestments.length === 0) {
      toast({
        title: "No Investments",
        description: "Please add some investments before completing your order.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Process each investment
      for (const investment of pendingInvestments) {
        await createInvestmentMutation.mutateAsync({
          causeId: investment.causeId,
          amount: investment.amount.toString(),
          userId: MOCK_USER_ID
        });
      }

      toast({
        title: "Investment Complete!",
        description: `Successfully invested $${totalPending.toLocaleString()} across ${pendingInvestments.length} causes.`,
      });

      onClearPending();
    } catch (error) {
      toast({
        title: "Investment Failed",
        description: "There was an error processing your investment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your investment selections have been saved as a draft.",
    });
  };

  const getRiskLevel = () => {
    if (pendingInvestments.length >= 4) return { level: "Low Risk", dots: 5, color: "bg-growth-green" };
    if (pendingInvestments.length >= 2) return { level: "Moderate Risk", dots: 3, color: "bg-yellow-400" };
    return { level: "Higher Risk", dots: 2, color: "bg-orange-500" };
  };

  const getDiversificationLevel = () => {
    const uniqueCategories = new Set(pendingInvestments.map(inv => inv.causeId)).size;
    if (uniqueCategories >= 4) return { level: "Well Diversified", dots: 5, color: "bg-growth-green" };
    if (uniqueCategories >= 2) return { level: "Moderately Diversified", dots: 3, color: "bg-yellow-400" };
    return { level: "Limited Diversification", dots: 2, color: "bg-orange-500" };
  };

  const risk = getRiskLevel();
  const diversification = getDiversificationLevel();

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-slate-50">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Investment Summary</h2>
            
            <div className="space-y-4 mb-6">
              <Card className="bg-white">
                <CardContent className="flex justify-between items-center p-4">
                  <span className="font-medium text-slate-900">Total Pending Investment</span>
                  <span className="text-2xl font-bold text-trust-blue">
                    ${totalPending.toLocaleString()}
                  </span>
                </CardContent>
              </Card>

              {pendingInvestments.length > 0 && (
                <div className="space-y-2">
                  {pendingInvestments.map((investment, index) => (
                    <Card key={index} className="bg-white">
                      <CardContent className="flex justify-between items-center p-3">
                        <span className="text-sm font-medium text-slate-700">{investment.causeTitle}</span>
                        <span className="text-sm font-semibold text-slate-900">
                          ${investment.amount.toLocaleString()}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Risk Assessment</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-3 h-3 rounded-full ${
                          i < risk.dots ? risk.color : "bg-slate-200"
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">{risk.level}</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Diversification</h3>
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-3 h-3 rounded-full ${
                          i < diversification.dots ? diversification.color : "bg-slate-200"
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-slate-600">{diversification.level}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={handleCompleteInvestment}
                disabled={pendingInvestments.length === 0 || isProcessing}
                className="flex-1 bg-trust-blue text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-auto"
              >
                {isProcessing ? "Processing..." : "Complete Investment"}
              </Button>
              <Button 
                onClick={handleSaveDraft}
                variant="outline"
                disabled={pendingInvestments.length === 0}
                className="flex-1 border border-slate-300 text-slate-700 py-4 px-6 rounded-lg font-semibold hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed h-auto"
              >
                Save as Draft
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
