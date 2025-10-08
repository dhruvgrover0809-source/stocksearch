import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, Plus, Minus } from 'lucide-react';
import { supabase, WatchlistStock } from '../lib/supabase';

export default function Watchlist() {
  const [stocks, setStocks] = useState<WatchlistStock[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const { data, error } = await supabase
        .from('watchlist_stocks')
        .select('*')
        .eq('is_active', true)
        .order('momentum_score', { ascending: false });

      if (error) throw error;
      setStocks(data || []);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToPersonalWatchlist = async (symbol: string) => {
    if (!user) {
      window.location.hash = 'auth';
      return;
    }

    try {
      const { error } = await supabase
        .from('user_watchlists')
        .insert({ user_id: user.id, stock_symbol: symbol });

      if (error) {
        if (error.code === '23505') {
          alert('Stock already in your watchlist');
        } else {
          throw error;
        }
      } else {
        alert('Added to your personal watchlist!');
      }
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  const getMomentumColor = (score: number) => {
    if (score >= 8) return 'bg-emerald-100 text-emerald-800';
    if (score >= 6) return 'bg-blue-100 text-blue-800';
    return 'bg-orange-100 text-orange-800';
  };

  if (loading) {
    return (
      <section id="watchlist" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading watchlist...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="watchlist" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Momentum Watchlist</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            High-momentum stocks showing strong price action and trading volume. Updated regularly with our latest analysis.
          </p>
        </div>

        {stocks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-gray-600">No stocks in the watchlist yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {stocks.map((stock) => (
              <div
                key={stock.id}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{stock.symbol}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getMomentumColor(stock.momentum_score)}`}>
                        Momentum: {stock.momentum_score}/10
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium mb-2">{stock.company_name}</p>
                    <p className="text-gray-700 mb-3">{stock.reason}</p>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <span className="font-semibold mr-1">Sector:</span> {stock.sector}
                      </span>
                      <span className="flex items-center">
                        <span className="font-semibold mr-1">Market Cap:</span> {stock.market_cap}
                      </span>
                      <span className="flex items-center">
                        <span className="font-semibold mr-1">Volume:</span> {stock.volume?.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="lg:text-right flex lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-4">
                    <div>
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        ${stock.current_price?.toFixed(2)}
                      </div>
                      <div className={`flex items-center space-x-1 text-lg font-semibold ${
                        stock.price_change >= 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}>
                        {stock.price_change >= 0 ? (
                          <TrendingUp className="h-5 w-5" />
                        ) : (
                          <TrendingDown className="h-5 w-5" />
                        )}
                        <span>
                          {stock.price_change >= 0 ? '+' : ''}{stock.price_change?.toFixed(2)} (
                          {stock.price_change_percent >= 0 ? '+' : ''}{stock.price_change_percent?.toFixed(2)}%)
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => addToPersonalWatchlist(stock.symbol)}
                      className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition flex items-center space-x-2 font-medium whitespace-nowrap"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add to My List</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
