import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Battery, Shield, ArrowLeft, CheckCircle2, Cpu, Calendar, Star, TrendingUp, Palette, MessageCircle } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ParticleField from '../components/ParticleField';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';

const ProductDetails = () => {
  const { language } = useLanguage();
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState(null);
  const isNep = language === 'ne';

  let product = null;
  let categoryName = '';
  
  // Search through all categories for the product
  for (const category in PRODUCTS) {
    const found = PRODUCTS[category].find(p => p.id === id);
    if (found) {
      product = found;
      categoryName = category;
      break;
    }
  }

  // Helper to handle bilingual data if present, else fallback
  const getVal = (val) => {
    if (!val) return '';
    if (typeof val === 'object' && val[language]) return val[language];
    return val;
  };

  // Set default color when product is loaded
  useEffect(() => {
    if (product && product.availableColors && !selectedColor) {
      setSelectedColor(product.availableColors[0]);
    }
  }, [product, selectedColor]);

  // Get Suggested Products (up to 3) in the same category, excluding the current one
  const suggestedProducts = PRODUCTS[categoryName]
    ?.filter(p => p.id !== id)
    .slice(0, 3) || [];

  // Scroll to top on mount and whenever ID changes (for when clicking on suggested products)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: 20 }}>{isNep ? 'सवारी साधन फेला परेन' : 'Vehicle Not Found'}</h2>
        <Link to="/vehicles" className="btn-outline">{isNep ? 'फ्लिटमा फर्कनुहोस्' : 'Back to Fleet'}</Link>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '80px' }}>

      {/* Hero Section */}
      <section style={{ padding: 'clamp(100px, 15vw, 160px) 0 60px', position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <ParticleField count={100} opacity={0.6} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 800px at 50% 20%, ${product.accent}20 0%, transparent 80%)`, pointerEvents: 'none' }} />
        
        <div className="container">
          <div style={{ position: 'relative', zIndex: 2 }}>
            <Link to="/vehicles" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--txt-2)', textDecoration: 'none', marginBottom: 40, fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: 30, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)' }}>
              <ArrowLeft size={14} /> {isNep ? 'फिर्ता' : 'Back to Fleet'}
            </Link>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px 60px', alignItems: 'center' }}>
              {/* Left Content */}
              <div style={{ flex: '1 1 320px' }}>
                <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration: 0.5 }}>
                  <div className="hud-label" style={{ marginBottom: 16, borderColor: product.accent, color: product.accent }}>
                    {getVal(product.type)} {isNep ? 'अवलोकन' : 'Overview'}
                  </div>
                  <h1 style={{ fontWeight: 900, letterSpacing: '-2px', marginBottom: 15, lineHeight: 1.05 }}>
                    {product.name}
                  </h1>
                  <p style={{ color: 'var(--txt-2)', fontSize: 'clamp(1rem, 3vw, 1.25rem)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 25, fontWeight: 600 }}>
                    <span style={{ color: product.accent, marginRight: 10 }}>//</span> {getVal(product.tagline)}
                  </p>
                  
                  <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: 16, borderLeft: `4px solid ${product.accent}`, marginBottom: 30 }}>
                    <p style={{ color: 'var(--txt-2)', lineHeight: 1.8 }}>
                      {isNep ? 'नेपालको बाटोको लागि डिजाइन गरिएको उत्कृष्ट विद्युतीय सवारीको अनुभव लिनुहोस्।' : 'Experience the best electric vehicle designed for Nepal\'s roads.'}
                    </p>
                  </div>

                  {/* Color Selection */}
                  {product.availableColors && (
                    <div style={{ marginBottom: 35 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 15, color: 'var(--txt-2)', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        <Palette size={14} color={product.accent} /> {isNep ? 'रङहरू' : 'Colors'}: <span style={{ color: '#fff' }}>{selectedColor?.name}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 12 }}>
                        {product.availableColors.map((color) => (
                          <motion.button
                            key={color.name}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedColor(color)}
                            style={{
                              width: 32, height: 32, borderRadius: '50%',
                              background: color.hex,
                              border: `2px solid ${selectedColor?.name === color.name ? '#fff' : 'transparent'}`,
                              boxShadow: selectedColor?.name === color.name ? `0 0 10px ${color.hex}` : '0 4px 10px rgba(0,0,0,0.2)',
                              cursor: 'pointer', padding: 0,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 20 }}>
                    <Link to="/contact" className="btn-primary" style={{ background: `linear-gradient(135deg, ${product.accent}, #000)`, color: '#fff', border: `1px solid ${product.accent}`, padding: '14px 28px', width: '100%', justifyContent: 'center' }}>
                      {isNep ? 'बुक गर्नुहोस्' : 'Book Now'} <Zap size={18} />
                    </Link>
                  </div>
                </motion.div>
              </div>
              
              {/* Right Image */}
              <div style={{ flex: '1 1 320px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 50% 50% at 50% 50%, ${product.accent}40 0%, transparent 100%)`, filter: 'blur(60px)', zIndex: 0 }} />
                
                <motion.img 
                  key={product.image}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '100%', maxWidth: '600px', position: 'relative', zIndex: 1, filter: `drop-shadow(0 20px 40px ${product.accent}50)` }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Specs & Features block */}
      <section className="container" style={{ marginTop: 20, marginBottom: 60 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 30 }}>
          
          {/* Engineering / Specifications */}
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="cyber-card" style={{ padding: 'clamp(24px, 5vw, 45px)', borderColor: `${product.accent}30`, position: 'relative', overflow: 'hidden', background: '#fff' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: 35, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800, color: '#111' }}>
              <Cpu size={24} color={product.accent} /> {isNep ? 'कोर इन्जिनियरिङ' : 'Core Engineering'}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { label: isNep ? 'मोटर' : 'Motor', val: getVal(product.specs.motor), ic: <Zap size={18} color="#444" /> },
                { label: isNep ? 'ब्याट्री' : 'Battery', val: getVal(product.specs.battery), ic: <Battery size={18} color="#444" /> },
                { label: isNep ? 'रेन्ज' : 'Range', val: getVal(product.specs.range), ic: <TrendingUp size={18} color="#444" /> },
                { label: product.specs.speed ? (isNep ? 'गति' : 'Speed') : (isNep ? 'क्षमता' : 'Capacity'), val: getVal(product.specs.speed || product.specs.capacity), ic: <Shield size={18} color="#444" /> }
              ].map((spec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: 15 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {spec.ic}
                    <span style={{ color: '#444', fontWeight: 600 }}>{spec.label}</span>
                  </div>
                  <span style={{ fontWeight: 800, color: '#111' }}>{spec.val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Premium Features */}
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="cyber-card" style={{ padding: 'clamp(24px, 5vw, 45px)', borderColor: `${product.accent}30`, position: 'relative', overflow: 'hidden' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: 35, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800 }}>
              <Star size={24} color={product.accent} /> {isNep ? 'विशेषताहरू' : 'Features'}
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {((product.images && product.images.length > 0) ? product.features.slice(0, 4) : product.features).map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,0.03)', padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ background: `${product.accent}20`, padding: 8, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 color={product.accent} size={20} />
                  </div>
                  <span style={{ fontWeight: 600 }}>{getVal(f)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      {product.images && product.images.length > 0 && (
        <section className="container" style={{ marginBottom: 80 }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontWeight: 900, letterSpacing: '-1px' }}>
              {isNep ? 'ग्यालरी' : 'Gallery'} <span style={{ color: product.accent }}>&</span> {isNep ? 'विशेषताहरू' : 'Features'}
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
            {product.images.map((img, index) => {
              const galleryFeatures = product.features.slice(4);
              const fetchCount = Math.ceil(galleryFeatures.length / product.images.length) || 1;
              const featuresChunk = galleryFeatures.slice(index * fetchCount, (index + 1) * fetchCount);
              const isEven = index % 2 === 0;

              return (
                <div key={index} style={{ 
                  display: 'flex', 
                  flexDirection: isEven ? 'row' : 'row-reverse', 
                  alignItems: 'center', 
                  gap: 40,
                  flexWrap: 'wrap'
                }}>
                  {/* Photo Side */}
                  <div style={{ flex: '1 1 320px' }}>
                    <div style={{ padding: '15px', background: `radial-gradient(ellipse at center, ${product.accent}20 0%, transparent 70%)`, borderRadius: 30 }}>
                      <img src={img} alt="detail" style={{ width: '100%', borderRadius: 20, boxShadow: `0 20px 40px rgba(0,0,0,0.2)` }} />
                    </div>
                  </div>

                  {/* Features Side */}
                  <div style={{ flex: '1 1 320px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {featuresChunk.map((f, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, background: `${product.accent}0A`, padding: '16px 20px', borderRadius: 12, border: `1px solid ${product.accent}30` }}>
                          <div style={{ background: `${product.accent}15`, padding: 8, borderRadius: 8 }}>
                            <CheckCircle2 color={product.accent} size={20} />
                          </div>
                          <span style={{ fontWeight: 600 }}>{getVal(f)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Suggested Products Section */}
      {suggestedProducts.length > 0 && (
        <section style={{ padding: '60px 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <h2 style={{ fontWeight: 900, letterSpacing: '-1px' }}>
                {isNep ? 'समान' : 'Similar'} <span style={{ color: product.accent }}>{isNep ? 'सवारी साधनहरू' : 'Vehicles'}</span>
              </h2>
            </div>
            
            <div className="grid-auto">
              {suggestedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
