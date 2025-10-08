import { useEffect, useState } from 'react';
import { Video, Clock, Users, Play, Calendar } from 'lucide-react';
import { supabase, Webinar } from '../lib/supabase';

export default function Webinars() {
  const [webinars, setWebinars] = useState<Webinar[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' },
  ];

  useEffect(() => {
    fetchWebinars();
  }, [selectedLevel]);

  const fetchWebinars = async () => {
    try {
      let query = supabase
        .from('webinars')
        .select('*')
        .order('created_at', { ascending: false });

      if (selectedLevel !== 'all') {
        query = query.eq('level', selectedLevel);
      }

      const { data, error } = await query.limit(6);

      if (error) throw error;
      setWebinars(data || []);
    } catch (error) {
      console.error('Error fetching webinars:', error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level: string) => {
    const colors: Record<string, string> = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800',
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <section id="webinars" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading webinars...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="webinars" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trading Webinars</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Learn from experts through our comprehensive webinar series. From beginner basics to advanced strategies,
            we cover everything you need to succeed in trading.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {levels.map((level) => (
              <button
                key={level.value}
                onClick={() => setSelectedLevel(level.value)}
                className={`px-5 py-2 rounded-full font-medium transition ${
                  selectedLevel === level.value
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
        </div>

        {webinars.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Video className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">No webinars available yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {webinars.map((webinar) => (
              <div
                key={webinar.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col"
              >
                <div className="relative">
                  {webinar.thumbnail_url ? (
                    <img
                      src={webinar.thumbnail_url}
                      alt={webinar.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
                      <Video className="h-16 w-16 text-white" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    {webinar.is_live ? (
                      <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                        LIVE
                      </span>
                    ) : webinar.is_recorded ? (
                      <span className="bg-emerald-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        RECORDED
                      </span>
                    ) : (
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        UPCOMING
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(webinar.level)}`}>
                      {webinar.level.toUpperCase()}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {webinar.title}
                  </h3>

                  <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                    {webinar.description}
                  </p>

                  {webinar.topics && webinar.topics.length > 0 && (
                    <div className="mb-4">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Topics covered:</p>
                      <div className="flex flex-wrap gap-2">
                        {webinar.topics.slice(0, 3).map((topic, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                          >
                            {topic}
                          </span>
                        ))}
                        {webinar.topics.length > 3 && (
                          <span className="text-xs text-gray-500 py-1">
                            +{webinar.topics.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4 pt-4 border-t border-gray-100">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{webinar.duration} min</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{webinar.views} views</span>
                    </span>
                  </div>

                  {webinar.scheduled_at && !webinar.is_recorded && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(webinar.scheduled_at)}</span>
                    </div>
                  )}

                  <button className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition font-medium flex items-center justify-center space-x-2">
                    <Play className="h-4 w-4" />
                    <span>{webinar.is_recorded ? 'Watch Now' : 'Register'}</span>
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
