import Header from './components/Header';
import Hero from './components/Hero';
import Watchlist from './components/Watchlist';
import Research from './components/Research';
import Webinars from './components/Webinars';
import Auth from './components/Auth';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Watchlist />
      <Research />
      <Webinars />
      <Auth />
      <Footer />
    </div>
  );
}

export default App;
