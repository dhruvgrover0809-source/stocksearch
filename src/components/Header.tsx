import { TrendingUp, LogIn, User } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useEffect, useState } from 'react';

export default function Header() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">StockSearch.in</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#watchlist" className="text-gray-700 hover:text-emerald-600 font-medium transition">
              Watchlist
            </a>
            <a href="#research" className="text-gray-700 hover:text-emerald-600 font-medium transition">
              Research
            </a>
            <a href="#webinars" className="text-gray-700 hover:text-emerald-600 font-medium transition">
              Webinars
            </a>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-gray-700">
                  <User className="h-5 w-5" />
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => window.location.hash = 'auth'}
                className="flex items-center space-x-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
