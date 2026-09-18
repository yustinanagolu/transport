import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import AboutPage from './pages/AboutPage';
import BookingPage from './pages/BookingPage';
import TrackPage from './pages/TrackPage';
import FooterPage from './pages/FooterPage';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/huduma" element={<ServicesPage />} />
        <Route path="/kuhusu" element={<AboutPage />} />
        <Route path="/quote" element={<BookingPage />} />
        <Route path="/track" element={<TrackPage />} />
      </Routes>
      <FooterPage />
    </div>
  );
}

export default App;
