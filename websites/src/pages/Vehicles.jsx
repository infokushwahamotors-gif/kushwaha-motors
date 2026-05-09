import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Battery, Shield, Users, ArrowRight, CheckCircle2, Cpu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ParticleField from '../components/ParticleField';
import ProductCard from '../components/ProductCard';
import { PRODUCTS } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

// Map type param keywords to product type strings
const TYPE_KEYWORDS = {
  passenger: ['passenger', 'rickshaw', 'e-rickshaw'],
  cargo: ['cargo', 'loader'],
  school: ['school'],
};

const Vehicles = () => {
  const { language } = useLanguage();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const typeFilter = queryParams.get('type'); // e.g. 'passenger', 'cargo', 'school'

  let displayedProducts;
  if (category && PRODUCTS[category]) {
    let pool = PRODUCTS[category];
    if (typeFilter && TYPE_KEYWORDS[typeFilter]) {
      const keywords = TYPE_KEYWORDS[typeFilter];
      pool = pool.filter(p => {
        const typeEn = typeof p.type === 'object' ? p.type.en : p.type;
        return keywords.some(kw => typeEn.toLowerCase().includes(kw));
      });
    }
    displayedProducts = pool;
  } else {
    displayedProducts = [...PRODUCTS.twoWheeler, ...PRODUCTS.threeWheeler];
  }

  const isTwoWheeler = category === 'twoWheeler';
  const isThreeWheeler = category === 'threeWheeler';
  const hasDedicatedBanner = isTwoWheeler || isThreeWheeler;

  const getHeroLabel = () => {
    if (isTwoWheeler) return language === 'ne' ? 'स्कुटर पोर्टफोलियो' : 'Scooter Portfolio';
    if (isThreeWheeler) return language === 'ne' ? 'इ-रिक्शा फ्लिट' : 'E-Rickshaw Fleet';
    return language === 'ne' ? 'मोडेल क्याटलग' : 'Model Catalog';
  };

  const getHeroTitle = () => {
    if (isTwoWheeler) return language === 'ne' ? 'इलेक्ट्रिक स्कुटर लाइनअप' : 'Electric Scooter Lineup';
    if (isThreeWheeler) return language === 'ne' ? 'शक्तिशाली इ-रिक्शा समाधान' : 'Powerful E-Rickshaw Solutions';
    return language === 'ne' ? 'प्रिमियम सवारी क्याटलग' : 'Premium Vehicle Catalog';
  };

  const getHeroSubtitle = () => {
    if (isTwoWheeler) return language === 'ne' ? 'नेपालका सडकहरूका लागि निर्मित, पूर्ण इलेक्ट्रिक र उच्च प्रदर्शन गर्ने आधुनिक फ्युचरिस्टिक स्कुटरहरू।' : 'Built for Nepal\'s roads, fully electric and high-performance modern futuristic scooters.';
    if (isThreeWheeler) return language === 'ne' ? 'नेपालमा व्यावसायिक र दिगो यातायातका लागि डिजाइन गरिएको शक्तिशाली एवं सुरक्षित विद्युतीय रिक्शाहरू।' : 'Powerful and safe electric rickshaws designed for commercial and sustainable transport in Nepal.';
    return language === 'ne' ? 'नेपालका लागि डिज़ाइन गरिएको शक्तिशाली, भरपर्दो र किफायती विद्युतीय सवारी।' : 'Powerful, reliable and affordable electric vehicles designed for Nepal.';
  };

  return (
    <div>
      <section style={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: '#000'
      }}>
        <style>{`
          .fleet-hero-container {
            width: 100%;
            aspect-ratio: 1.8 / 1;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          @media (max-width: 1024px) {
            .fleet-hero-container { aspect-ratio: 1 / 1; min-height: 450px; }
          }
          @media (max-width: 640px) {
            .fleet-hero-container { aspect-ratio: 1 / 1.3; }
          }
        `}</style>
        <div className="fleet-hero-container">
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
                {getHeroLabel()}
              </div>
              <h1 style={{ fontWeight: 900, letterSpacing: '-3px', marginBottom: 20, color: '#fff', textShadow: '0 4px 30px rgba(0,0,0,0.6)' }}>
                {getHeroTitle()}
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem', maxWidth: 650, margin: '0 auto', fontWeight: 500 }}>
                {getHeroSubtitle()}
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
