import { Button } from "@/components/ui/button";

export default function HeroSection() {
  const scrollToCauses = () => {
    const element = document.getElementById('causes');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="gradient-hero text-white py-20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white drop-shadow-lg">
          Catalyze Your <span className="text-amber-200">Impact</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto drop-shadow-md">
          Transform your investments into meaningful change. Build wealth while creating a better world.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={scrollToCauses}
            className="bg-white/95 text-slate-800 px-8 py-4 rounded-xl font-semibold hover:bg-white hover:shadow-lg transition-all duration-300 h-auto backdrop-blur-sm"
          >
            Start Investing
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-white/80 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/20 hover:backdrop-blur-md transition-all duration-300 h-auto bg-transparent"
          >
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
}
