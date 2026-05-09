import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const Navbar = () => {
  const { language } = useLanguage();
  const t = translations[language].nav;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [vehiclesDropdownOpen, setVehiclesDropdownOpen] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState('twoWheeler');
  const dropdownRef = useRef(null);

  const location = useLocation();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setVehiclesDropdownOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setVehiclesDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <nav className={`navbar ${isScrolled || location.pathname !== '/' ? 'scrolled' : ''}`}>
        <div className="container nav-content">
          <Link to="/" className="nav-logo">
            <img src="/logo.png" alt="Kushwaha Motors" />
          </Link>

          {/* Desktop Nav */}
          <div className="nav-links">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>{t.home}</Link>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>{t.about}</Link>
            
            {/* Vehicles Dropdown */}
            <div ref={dropdownRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <button 
                onClick={() => setVehiclesDropdownOpen(!vehiclesDropdownOpen)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '4px',
                  fontSize: '0.8rem', fontWeight: location.pathname.startsWith('/vehicles') ? 800 : 700,
                  color: location.pathname.startsWith('/vehicles') ? 'var(--elec)' : 'var(--txt-2)',
                  textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'inherit',
                  transition: 'color 0.3s'
                }}
              >
                {t.vehicles} <ChevronDown size={14} style={{ transform: vehiclesDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}/>
              </button>

              <AnimatePresence>
                {vehiclesDropdownOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 15 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                    style={{ 
                      position: 'absolute', top: 'calc(100% + 20px)', left: '50%', transform: 'translateX(-50%)', 
                      background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', 
                      border: '1px solid rgba(19,123,57,0.1)', borderRadius: 'var(--r2)', 
                      padding: '24px', width: '480px', 
                      boxShadow: '0 20px 40px rgba(0,0,0,0.08)', zIndex: 100, 
                      display: 'flex', flexDirection: 'column', gap: '24px'
                    }}
                  >
                    {/* Category Toggles */}
                    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                      {[[ 'twoWheeler', language === 'ne' ? '🛵 २ पाङ्ग्रे' : '🛵 2-Wheelers' ], [ 'threeWheeler', language === 'ne' ? '🛺 ३ पाङ्ग्रे' : '🛺 3-Wheelers' ]].map(([cat, label]) => (
                        <button 
                          key={cat}
                          onMouseEnter={() => setHoveredCategory(cat)}
                          style={{ 
                            padding: '10px 24px', borderRadius: '100px', 
                            border: '1px solid ' + (hoveredCategory === cat ? 'var(--nature)' : 'rgba(0,0,0,0.05)'), 
                            background: hoveredCategory === cat ? 'rgba(66,169,46,0.08)' : 'rgba(0,0,0,0.02)', 
                            color: hoveredCategory === cat ? 'var(--elec)' : 'var(--txt-2)', 
                            fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.3s' 
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    {/* Products Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                      {PRODUCTS[hoveredCategory].map(prod => (
                        <Link 
                          key={prod.id} 
                          to={`/vehicles/${prod.id}`}
                          style={{ 
                            display: 'flex', flexDirection: 'column', alignItems: 'center', 
                            textDecoration: 'none', background: 'rgba(0,0,0,0.02)', 
                            borderRadius: 'var(--r1)', padding: '12px 6px', transition: 'all 0.3s', 
                            border: '1px solid transparent' 
                          }}
                          onMouseEnter={(e) => { 
                            e.currentTarget.style.borderColor = 'rgba(66,169,46,0.3)'; 
                            e.currentTarget.style.background = '#fff'; 
                            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.04)';
                          }}
                          onMouseLeave={(e) => { 
                            e.currentTarget.style.borderColor = 'transparent'; 
                            e.currentTarget.style.background = 'rgba(0,0,0,0.02)'; 
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <img src={prod.image} alt={prod.name} style={{ width: '60px', height: '60px', objectFit: 'contain', marginBottom: '8px' }} />
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--txt)', textAlign: 'center', lineHeight: '1.2' }}>{prod.name}</span>
                        </Link>
                      ))}
                    </div>

                    <Link to={`/vehicles?category=${hoveredCategory}`} style={{ 
                      textAlign: 'center', fontSize: '0.75rem', fontWeight: 800, color: 'var(--elec)', 
                      textTransform: 'uppercase', letterSpacing: '1px', textDecoration: 'none', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                      paddingTop: '16px', borderTop: '1px solid rgba(0,0,0,0.05)'
                    }}>
                      {hoveredCategory === 'twoWheeler' ? (language === 'ne' ? '२ पाङ्ग्रे' : 'Two Wheeler') : (language === 'ne' ? '३ पाङ्ग्रे' : 'Three Wheeler')} {language === 'ne' ? 'श्रेणी अन्वेषण गर्नुहोस्' : 'Explore Category'} <ChevronRight size={14} />
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/dealers" className={location.pathname === '/dealers' ? 'active' : ''}>{t.dealers}</Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>{t.contact}</Link>
            <Link to="/contact" className="btn-ride">{language === 'ne' ? 'टेस्ट राइड बुक गर्नुहोस्' : 'Book Test Ride'}</Link>
          </div>

          <button className="menu-toggle" aria-label="Toggle Menu" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -20 }}
              className="mobile-menu"
              style={{ paddingBottom: '32px' }}
            >
              <Link to="/" onClick={() => setIsMenuOpen(false)} className={location.pathname === '/' ? 'active' : ''}>{t.home}</Link>
              <Link to="/about" onClick={() => setIsMenuOpen(false)} className={location.pathname === '/about' ? 'active' : ''}>{t.about}</Link>
              
              {/* Mobile Vehicles Accordion */}
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <button 
                  onClick={() => setVehiclesDropdownOpen(!vehiclesDropdownOpen)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    fontSize: '0.8rem', fontWeight: 700,
                    color: location.pathname.startsWith('/vehicles') ? 'var(--elec)' : 'var(--txt)',
                    textTransform: 'uppercase', letterSpacing: '2px', fontFamily: 'inherit',
                    padding: 0, textAlign: 'left'
                  }}
                >
                  {t.vehicles} <ChevronDown size={14} style={{ transform: vehiclesDropdownOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }}/>
                </button>
                
                <AnimatePresence>
                  {vehiclesDropdownOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, marginTop: 0 }}
                      animate={{ height: 'auto', opacity: 1, marginTop: 16 }}
                      exit={{ height: 0, opacity: 0, marginTop: 0 }}
                      style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', gap: '16px' }}
                    >
                      <div style={{ display: 'flex', gap: '8px' }}>
                        {[[ 'twoWheeler', language === 'ne' ? '२ पाङ्ग्रे' : '2 Wheeler' ], [ 'threeWheeler', language === 'ne' ? '३ पाङ्ग्रे' : '3 Wheeler' ]].map(([cat, label]) => (
                          <button 
                            key={cat}
                            onClick={() => setHoveredCategory(cat)}
                            style={{ 
                              flex: 1, padding: '8px', borderRadius: 'var(--r1)', 
                              border: '1px solid ' + (hoveredCategory === cat ? 'var(--nature)' : 'rgba(0,0,0,0.05)'), 
                              background: hoveredCategory === cat ? 'rgba(66,169,46,0.08)' : 'rgba(0,0,0,0.02)', 
                              color: hoveredCategory === cat ? 'var(--elec)' : 'var(--txt-2)', 
                              fontWeight: 700, fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.3s' 
                            }}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        {PRODUCTS[hoveredCategory].slice(0,4).map(prod => (
                          <Link 
                            key={prod.id} 
                            to={`/vehicles/${prod.id}`}
                            onClick={() => setIsMenuOpen(false)}
                            style={{ 
                              display: 'flex', alignItems: 'center', gap: '8px',
                              textDecoration: 'none', background: 'rgba(0,0,0,0.02)', 
                              borderRadius: 'var(--r1)', padding: '8px',
                              border: '1px solid rgba(0,0,0,0.03)' 
                            }}
                          >
                            <img src={prod.image} alt={prod.name} style={{ width: '32px', height: '32px', objectFit: 'contain' }} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--txt)' }}>{prod.name}</span>
                          </Link>
                        ))}
                      </div>
                      <Link to={`/vehicles?category=${hoveredCategory}`} onClick={() => setIsMenuOpen(false)} style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--elec)', textDecoration: 'underline' }}>{language === 'ne' ? `सबै ${hoveredCategory === 'twoWheeler' ? '२ पाङ्ग्रेहरू' : '३ पाङ्ग्रेहरू'} हेर्नुहोस्` : `View all ${hoveredCategory === 'twoWheeler' ? 'Two Wheelers' : 'Three Wheelers'}`}</Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/dealers" onClick={() => setIsMenuOpen(false)} className={location.pathname === '/dealers' ? 'active' : ''}>{t.dealers}</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className={location.pathname === '/contact' ? 'active' : ''}>{t.contact}</Link>
              <Link to="/contact" className="btn-ride" style={{ textAlign: 'center' }} onClick={() => setIsMenuOpen(false)}>{language === 'ne' ? 'टेस्ट राइड बुक गर्नुहोस्' : 'Book Test Ride'}</Link>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
