import { TrendingUp, LineChart, BookOpen } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-emerald-50 via-white to-teal-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Master the Art of
            <span className="block text-emerald-600 mt-2">Momentum Trading</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover high-momentum stocks, access expert research reports, and learn proven trading strategies
            through our comprehensive educational webinars.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#watchlist"
              className="bg-emerald-600 text-white px-8 py-4 rounded-lg hover:bg-emerald-700 transition font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              View Watchlist
            </a>
            <a
              href="#webinars"
              className="bg-white text-emerald-600 px-8 py-4 rounded-lg hover:bg-gray-50 transition font-semibold text-lg border-2 border-emerald-600"
            >
              Start Learning
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Momentum Watchlist</h3>
              <p className="text-gray-600 leading-relaxed">
                Curated stocks showing strong momentum with detailed metrics and analysis to help you make informed decisions.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <LineChart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Research</h3>
              <p className="text-gray-600 leading-relaxed">
                In-depth research reports covering technical analysis, fundamentals, and market outlook from seasoned traders.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trading Webinars</h3>
              <p className="text-gray-600 leading-relaxed">
                Step-by-step guidance on trading strategies, risk management, and building your trading journey from scratch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
