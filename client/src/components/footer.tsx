import { Sprout } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Sprout className="h-6 w-6 text-growth-green" />
              <span className="text-xl font-bold text-slate-900">ImpactInvest</span>
            </div>
            <p className="text-slate-600 mb-4">Connecting your values with your investments for a better world.</p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-trust-blue hover:text-white transition-colors cursor-pointer">
                <span className="text-sm">𝕏</span>
              </div>
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-trust-blue hover:text-white transition-colors cursor-pointer">
                <span className="text-sm">in</span>
              </div>
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-trust-blue hover:text-white transition-colors cursor-pointer">
                <span className="text-sm">f</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Platform</h3>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#causes" className="hover:text-trust-blue transition-colors">Browse Causes</a></li>
              <li><a href="#portfolio" className="hover:text-trust-blue transition-colors">Portfolio</a></li>
              <li><a href="#impact" className="hover:text-trust-blue transition-colors">Impact Report</a></li>
              <li><a href="#" className="hover:text-trust-blue transition-colors">Performance</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Company</h3>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#" className="hover:text-trust-blue transition-colors">About</a></li>
              <li><a href="#" className="hover:text-trust-blue transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-trust-blue transition-colors">Press</a></li>
              <li><a href="#" className="hover:text-trust-blue transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Legal</h3>
            <ul className="space-y-2 text-slate-600">
              <li><a href="#" className="hover:text-trust-blue transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-trust-blue transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-trust-blue transition-colors">Disclosures</a></li>
              <li><a href="#" className="hover:text-trust-blue transition-colors">SEC Filings</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 mt-8 pt-8 text-center text-slate-500">
          <p>&copy; 2024 ImpactInvest. All rights reserved. Securities offered through licensed broker-dealers.</p>
        </div>
      </div>
    </footer>
  );
}
