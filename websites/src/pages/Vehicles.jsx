import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Battery, Shield, Users, ArrowRight, CheckCircle2, Cpu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ParticleField from '../components/ParticleField';

import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';

// Map type param keywords to product type strings
const TYPE_KEYWORDS = {
  passenger: ['passenger', 'rickshaw', 'e-rickshaw'],
  cargo:     ['cargo', 'loader'],
  school:    ['school'],
};

const Vehicles = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const typeFilter = queryParams.get('type'); // e.g. 'passenger', 'cargo', 'school'

  let displayedProducts;
  if (category && PRODUCTS[category]) {
    let pool = PRODUCTS[category];
    if (typeFilter && TYPE_KEYWORDS[typeFilter]) {
      const keywords = TYPE_KEYWORDS[typeFilter];
      pool = pool.filter(p =>
        keywords.some(kw => p.type.toLowerCase().includes(kw))
      );
    }
    displayedProducts = pool;
  } else {
    displayedProducts = [...PRODUCTS.twoWheeler, ...PRODUCTS.threeWheeler];
  }

  return (
    <div>
      <section style={{ padding:'160px 0 80px', position:'relative', overflow:'hidden', minHeight:'65vh', display:'flex', alignItems:'center' }}>
        <ParticleField count={70} opacity={0.55} />
        <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 70% 80% at 50% 20%, rgba(0,240,255,0.08) 0%, transparent 70%)', pointerEvents:'none' }} />

        <div className="container text-center" style={{ position:'relative', zIndex:1 }}>
          <div className="ghost" style={{ fontSize:'clamp(5rem,14vw,13rem)', marginBottom:-70 }}>FLEET</div>
          <div style={{ position:'relative', zIndex:2 }}>
            <div className="hud-label" style={{ justifyContent:'center', marginBottom:14 }}>Model Catalogue</div>
            <h1 style={{ fontSize:'clamp(2.5rem,5vw,4.5rem)', fontWeight:900, letterSpacing:'-2px', marginBottom:20 }}>
              Premium <span className="electric-text">Electric</span> Vehicles
            </h1>
            <p style={{ color:'var(--txt-2)', fontSize:'1.05rem', maxWidth:560, margin:'0 auto 0', lineHeight:1.85 }}>
              Nepal का लागि डिज़ाइन गरिएको शक्तिशाली, भरपर्दो र किफायती विद्युतीय सवारी।
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding:'20px 0 120px' }}>
        <div className="container">
          <motion.div layout className="grid-auto">
            <AnimatePresence mode="popLayout">
              {displayedProducts.map(p => <ProductCard key={p.id} product={p} />)}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Vehicles;
