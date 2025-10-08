import { useEffect, useState } from 'react';
import { FileText, Clock, TrendingUp, Eye } from 'lucide-react';
import { supabase, ResearchReport } from '../lib/supabase';

export default function Research() {
  const [reports, setReports] = useState<ResearchReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All Reports' },
    { value: 'technical_analysis', label: 'Technical Analysis' },
    { value: 'fundamental_analysis', label: 'Fundamental Analysis' },
    { value: 'market_outlook', label: 'Market Outlook' },
    { value: 'strategy', label: 'Strategy' },
  ];

  useEffect(() => {
    fetchReports();
  }, [selectedCategory]);

  const fetchReports = async () => {
    try {
      let query = supabase
        .from('research_reports')
        .select('*')
        .order('published_at', { ascending: false });

      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }

      const { data, error } = await query.limit(6);

      if (error) throw error;
      setReports(data || []);
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      technical_analysis: 'bg-blue-100 text-blue-800',
      fundamental_analysis: 'bg-purple-100 text-purple-800',
      market_outlook: 'bg-emerald-100 text-emerald-800',
      strategy: 'bg-orange-100 text-orange-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <section id="research" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading research reports...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="research" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Research Reports</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Deep-dive analysis and insights to help you make informed trading decisions. Our expert team provides
            comprehensive research across multiple disciplines.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`px-5 py-2 rounded-full font-medium transition ${
                  selectedCategory === category.value
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No research reports available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reports.map((report) => (
              <div
                key={report.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden border border-gray-100 flex flex-col"
              >
                {report.image_url && (
                  <img
                    src={report.image_url}
                    alt={report.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(report.category)}`}>
                      {report.category.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {report.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                    {report.summary}
                  </p>

                  {report.stock_symbols && report.stock_symbols.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {report.stock_symbols.map((symbol) => (
                        <span
                          key={symbol}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold"
                        >
                          {symbol}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{report.read_time} min</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{report.views}</span>
                      </span>
                    </div>
                    <span className="text-xs">{formatDate(report.published_at)}</span>
                  </div>

                  <button className="mt-4 w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition font-medium">
                    Read Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
