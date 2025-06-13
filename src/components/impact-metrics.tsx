import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { TreePine, Zap, Users, GraduationCap } from "lucide-react";
import { ImpactMetrics } from "@/lib/types";

export default function ImpactMetricsSection() {
  const { data: metrics, isLoading } = useQuery<ImpactMetrics>({
    queryKey: ["/api/impact"],
  });

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    }
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)}K`;
    }
    return num.toString();
  };

  if (isLoading) {
    return (
      <section id="impact" className="py-16 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4 bg-slate-700" />
            <Skeleton className="h-6 w-96 mx-auto bg-slate-700" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="text-center">
                <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4 bg-slate-700" />
                <Skeleton className="h-8 w-16 mx-auto mb-2 bg-slate-700" />
                <Skeleton className="h-4 w-24 mx-auto bg-slate-700" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="impact" className="py-16 bg-gradient-to-br from-watercolor-blue via-watercolor-lavender to-watercolor-peach text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 drop-shadow-lg">Real Impact, Real Returns</h2>
          <p className="text-lg text-white/90 drop-shadow-md">See how your investments are making a difference in the world</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="text-center">
            <div className="w-16 h-16 bg-watercolor-sage rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <TreePine className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2 drop-shadow-md">
              {metrics ? formatNumber(metrics.treesPlanted) : "0"}
            </h3>
            <p className="text-white/80">Trees Planted</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-watercolor-mint rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Zap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2 drop-shadow-md">
              {metrics ? formatNumber(metrics.cleanEnergyMWh) : "0"}
            </h3>
            <p className="text-white/80">MWh Clean Energy</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-watercolor-coral rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2 drop-shadow-md">
              {metrics ? formatNumber(metrics.peopleImpacted) : "0"}
            </h3>
            <p className="text-white/80">People Impacted</p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-watercolor-peach rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2 drop-shadow-md">
              {metrics ? formatNumber(metrics.studentsEducated) : "0"}
            </h3>
            <p className="text-white/80">Students Educated</p>
          </div>
        </div>
        
        <div className="text-center">
          <Button className="bg-white/95 text-slate-900 px-8 py-4 rounded-xl font-semibold hover:bg-white hover:shadow-lg transition-all duration-300 h-auto backdrop-blur-sm">
            View Detailed Impact Report
          </Button>
        </div>
      </div>
    </section>
  );
}
