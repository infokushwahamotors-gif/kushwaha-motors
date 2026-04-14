import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Zap, Shield, Leaf, PlayCircle, X, ChevronRight, Radio, MessageSquare, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ParticleField from '../components/ParticleField';

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
              <span style={{ fontSize: '0.62rem', fontWeight: 800, color: '#fff', textTransform: 'uppercase', letterSpacing: '1px' }}>Authorized Dealer - Nepal</span>
            </motion.div>

            {/* Main headline */}
            <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', fontWeight: 900, lineHeight: 0.95, letterSpacing: '-2px', marginBottom: 20 }}>
              <motion.span className="text-outline-white" style={{ display: 'block' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}>
                Electric.
              </motion.span>
              <motion.span className="electric-text text-outline-white" style={{ display: 'block', fontSize: '105%' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
                Natural.
              </motion.span>
              <motion.span className="text-outline-white" style={{ display: 'block' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.7 }}>
                Powerful.
              </motion.span>
            </h1>

            {/* Subtext */}
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.7 }}
              style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.85)', maxWidth: 450, lineHeight: 1.6, marginBottom: 36, fontWeight: 500 }}>
              शून्य उत्सर्जन, अधिकतम शक्ति — आधुनिक विद्युतीय प्रविधि र प्रकृतिसँगको हाम्रो प्रतिबद्धता।
            </motion.p>

            {/* CTA buttons */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.7 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Link to="/vehicles" className="btn-cyber" style={{ padding: '16px 36px', fontSize: '0.95rem' }}>
                Explore Fleet <ArrowRight size={17} />
              </Link>
              <button onClick={() => setVideoOpen(true)} className="btn-ghost" style={{ border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }}>
                <PlayCircle size={17} /> Video Tour
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
          <span style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: 700 }}>Scroll</span>
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
            <div className="hud-label" style={{ justifyContent: 'center' }}>Core Principles</div>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, letterSpacing: '-2px' }}>
              The <span className="electric-text">Eternal</span> Triangle
            </h2>
          </div>

          <div className="grid-3">
            {[
              { icon: <Zap size={32} />, title: 'Electricity', color: 'var(--elec)', cls: '', stat: '3500W', stl: 'Max Motor', desc: 'Cutting-edge 72V lithium cells, smart power management, regenerative braking — performance you can feel.' },
              { icon: <Leaf size={32} />, title: 'Nature', color: 'var(--nature)', cls: 'nature', stat: '0g', stl: 'CO₂/KM', desc: 'Zero direct emissions. Nepal\'s hydroelectric power means your ride is powered by mountains, not fuel.' },
              { icon: <Shield size={32} />, title: 'Power', color: 'var(--power)', cls: 'power', stat: '100%', stl: 'All-terrain', desc: 'Hill-climb sensors, anti-theft systems, dual-disc brakes — unstoppable, safe, and smart.' },
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
              The Road <span className="electric-text">Reimagined</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.2rem', maxWidth: 600, margin: '0 auto' }}>
              Designed for the mountains, built for the city. Experience the next generation of mobility.
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
              <div className="hud-label">Vehicle Lineup</div>
              <h2 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, letterSpacing: '-2px' }}>
                Choose Your <span className="electric-text">Power</span>
              </h2>
            </div>
            <Link to="/vehicles" className="btn-ghost" style={{ textDecoration: 'none' }}>View All Models <ArrowRight size={14} /></Link>
          </div>

          <div className="grid-2">
            {[
              { title: '2-Wheeler', sub: 'Urban Scooters', desc: 'Nimble & stylish. Built for Nepal\'s city roads.', img: '/red_scooter.webp', color: 'var(--elec)', badge: 'Starting 1.8L' },
              { title: '3-Wheeler', sub: 'Utility Fleet', desc: 'Passenger transport or cargo — raw power on every terrain.', img: '/auto.webp', color: 'var(--nature)', badge: 'Starting 2.8L' },
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
                      <div style={{ fontSize: '0.75rem', fontWeight: 800, color: m.color, letterSpacing: '0.5px', border: `2px solid ${m.color}30`, borderRadius: 100, padding: '8px 16px', display: 'inline-block', alignSelf: 'flex-start' }}>
                        NPR {m.badge}
                      </div>
                      <Link to="/vehicles" className="btn-outline" style={{ textDecoration: 'none', borderColor: `${m.color}40`, color: m.color, alignSelf: 'flex-start', marginTop: 'auto' }}>
                        See All Models <ArrowRight size={13} />
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
            <div className="hud-label" style={{ justifyContent: 'center' }}>Rider Stories</div>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, letterSpacing: '-2px' }}>
              Trusted by <span className="electric-text">Nepal</span>
            </h2>
          </div>

          <div className="grid-3">
            {[
              { name: 'Ramesh Thapa', role: 'Daily Commuter', text: 'Switching to TM007 Pro was the best decision. Zero petrol costs and it easily handles the uphill roads in my area. Highly recommended!', rating: 5, color: 'var(--elec)' },
              { name: 'Sita Logistics', role: 'Fleet Operator', text: 'The 3-Wheeler Cargo e-rickshaws are incredibly robust. Our delivery costs dropped significantly, and the load capacity is unmatched in Birgunj.', rating: 5, color: 'var(--nature)' },
              { name: 'Bikash KC', role: 'Electric Enthusiast', text: 'The smart power management and regenerative braking make these vehicles feel so futuristic. Plus, silent operation means a greener neighborhood.', rating: 4, color: 'var(--power)' }
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
              <div className="hud-label" style={{ justifyContent: 'center' }}>Ready to Switch?</div>
              <h2 style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, letterSpacing: '-2px', marginBottom: 20 }}>
                Book Your <span className="electric-text">Free Test Ride</span>
              </h2>
              <p style={{ color: 'var(--txt-2)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.85 }}>
                हाम्रो नजिकैको शोरुममा आउनुहोस् र Nepal को सर्वश्रेष्ठ विद्युतीय यात्राको अनुभव लिनुहोस्।
              </p>
              <Link to="/contact" className="btn-cyber" style={{ textDecoration: 'none', fontSize: '0.95rem', padding: '17px 48px' }}>
                Reserve Now <ArrowRight size={18} />
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
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Kushwaha Motors — The Green Way</h3>
                  <p style={{ color: 'var(--txt-2)', marginTop: 8 }}>Video coming soon. Visit our showroom for a live demo.</p>
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
