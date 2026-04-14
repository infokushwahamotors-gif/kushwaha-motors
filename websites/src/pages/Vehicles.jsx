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
  cargo: ['cargo', 'loader'],
  school: ['school'],
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

  const isTwoWheeler = category === 'twoWheeler';
  const isThreeWheeler = category === 'threeWheeler';
  const hasDedicatedBanner = isTwoWheeler || isThreeWheeler;

  return (
    <div>
      <section style={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#000',
        minHeight: '60vh' // Fallback
      }}>
        {/* Banner Aspect Ratio Wrapper */}
        <div style={{
          width: '100%',
          aspectRatio: hasDedicatedBanner ? '1.8 / 1' : 'auto',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>

          {/* Particle Overlay */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
            <ParticleField count={hasDedicatedBanner ? 30 : 60} opacity={0.4} />
          </div>

          {/* Background Image/GIF (Zero-Crop) */}
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            {hasDedicatedBanner ? (
              <motion.img
                initial={{ scale: 1.05, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                src={isTwoWheeler ? "/Banner/Banner_GIF.gif" : "/Banner/2Banner_GIF.gif"}
                alt="Category Banner"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 80% at 50% 20%, rgba(0,240,255,0.12) 0%, transparent 70%)' }} />
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent 60%, rgba(0,0,0,0.7))' }} />

          </div>


          <div className="container text-center" style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ position: 'relative', zIndex: 3 }}>
              <div className="hud-label" style={{ justifyContent: 'center', marginBottom: 14, borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>
                {isTwoWheeler ? 'Scooter Portfolio' : isThreeWheeler ? 'E-Rickshaw Fleet' : 'Model Catalogue'}
              </div>
              <h1 style={{ fontSize: 'clamp(2.5rem,6vw,5.5rem)', fontWeight: 900, letterSpacing: '-3px', marginBottom: 20, color: '#fff', textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}>
                {isTwoWheeler ? 'Electric Scooter Lineup' : isThreeWheeler ? 'Powerful E-Rickshaw Solutions' : 'Premium Vehicles Catalog'}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.15rem', maxWidth: 650, margin: '0 auto', lineHeight: 1.8, fontWeight: 500, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                {isTwoWheeler
                  ? 'Nepal का सडकहरूका लागि निर्मित, पूर्ण इलेक्ट्रिक र उच्च प्रदर्शन गर्ने आधुनिक फ्युचरिस्टिक स्कुटरहरू।'
                  : isThreeWheeler
                    ? 'Nepal मा व्यावसायिक र दिगो यातायातका लागि डिजाइन गरिएको शक्तिशाली एवं सुरक्षित विद्युतीय रिक्शाहरू।'
                    : 'Nepal का लागि डिज़ाइन गरिएको शक्तिशाली, भरपर्दो र किफायती विद्युतीय सवारी।'
                }
              </p>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '20px 0 120px' }}>
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
