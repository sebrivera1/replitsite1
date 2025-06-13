import { Sprout, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className="bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Sprout className="h-8 w-8 watercolor-sage" />
            <span className="text-xl font-bold watercolor-blue">Catalyst</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('causes')}
              className="text-slate-600 hover:text-watercolor-blue transition-colors font-medium"
            >
              Browse Causes
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-slate-600 hover:text-watercolor-blue transition-colors font-medium"
            >
              My Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('impact')}
              className="text-slate-600 hover:text-watercolor-blue transition-colors font-medium"
            >
              Impact Report
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-slate-600 hover:text-watercolor-blue">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="w-8 h-8 bg-watercolor-blue rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
