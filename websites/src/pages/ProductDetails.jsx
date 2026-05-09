import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Battery, Shield, ArrowLeft, CheckCircle2, Cpu, Calendar, Star, TrendingUp, Palette, MessageCircle } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ParticleField from '../components/ParticleField';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedColor, setSelectedColor] = useState(null);

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
        <h2 style={{ fontSize: '2rem', marginBottom: 20 }}>सवारी साधन फेला परेन</h2>
        <Link to="/vehicles" className="btn-outline">फ्लिटमा फर्कनुहोस्</Link>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '100px' }}>

      {/* ── Floating Price Widget (Hidden as per request) ── */}
      {/* 
      {product.price && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: 'spring', stiffness: 130, damping: 16 }}
          style={{
            position: 'fixed',
            bottom: 40,
            left: 40,
            zIndex: 999,
            width: 148,
            height: 148,
            borderRadius: '50%',
            background: '#fff',
            border: '2.5px dashed #E07B39',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
            cursor: 'default',
          }}
          title="Ex-Showroom Price"
        >
          <span style={{ fontSize: '0.6rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 2 }}>एक्स-शोरुम</span>
          <span style={{ fontSize: '1.05rem', fontWeight: 900, color: '#111', letterSpacing: '-0.5px', lineHeight: 1.2 }}>
            Rs.{product.price.amount}
          </span>
          <a
            href={`https://wa.me/9779821107355?text=I'm%20interested%20in%20the%20${encodeURIComponent(product.name)}%20(Rs.${encodeURIComponent(product.price.amount)})`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: 8,
              fontSize: '0.6rem',
              fontWeight: 800,
              color: '#25D366',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              letterSpacing: '0.3px',
            }}
          >
            <MessageCircle size={11} fill="#25D366" /> सोधपुछ गर्नुहोस्
          </a>
        </motion.div>
      )}
      */}

      {/* Hero Section */}
      <section style={{ padding: '160px 0 60px', position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <ParticleField count={100} opacity={0.6} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 800px at 50% 20%, ${product.accent}20 0%, transparent 80%)`, pointerEvents: 'none' }} />
        
        <div className="container">
          <div style={{ position: 'relative', zIndex: 2 }}>
            <Link to="/vehicles" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--txt-2)', textDecoration: 'none', marginBottom: 40, fontSize: '0.95rem', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 18px', borderRadius: 30, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }} onMouseOver={e => e.currentTarget.style.borderColor = product.accent} onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}>
              <ArrowLeft size={16} /> फ्लिट पोर्टफोलियोमा फर्कनुहोस्
            </Link>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 60, alignItems: 'center' }}>
              {/* Left Content */}
              <div style={{ flex: '1 1 400px' }}>
                <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration: 0.5 }}>
                  <div className="hud-label" style={{ marginBottom: 16, borderColor: product.accent, color: product.accent }}>
                    {product.type} Overview
                  </div>
                  <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 900, letterSpacing: '-2px', marginBottom: 15, lineHeight: 1.05, textShadow: `0 0 40px ${product.accent}40` }}>
                    {product.name}
                  </h1>
                  <p style={{ color: 'var(--txt-2)', fontSize: '1.25rem', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 25, fontWeight: 600 }}>
                    <span style={{ color: product.accent, marginRight: 10 }}>//</span> {product.tagline}
                  </p>
                  
                  <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: 16, borderLeft: `4px solid ${product.accent}`, marginBottom: 30 }}>
                    <p style={{ color: 'var(--txt-2)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                      नेपालको बाटोको लागि डिजाइन गरिएको उत्कृष्ट विद्युतीय सवारीको अनुभव लिनुहोस्। उच्च प्रदर्शन र लामो आयुको लागि निर्मित।
                    </p>
                  </div>

                  {/* Color Selection */}
                  {product.availableColors && (
                    <div style={{ marginBottom: 35 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 15, color: 'var(--txt-2)', fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        <Palette size={16} color={product.accent} /> उपलब्ध रङहरू: <span style={{ color: '#fff' }}>{selectedColor?.name}</span>
                      </div>
                      <div style={{ display: 'flex', gap: 12 }}>
                        {product.availableColors.map((color) => (
                          <motion.button
                            key={color.name}
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSelectedColor(color)}
                            style={{
                              width: 36, height: 36, borderRadius: '50%',
                              background: color.hex,
                              border: `2px solid ${selectedColor?.name === color.name ? '#fff' : 'transparent'}`,
                              boxShadow: selectedColor?.name === color.name ? `0 0 15px ${color.hex}` : '0 4px 10px rgba(0,0,0,0.3)',
                              cursor: 'pointer',
                              padding: 0,
                              position: 'relative',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            {selectedColor?.name === color.name && (
                              <motion.div layoutId="color-outline" style={{ position: 'absolute', inset: -5, borderRadius: '50%', border: `1px solid ${color.hex}`, opacity: 0.5 }} />
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: 20 }}>
                    <Link to="/contact" className="btn-primary" style={{ background: `linear-gradient(135deg, ${product.accent}, #000)`, color: '#fff', border: `1px solid ${product.accent}`, padding: '16px 32px', fontSize: '1.1rem', boxShadow: `0 10px 30px ${product.accent}40` }}>
                      टेस्ट राइड बुक गर्नुहोस् <Zap size={18} />
                    </Link>
                  </div>
                </motion.div>
              </div>
              
              {/* Right Image */}
              <div style={{ flex: '1 1 500px', position: 'relative' }}>
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse 50% 50% at 50% 50%, ${product.accent}40 0%, transparent 100%)`, filter: 'blur(60px)', zIndex: 0 }} />
                
                {/* Decorative Elements */}
                <div style={{ position: 'absolute', top: -30, right: -20, borderTop: `2px solid ${product.accent}`, borderRight: `2px solid ${product.accent}`, width: 60, height: 60, opacity: 0.5 }}></div>
                <div style={{ position: 'absolute', bottom: -30, left: -20, borderBottom: `2px solid ${product.accent}`, borderLeft: `2px solid ${product.accent}`, width: 60, height: 60, opacity: 0.5 }}></div>

                <motion.img 
                  key={product.image}
                  initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '100%', maxWidth: '800px', position: 'relative', zIndex: 1, filter: `drop-shadow(0 30px 50px ${product.accent}70)` }} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dive Specs & Features block */}
      <section className="container" style={{ marginTop: 20, marginBottom: 80 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 30 }}>
          
          {/* Engineering / Specifications */}
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: 0.1 }} className="cyber-card" style={{ padding: 45, borderColor: `${product.accent}30`, position: 'relative', overflow: 'hidden', background: '#fff' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 150, height: 150, background: `radial-gradient(circle at top right, ${product.accent}20, transparent)`, pointerEvents: 'none' }}></div>
            
            <h3 style={{ fontSize: '1.4rem', marginBottom: 35, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800, color: '#111' }}>
              <Cpu size={24} color={product.accent} /> Core Engineering
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { label: 'मोटर क्षमता', val: product.specs.motor, ic: <Zap size={18} color="#444" /> },
                { label: 'ब्याट्री क्षमता', val: product.specs.battery, ic: <Battery size={18} color="#444" /> },
                { label: 'अनुमानित रेन्ज', val: product.specs.range, ic: <TrendingUp size={18} color="#444" /> },
                { label: product.specs.speed ? 'अधिकतम गति' : 'भार / बस्ने क्षमता', val: product.specs.speed || product.specs.capacity, ic: <Shield size={18} color="#444" /> }
              ].map((spec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.05)', paddingBottom: 15 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {spec.ic}
                    <span style={{ color: '#444', fontSize: '1.05rem', fontWeight: 600 }}>{spec.label}</span>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '1.15rem', color: '#111' }}>{spec.val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Premium Features */}
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: 0.2 }} className="cyber-card" style={{ padding: 45, borderColor: `${product.accent}30`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 150, height: 150, background: `radial-gradient(circle at top right, ${product.accent}20, transparent)`, pointerEvents: 'none' }}></div>

            <h3 style={{ fontSize: '1.4rem', marginBottom: 35, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800 }}>
              <Star size={24} color={product.accent} /> Premium Features
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {((product.images && product.images.length > 0) ? product.features.slice(0, 4) : product.features).map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,0.03)', padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'translateX(10px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateX(0px)'}>
                  <div style={{ background: `${product.accent}20`, padding: 8, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 color={product.accent} size={20} />
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '1.05rem', letterSpacing: '0.5px' }}>{f}</span>
                </div>
              ))}
              {!(product.images && product.images.length > 0) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,0.03)', padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'translateX(10px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateX(0px)'}>
                    <div style={{ background: `${product.accent}20`, padding: 8, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Calendar color={product.accent} size={20} />
                    </div>
                    <span style={{ fontWeight: 600, fontSize: '1.05rem', letterSpacing: '0.5px' }}>विस्तृत वारेन्टी समावेश</span>
                </div>
              )}
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Zig-Zag Gallery & Features */}
      {product.images && product.images.length > 0 && (
        <section className="container" style={{ marginBottom: 100 }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-1px' }}>
              Gallery <span style={{ color: product.accent }}>&</span> Features
            </h2>
            <p style={{ color: 'var(--txt-2)', marginTop: 10, fontSize: '1.1rem' }}>{product.name} को विस्तृत जानकारी हेर्नुहोस्</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 80 }}>
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
                  gap: 50,
                  flexWrap: 'wrap'
                }}>
                  
                  {/* Photo Side */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: 'spring' }}
                    style={{ flex: '1 1 400px', position: 'relative' }}
                  >
                    <div style={{ padding: '20px', background: `radial-gradient(ellipse at center, ${product.accent}20 0%, transparent 70%)`, borderRadius: 30 }}>
                      <img src={img} alt={`${product.name} detail`} style={{ 
                        width: '100%', 
                        borderRadius: 20,
                        boxShadow: `0 20px 50px rgba(0,0,0,0.3)`,
                        border: `1px solid ${product.accent}30`,
                        transition: 'transform 0.5s ease'
                      }} 
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
                      onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    </div>
                  </motion.div>

                  {/* Features Side */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    style={{ flex: '1 1 400px' }}
                  >
                    <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 30, color: 'var(--txt)', display: 'flex', alignItems: 'center', gap: 12 }}>
                      <Star color={product.accent} /> Built for Excellence
                    </h3>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {featuresChunk.map((f, i) => (
                        <div key={i} style={{ 
                          display: 'flex', alignItems: 'center', gap: 16, 
                          background: `${product.accent}0A`, padding: '16px 20px', 
                          borderRadius: 12, border: `1px solid ${product.accent}30`,
                          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                        }}
                        onMouseOver={e => {
                          e.currentTarget.style.transform = isEven ? 'translateX(10px)' : 'translateX(-10px)';
                          e.currentTarget.style.boxShadow = `0 4px 15px ${product.accent}20`;
                        }} 
                        onMouseOut={e => {
                          e.currentTarget.style.transform = 'translateX(0px)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}>
                          <div style={{ background: `${product.accent}15`, padding: 8, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <CheckCircle2 color={product.accent} size={20} />
                          </div>
                          <span style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.5px', color: 'var(--txt)' }}>{f}</span>
                        </div>
                      ))}
                      
                      {featuresChunk.length === 0 && (
                         <div style={{ 
                          display: 'flex', alignItems: 'center', gap: 16, 
                          background: `${product.accent}0A`, padding: '16px 20px', 
                          borderRadius: 12, border: `1px solid ${product.accent}30`
                        }}>
                          <div style={{ background: `${product.accent}15`, padding: 8, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Calendar color={product.accent} size={20} />
                          </div>
                          <span style={{ fontWeight: 600, fontSize: '1.1rem', letterSpacing: '0.5px', color: 'var(--txt)' }}>उत्कृष्ट यात्राको अनुभव लिनुहोस्</span>
                        </div>
                      )}
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Suggested Products Section */}
      {suggestedProducts.length > 0 && (
        <section style={{ padding: '80px 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-1px' }}>
                Similar <span style={{ color: product.accent }}>Vehicles</span>
              </h2>
              <p style={{ color: 'var(--txt-2)', marginTop: 10, fontSize: '1.1rem' }}>यस शृंखलाका अन्य उत्कृष्ट विकल्पहरू अन्वेषण गर्नुहोस्।</p>
            </div>
            
            <motion.div layout className="grid-auto">
              <AnimatePresence mode="popLayout">
                {suggestedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetails;
