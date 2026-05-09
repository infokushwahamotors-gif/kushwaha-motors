import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Shield, Leaf, PlayCircle, X, ChevronRight, Radio, MessageSquare, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleField from '../components/ParticleField';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

// ── Mouse parallax tilt ─────────────────────────────────────────────────
const TiltCard = ({ children, style = {}, className = '' }) => {
  const [t, setT] = useState({ x: 0, y: 0 });
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    setT({ x: ((e.clientY - r.top) / r.height - 0.5) * -16, y: ((e.clientX - r.left) / r.width - 0.5) * 16 });
  };
  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={() => setT({ x: 0, y: 0 })} className={className}
      style={{ transform: `perspective(900px) rotateX(${t.x}deg) rotateY(${t.y}deg)`, transition: t.x === 0 ? 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' : 'transform 0.1s linear', transformStyle: 'preserve-3d', willChange: 'transform', ...style }}>
      {children}
    </div>
  );
};

// ── Animated counter ────────────────────────────────────────────────────
const Counter = ({ target, suffix = '' }) => {
  const [v, setV] = useState(0);
  useEffect(() => {
    let s = 0, step = target / 60;
    const t = setInterval(() => { s += step; if (s >= target) { setV(target); clearInterval(t); } else setV(Math.floor(s)); }, 20);
    return () => clearInterval(t);
  }, [target]);
  return <>{v.toLocaleString()}{suffix}</>;
};

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language].home;
  
  const [videoOpen, setVideoOpen] = useState(false);
  const [hoverFeature, setHoverFeature] = useState(null);
  const [currentBanner, setCurrentBanner] = useState(0);

  const BANNERS = [
    '/Banner/Gemini_Generated_Image_5uep6t5uep6t5uep (1).webp',
    '/Banner/Banner_GIF.gif',
    '/Banner/Gemini_Generated_Image_t0keb4t0keb4t0ke.webp',
    '/Banner/Gemini_Generated_Image_60b47v60b47v60b4.webp',
    '/Banner/Clean_Hero_3.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
    }, 5000)// Slower transitions for premium feel
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <style>{`
        @keyframes pulse-dot{0%,100%{opacity:1;transform:scale(1);}50%{opacity:0.6;transform:scale(1.5);}}
        .banner-slider-container {
          position: relative;
          width: 100%;
          aspect-ratio: 1.8 / 1;
          overflow: hidden;
          background: #000;
        }
        .hud-sidebar {
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 38%;
          z-index: 10;
          display: flex;
          align-items: center;
          padding-left: 5vw;
          background: linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 70%, transparent 100%);
        }
        @media (max-width: 1024px) {
          .hud-sidebar {
            width: 100%;
            background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.8) 50%, rgba(0,0,0,0.9) 100%);
            align-items: flex-end;
            padding-bottom: 80px;
            padding-left: 20px;
            padding-right: 20px;
          }
          .banner-slider-container { aspect-ratio: 1.2 / 1; }
        }
      `}</style>

      {/* ══ HERO SLIDER ══════════════════════════════════════════════════ */}
      <section className="banner-slider-container">
        {/* Background Ambient Fill & Foreground Focused Image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBanner}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, ease: "linear" }}
              style={{ position: 'absolute', inset: 0, background: '#000' }}
            >
              {/* Single Image Layer (Zero-Crop) */}
              <motion.img
                key={`${currentBanner}-fg`}
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 12, ease: "linear" }}
                src={BANNERS[currentBanner]}
                alt="Kushwaha Motors Banner"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />

              {/* Finishing HUD gradient */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.4) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.4) 100%)' }} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Professional Sidebar Hud */}
        <div className="hud-sidebar">
          <div style={{ maxWidth: 500 }}>
            {/* HUD top badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 100, padding: '6px 16px' }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--elec)', boxShadow: '0 0 10px var(--elec)', display: 'block', animation: 'pulse-dot 2s infinite' }} />
              <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>{language === 'ne' ? 'आधिकारिक बिक्रेता - नेपाल' : 'Official Dealer - Nepal'}</span>
            </motion.div>

            {/* Main headline */}
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-2px', marginBottom: 20 }}>
              <motion.span className="text-outline-white" style={{ display: 'block' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>
                {language === 'ne' ? 'विद्युतीय.' : 'Electric.'}
              </motion.span>
              <motion.span className="electric-text text-outline-white" style={{ display: 'block', fontSize: '105%' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
                {language === 'ne' ? 'प्राकृतिक.' : 'Nature.'}
              </motion.span>
              <motion.span className="text-outline-white" style={{ display: 'block' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
                {language === 'ne' ? 'शक्तिशाली.' : 'Powerful.'}
              </motion.span>
            </h1>

            {/* Subtext */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.7 }}
              style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', maxWidth: 450, lineHeight: 1.6, marginBottom: 36, fontWeight: 500 }}>
              {t.heroDesc}
            </motion.p>

            {/* CTA buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/vehicles" className="btn-cyber" style={{ padding: '16px 36px', fontSize: '0.95rem' }}>
                {t.ctaVehicles} <ArrowRight size={17} />
              </Link>
              <button onClick={() => setVideoOpen(true)} className="btn-ghost" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }}>
                <PlayCircle size={17} /> {language === 'ne' ? 'भिडियो टुर' : 'Video Tour'}
              </button>
            </motion.div>
          </div>
        </div>

        <ParticleField count={20} opacity={0.25} />


        {/* Slider Navigation Dots */}
        <div style={{ position: 'absolute', bottom: 40, display: 'flex', gap: 10, zIndex: 10 }}>
          {BANNERS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentBanner(i)}
              style={{
                width: currentBanner === i ? 30 : 10,
                height: 6,
                borderRadius: 3,
                background: currentBanner === i ? 'var(--elec)' : 'rgba(255,255,255,0.3)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <div style={{ position: 'absolute', bottom: 28, right: 40, zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700 }}>{language === 'ne' ? 'तल स्क्रोल गर्नुहोस्' : 'Scroll Down'}</span>
          <motion.div animate={{ y: [0, 7, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 22, height: 36, border: '2px solid rgba(255,255,255,0.2)', borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6 }}>
            <div style={{ width: 4, height: 8, borderRadius: 2, background: 'var(--elec)' }} />
          </motion.div>
        </div>
      </section>


      {/* ══ THREE PILLARS ════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0 100px', borderTop: '1px solid rgba(19,123,57,0.06)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(66,169,46,0.02), transparent)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="hud-label" style={{ justifyContent: 'center' }}>{language === 'ne' ? 'मुख्य सिद्धान्तहरू' : 'Core Principles'}</div>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, letterSpacing: '-2px' }}>
              <span className="electric-text">{language === 'ne' ? 'अनन्त' : 'Infinite'}</span> {language === 'ne' ? 'शक्ति' : 'Power'}
            </h2>
          </div>

          <div className="grid-3">
            {[
              { 
                icon: <Zap size={32} />, 
                title: language === 'ne' ? 'विद्युत्' : 'Electricity', 
                color: 'var(--elec)', 
                cls: '', 
                stat: '3500W', 
                stl: language === 'ne' ? 'अधिकतम मोटर' : 'Peak Motor', 
                desc: language === 'ne' ? 'अत्याधुनिक 72V लिथियम सेल, स्मार्ट पावर व्यवस्थापन, र रिजेनेरेटिभ ब्रेकिङ — शक्ति जसको अनुभव तपाईंले गर्न सक्नुहुन्छ।' : 'Advanced 72V lithium cells, smart power management, and regenerative braking — power you can feel.' 
              },
              { 
                icon: <Leaf size={32} />, 
                title: language === 'ne' ? 'प्रकृति' : 'Nature', 
                color: 'var(--nature)', 
                cls: 'nature', 
                stat: '0g', 
                stl: 'CO₂/KM', 
                desc: language === 'ne' ? 'शून्य प्रत्यक्ष उत्सर्जन। नेपालको जलविद्युतको अर्थ हो तपाईंको यात्रा ईन्धनले होइन, पहाडले चलाउँछ।' : 'Zero direct emissions. Nepal\'s hydropower means your journey is powered by the mountains, not fuel.' 
              },
              { 
                icon: <Shield size={32} />, 
                title: language === 'ne' ? 'शक्ति' : 'Security', 
                color: 'var(--power)', 
                cls: 'power', 
                stat: '100%', 
                stl: language === 'ne' ? 'सबै बाटोको लागि' : 'For Every Road', 
                desc: language === 'ne' ? 'हिल-क्लाइम्ब सेन्सर, एन्टी-थेफ्ट प्रणाली, डुअल-डिस्क ब्रेक — रोक्न नसकिने, सुरक्षित, र स्मार्ट।' : 'Hill-climb sensors, anti-theft systems, dual-disc brakes — unstoppable, safe, and smart.' 
              },
            ].map((item, i) => (
              <TiltCard key={item.title}>
                <motion.div className={`cyber-card holo ${item.cls}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                  style={{ padding: '44px 38px', height: '100%' }}
                  onMouseEnter={() => setHoverFeature(i)} onMouseLeave={() => setHoverFeature(null)}
                >
                  {/* Soft BG orb */}
                  <div style={{ position: 'absolute', top: -30, left: -30, width: 200, height: 200, background: `radial-gradient(circle, ${item.color}15 0%, transparent 65%)`, pointerEvents: 'none' }} />

                  {/* Icon */}
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: `${item.color}15`, color: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, transition: 'all 0.4s' }}>
                    {item.icon}
                  </div>

                  <h3 style={{ fontSize: '1.7rem', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 14, color: 'var(--txt)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--txt-2)', lineHeight: 1.8, marginBottom: 28, fontSize: '0.95rem' }}>{item.desc}</p>

                  <div style={{ borderTop: `1px solid ${item.color}15`, paddingTop: 22 }}>
                    <div style={{ fontSize: '2.4rem', fontWeight: 900, color: item.color, lineHeight: 1 }}>{item.stat}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--txt-3)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: 8, fontWeight: 700 }}>{item.stl}</div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══ LIFESTYLE BANNER ══════════════════════════════════════════ */}
      <section style={{ height: '60vh', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="/Banner/Banner.webp"
            alt="Lifestyle"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.8), transparent, rgba(0,0,0,0.8))' }} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, color: '#fff', letterSpacing: '-2px', marginBottom: 20 }}>
              {language === 'ne' ? 'एक नयाँ' : 'A New'} <span className="electric-text">{language === 'ne' ? 'सडक अनुभव' : 'Road Experience'}</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', maxWidth: 600, margin: '0 auto' }}>
              {language === 'ne' ? 'पहाडको लागि डिजाइन गरिएको, सहरको लागि निर्माण गरिएको। गतिशीलताको अर्को पुस्ताको अनुभव लिनुहोस्।' : 'Designed for the mountains, built for the city. Experience the next generation of mobility.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ══ MODELS ═══════════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0 120px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src="/Banner/Gemini_Generated_Image_t0keb4t0keb4t0ke.webp"
            alt="Showroom BG"
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.05, filter: 'grayscale(100%)' }}
          />
        </div>
        <ParticleField count={20} opacity={0.6} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
            <div>
              <div className="hud-label">{language === 'ne' ? 'हाम्रा सवारीहरू' : 'Our Vehicles'}</div>
              <h2 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, letterSpacing: '-2px' }}>
                {language === 'ne' ? 'आफ्नो' : 'Choose Your'} <span className="electric-text">{language === 'ne' ? 'शक्ति' : 'Power'}</span> {language === 'ne' ? 'छान्नुहोस्' : ''}
              </h2>
            </div>
            <Link to="/vehicles" className="btn-ghost" style={{ textDecoration: 'none' }}>{language === 'ne' ? 'सबै मोडलहरू हेर्नुहोस्' : 'View All Models'} <ArrowRight size={14} /></Link>
          </div>

          <div className="grid-2">
            {[
              { 
                title: language === 'ne' ? '२-पाङ्ग्रे' : '2-Wheelers', 
                sub: language === 'ne' ? 'सहरी स्कुटर' : 'Urban Scooters', 
                desc: language === 'ne' ? 'छरितो र आकर्षक। नेपालको सहरी सडकको लागि निर्माण गरिएको।' : 'Agile and stylish. Built for Nepal\'s urban roads.', 
                img: '/red_scooter.webp', 
                color: 'var(--elec)', 
                badge: language === 'ne' ? '१.८ लाख देखि' : 'From 1.8 Lakhs' 
              },
              { 
                title: language === 'ne' ? '३-पाङ्ग्रे' : '3-Wheelers', 
                sub: language === 'ne' ? 'यात्री तथा कार्गो' : 'Passenger & Cargo', 
                desc: language === 'ne' ? 'यात्री वा कार्गो ढुवानी — हरेक बाटोमा उत्कृष्ट शक्ति।' : 'Passenger or cargo transport — peak power on every road.', 
                img: '/auto.webp', 
                color: 'var(--nature)', 
                badge: language === 'ne' ? '२.८ लाख देखि' : 'From 2.8 Lakhs' 
              },
            ].map((m, i) => (
              <TiltCard key={m.title}>
                <motion.div className="cyber-card holo" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  style={{ overflow: 'hidden', padding: 0, borderColor: `${m.color}20`, height: 420 }}>

                  {/* Left: info */}
                  <div style={{ display: 'flex', height: '100%' }}>
                    <div style={{ flex: 1, padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 16, background: `linear-gradient(135deg, ${m.color}08 0%, transparent 70%)` }}>
                      <div>
                        <span className="badge-e" style={{ background: `${m.color}15`, color: m.color }}>{m.title}</span>
                        <h3 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 8, marginTop: 16, color: 'var(--txt)' }}>{m.sub}</h3>
                        <p style={{ color: 'var(--txt-2)', lineHeight: 1.7, fontSize: '0.98rem' }}>{m.desc}</p>
                      </div>
                      
                      <Link to="/vehicles" className="btn-outline" style={{ textDecoration: 'none', borderColor: `${m.color}40`, color: m.color, alignSelf: 'flex-start', marginTop: 'auto' }}>
                        {language === 'ne' ? 'सबै मोडलहरू हेर्नुहोस्' : 'View All Models'} <ArrowRight size={13} />
                      </Link>
                    </div>

                    {/* Right: image */}
                    <div style={{ width: '45%', position: 'relative', overflow: 'hidden', background: `radial-gradient(ellipse at 50% 80%, ${m.color}15 0%, transparent 70%)` }}>
                      <img src={m.img} alt={m.sub} loading="lazy"
                        style={{ position: 'absolute', inset: 0, width: '140%', height: '100%', objectFit: 'contain', objectPosition: 'center bottom', filter: `drop-shadow(0 20px 40px rgba(0,0,0,0.15))`, transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}
                        onMouseOver={e => e.target.style.transform = 'scale(1.1)'}
                        onMouseOut={e => e.target.style.transform = 'scale(1)'}
                      />
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ════════════════════════════════════════════ */}
      <section style={{ padding: '80px 0 100px', borderTop: '1px solid rgba(66,169,46,0.06)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent, rgba(66,169,46,0.02), transparent)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <div className="hud-label">{language === 'ne' ? 'राइडर अनुभवहरू' : 'Rider Experiences'}</div>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, letterSpacing: '-2px' }}>
              {language === 'ne' ? 'नेपालको' : 'Trusted by'} <span className="electric-text">{language === 'ne' ? 'भरोसा' : 'Nepal'}</span>
            </h2>
          </div>

          <div className="grid-3">
            {[
              { 
                name: language === 'ne' ? 'रमेश थापा' : 'Ramesh Thapa', 
                role: language === 'ne' ? 'दैनिक यात्रु' : 'Daily Commuter', 
                text: language === 'ne' ? 'TM007 Pro मा स्विच गर्नु मेरो सबैभन्दा राम्रो निर्णय थियो। पेट्रोल खर्च शून्य छ र यसले मेरो क्षेत्रको उकालो बाटो सजिलै पार गर्छ।' : 'Switching to TM007 Pro was my best decision. Fuel cost is zero and it tackles uphill roads in my area easily.', 
                rating: 5, 
                color: 'var(--elec)' 
              },
              { 
                name: language === 'ne' ? 'सीता लजिस्टिक' : 'Sita Logistics', 
                role: language === 'ne' ? 'फ्लिट अपरेटर' : 'Fleet Operator', 
                text: language === 'ne' ? '३-पाङ्ग्रे कार्गो ई-रिक्सा अत्यन्तै बलियो छ। हाम्रो ढुवानी खर्च उल्लेखनीय रूपमा घटेको छ, र लोड क्षमता वीरगन्जमै बेजोड छ।' : 'The 3-wheeler cargo e-rickshaw is incredibly strong. Our transport costs have dropped significantly, and the load capacity is unmatched in Birgunj.', 
                rating: 5, 
                color: 'var(--nature)' 
              },
              { 
                name: language === 'ne' ? 'विकास केसी' : 'Bikas KC', 
                role: language === 'ne' ? 'इलेक्ट्रिक उत्साही' : 'EV Enthusiast', 
                text: language === 'ne' ? 'स्मार्ट पावर व्यवस्थापन र रिजेनेरेटिभ ब्रेकिङले यी गाडीहरूलाई धेरै भविष्यमुखी बनाउँछ। साथै, मौन सञ्चालनको अर्थ हरियाली छिमेक हो।' : 'Smart power management and regenerative braking make these vehicles very future-oriented. Plus, silent operation means a greener neighborhood.', 
                rating: 4, 
                color: 'var(--power)' 
              }
            ].map((t, i) => (
              <TiltCard key={t.name}>
                <motion.div className="cyber-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                  style={{ padding: '40px 32px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} size={18} fill={idx < t.rating ? t.color : 'transparent'} color={idx < t.rating ? t.color : 'var(--txt-3)'} />
                    ))}
                  </div>
                  <MessageSquare size={28} color={t.color} style={{ opacity: 0.2, marginBottom: 16 }} />
                  <p style={{ color: 'var(--txt-2)', lineHeight: 1.7, fontSize: '0.98rem', marginBottom: 30, flex: 1, fontStyle: 'italic' }}>
                    "{t.text}"
                  </p>
                  <div style={{ borderTop: `1px solid ${t.color}20`, paddingTop: 20, display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: '50%', background: `${t.color}15`, border: `1px solid ${t.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: t.color, fontWeight: 800 }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 800, color: 'var(--txt)', fontSize: '1.05rem', letterSpacing: '-0.5px' }}>{t.name}</div>
                      <div style={{ fontSize: '0.65rem', color: t.color, textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══════════════════════════════════════════════════════ */}
      <section style={{ padding: '0 0 120px' }}>
        <div className="container">
          <div className="cyber-card holo" style={{ padding: '80px 60px', textAlign: 'center', background: 'linear-gradient(135deg,rgba(66,169,46,0.06) 0%,rgba(19,123,57,0.03) 100%)', position: 'relative', overflow: 'hidden' }}>
            <ParticleField count={30} opacity={0.5} />
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div className="hud-label" style={{ justifyContent: 'center' }}>{language === 'ne' ? 'परिवर्तनको लागि तयार हुनुहुन्छ?' : 'Ready for a Change?'}</div>
              <h2 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, letterSpacing: '-2px', marginBottom: 20 }}>
                {language === 'ne' ? 'नि:शुल्क' : 'Book a'} <span className="electric-text">{language === 'ne' ? 'टेस्ट राइड' : 'Free Test Ride'}</span> {language === 'ne' ? 'बुक गर्नुहोस्' : ''}
              </h2>
              <p style={{ color: 'var(--txt-2)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.85 }}>
                {language === 'ne' ? 'हाम्रो नजिकैको शोरुममा आउनुहोस् र नेपालको सर्वश्रेष्ठ विद्युतीय यात्राको अनुभव लिनुहोस्।' : 'Visit our nearest showroom and experience Nepal\'s finest electric journey.'}
              </p>
              <Link to="/contact" className="btn-cyber" style={{ textDecoration: 'none', fontSize: '0.95rem', padding: '17px 48px' }}>
                {language === 'ne' ? 'अहिले नै बुक गर्नुहोस्' : 'Book Now'} <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setVideoOpen(false)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
            <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9 }}
              className="cyber-card" style={{ width: '100%', maxWidth: 900, overflow: 'hidden' }}
              onClick={e => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '14px 18px', borderBottom: '1px solid rgba(19,123,57,0.1)' }}>
                <button onClick={() => setVideoOpen(false)} style={{ background: 'rgba(19,123,57,0.05)', border: '1px solid rgba(19,123,57,0.15)', color: 'var(--txt)', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={16} /></button>
              </div>
              <div style={{ aspectRatio: '16/9', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#F3F9F5', position: 'relative' }}>
                <ParticleField count={40} opacity={0.4} />
                <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                  <PlayCircle size={80} color="var(--nature)" style={{ filter: 'drop-shadow(0 4px 12px rgba(66,169,46,0.3))', marginBottom: 20 }} />
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{language === 'ne' ? 'कुशवाहा मोटर्स — हरित बाटो' : 'Kushwaha Motors — Green Road'}</h3>
                  <p style={{ color: 'var(--txt-2)', marginTop: 8 }}>{language === 'ne' ? 'भिडियो छिटै आउँदैछ। प्रत्यक्ष डेमोको लागि हाम्रो शोरुममा आउनुहोस्।' : 'Video coming soon. Visit our showroom for a live demo.'}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
