import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Battery, Shield, ArrowLeft, CheckCircle2, Cpu, Calendar, Star, TrendingUp } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import ParticleField from '../components/ParticleField';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();

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
        <h2 style={{ fontSize: '2rem', marginBottom: 20 }}>Vehicle Not Found</h2>
        <Link to="/vehicles" className="btn-outline">Return to Fleet</Link>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Hero Section */}
      <section style={{ padding: '160px 0 60px', position: 'relative', overflow: 'hidden', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <ParticleField count={100} opacity={0.6} />
        <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle 800px at 50% 20%, ${product.accent}20 0%, transparent 80%)`, pointerEvents: 'none' }} />
        
        <div className="container">
          <div style={{ position: 'relative', zIndex: 2 }}>
            <Link to="/vehicles" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--txt-2)', textDecoration: 'none', marginBottom: 40, fontSize: '0.95rem', border: '1px solid rgba(255,255,255,0.1)', padding: '8px 18px', borderRadius: 30, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(10px)', transition: 'all 0.3s ease' }} onMouseOver={e => e.currentTarget.style.borderColor = product.accent} onMouseOut={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}>
              <ArrowLeft size={16} /> Back to Fleet Portfolio
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
                  <p style={{ color: 'var(--txt-2)', fontFamily: "'Space Mono', monospace", fontSize: '1.25rem', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: 35, fontWeight: 600 }}>
                    <span style={{ color: product.accent, marginRight: 10 }}>//</span> {product.tagline}
                  </p>
                  
                  <div style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: 16, borderLeft: `4px solid ${product.accent}`, marginBottom: 40 }}>
                    <p style={{ color: 'var(--txt-2)', lineHeight: 1.8, fontSize: '1.1rem' }}>
                      Experience the pinnacle of electric mobility with the {product.name}. Designed for peak performance, extreme longevity, and seamless operation under heavy workloads.
                    </p>
                  </div>

                  <div style={{ display: 'flex', gap: 20 }}>
                    <Link to="/contact" className="btn-primary" style={{ background: `linear-gradient(135deg, ${product.accent}, #000)`, color: '#fff', border: `1px solid ${product.accent}`, padding: '16px 32px', fontSize: '1.1rem', boxShadow: `0 10px 30px ${product.accent}40` }}>
                      Book Test Ride <Zap size={18} />
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
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: 0.1 }} className="cyber-card" style={{ padding: 45, borderColor: `${product.accent}30`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 150, height: 150, background: `radial-gradient(circle at top right, ${product.accent}20, transparent)`, pointerEvents: 'none' }}></div>
            
            <h3 style={{ fontSize: '1.4rem', marginBottom: 35, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800 }}>
              <Cpu size={24} color={product.accent} /> Core Engineering
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { label: 'Motor Rating', val: product.specs.motor, ic: <Zap size={18} color="var(--txt-2)" /> },
                { label: 'Energy Capacity', val: product.specs.battery, ic: <Battery size={18} color="var(--txt-2)" /> },
                { label: 'Estimated Range', val: product.specs.range, ic: <TrendingUp size={18} color="var(--txt-2)" /> },
                { label: product.specs.speed ? 'Max Velocity' : 'Load / Seating Capacity', val: product.specs.speed || product.specs.capacity, ic: <Shield size={18} color="var(--txt-2)" /> }
              ].map((spec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: 15 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    {spec.ic}
                    <span style={{ color: 'var(--txt-2)', fontSize: '1.05rem' }}>{spec.label}</span>
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: '#fff' }}>{spec.val}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Premium Features */}
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay: 0.2 }} className="cyber-card" style={{ padding: 45, borderColor: `${product.accent}30`, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 150, height: 150, background: `radial-gradient(circle at top right, ${product.accent}20, transparent)`, pointerEvents: 'none' }}></div>

            <h3 style={{ fontSize: '1.4rem', marginBottom: 35, display: 'flex', alignItems: 'center', gap: 12, fontWeight: 800 }}>
              <Star size={24} color={product.accent} /> Premium Add-ons
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              {product.features.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,0.03)', padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'translateX(10px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateX(0px)'}>
                  <div style={{ background: `${product.accent}20`, padding: 8, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <CheckCircle2 color={product.accent} size={20} />
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '1.05rem', letterSpacing: '0.5px' }}>{f}</span>
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,0.03)', padding: '16px 20px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.05)', transition: 'transform 0.3s ease' }} onMouseOver={e => e.currentTarget.style.transform = 'translateX(10px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateX(0px)'}>
                  <div style={{ background: `${product.accent}20`, padding: 8, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar color={product.accent} size={20} />
                  </div>
                  <span style={{ fontWeight: 600, fontSize: '1.05rem', letterSpacing: '0.5px' }}>Comprehensive Warranty Included</span>
              </div>
            </div>
          </motion.div>
          
        </div>
      </section>

      {/* Suggested Products Section */}
      {suggestedProducts.length > 0 && (
        <section style={{ padding: '80px 0', background: 'rgba(0,0,0,0.3)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: 60 }}>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, letterSpacing: '-1px' }}>
                Similar <span style={{ color: product.accent }}>Vehicles</span>
              </h2>
              <p style={{ color: 'var(--txt-2)', marginTop: 10, fontSize: '1.1rem' }}>Explore other top-tier options in the {categoryName === 'threeWheeler' ? 'Three Wheeler' : 'Two Wheeler'} series.</p>
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
