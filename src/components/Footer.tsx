import { TrendingUp, Mail, Twitter, Linkedin, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <TrendingUp className="h-8 w-8 text-emerald-500" />
              <span className="text-2xl font-bold text-white">StockSearch.in</span>
            </div>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Your trusted source for momentum trading insights, research, and education.
              Empowering traders with data-driven analysis and proven strategies.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-500 transition">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#watchlist" className="text-gray-400 hover:text-emerald-500 transition">
                  Watchlist
                </a>
              </li>
              <li>
                <a href="#research" className="text-gray-400 hover:text-emerald-500 transition">
                  Research
                </a>
              </li>
              <li>
                <a href="#webinars" className="text-gray-400 hover:text-emerald-500 transition">
                  Webinars
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-500 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-500 transition">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-emerald-500 transition">
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} StockSearch.in. All rights reserved.</p>
          <p className="mt-2">
            Trading involves risk. Past performance does not guarantee future results. Please trade responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
}
