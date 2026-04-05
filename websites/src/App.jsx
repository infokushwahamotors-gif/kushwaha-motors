import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChatbot from './components/AIChatbot';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTop from './components/ScrollToTop';

// Lazy loading components for performance 
const Home = React.lazy(() => import('./pages/Home'));
const About = React.lazy(() => import('./pages/About'));
const Vehicles = React.lazy(() => import('./pages/Vehicles'));
const Dealers = React.lazy(() => import('./pages/Dealers'));
const Contact = React.lazy(() => import('./pages/Contact'));
const ProductDetails = React.lazy(() => import('./pages/ProductDetails'));

// Simple loading fallback
const PageLoader = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)' }}>
    <div style={{ width: 40, height: 40, border: '3px solid var(--elec)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
    <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
  </div>
);

function App() {
  return (
    <Router>
      <div style={{ position: 'relative', minHeight: '100vh' }}>
      <ScrollToTop />
        <Navbar />
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/vehicles" element={<Vehicles />} />
              <Route path="/vehicles/:id" element={<ProductDetails />} />
              <Route path="/dealers" element={<Dealers />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        {/* Global Floating Action Buttons */}
        <WhatsAppButton />
        <AIChatbot />
      </div>
    </Router>
  );
}

export default App;
