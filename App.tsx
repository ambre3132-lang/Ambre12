
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import OffersPage from './pages/OffersPage';
import ResultsPage from './pages/ResultsPage';
import ContactPage from './pages/ContactPage';
import ReviewsPage from './pages/ReviewsPage';
import BookingPage from './pages/BookingPage';
import WhatsAppButton from './components/common/WhatsAppButton';
import AboutPage from './pages/AboutPage';

const App: React.FC = () => {
  return (
    <HashRouter>
      <div className="bg-brand-beige font-sans text-brand-gray">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/offres" element={<OffersPage />} />
            <Route path="/resultats" element={<ResultsPage />} />
            <Route path="/a-propos" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Routes>
        </main>
        <WhatsAppButton />
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;