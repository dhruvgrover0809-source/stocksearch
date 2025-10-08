import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type WatchlistStock = {
  id: string;
  symbol: string;
  company_name: string;
  current_price: number;
  price_change: number;
  price_change_percent: number;
  momentum_score: number;
  volume: number;
  market_cap: string;
  sector: string;
  reason: string;
  added_at: string;
  is_active: boolean;
};

export type ResearchReport = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  category: 'technical_analysis' | 'fundamental_analysis' | 'market_outlook' | 'strategy';
  stock_symbols: string[];
  image_url: string;
  published_at: string;
  author_name: string;
  read_time: number;
  is_featured: boolean;
  views: number;
  created_at: string;
};

export type Webinar = {
  id: string;
  title: string;
  slug: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  duration: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  topics: string[];
  scheduled_at: string;
  is_live: boolean;
  is_recorded: boolean;
  views: number;
  created_at: string;
};

export type UserWatchlist = {
  id: string;
  user_id: string;
  stock_symbol: string;
  notes: string;
  target_price: number;
  stop_loss: number;
  added_at: string;
};
