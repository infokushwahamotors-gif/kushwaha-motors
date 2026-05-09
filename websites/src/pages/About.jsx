import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Zap, Target, Award, Leaf, ChevronRight } from 'lucide-react';
import ParticleField from '../components/ParticleField';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { language } = useLanguage();
  
  const STATS = [
    [language === 'ne' ? '९' : '9', language === 'ne' ? '+' : '+', language === 'ne' ? 'वर्ष' : 'Years'], 
    [language === 'ne' ? '१२' : '12', language === 'ne' ? '+' : '+', language === 'ne' ? 'सहरहरू' : 'Cities'], 
    [language === 'ne' ? '५०००' : '5000', language === 'ne' ? '+' : '+', language === 'ne' ? 'यात्रुहरू' : 'Passengers'], 
    [language === 'ne' ? '१००' : '100', language === 'ne' ? '%' : '%', language === 'ne' ? 'विद्युतीय' : 'Electric']
  ];

  const VALUES = [
    { 
      icon: <Target size={26} />, 
      title: language === 'ne' ? 'लक्ष्य' : 'Mission', 
      color: 'var(--elec)', 
      desc: language === 'ne' ? 'नेपालको हरेक कुनामा किफायती, भरपर्दो विद्युतीय सवारी साधनहरू पहुँचयोग्य बनाउने।' : 'Making affordable, reliable electric vehicles accessible in every corner of Nepal.' 
    },
    { 
      icon: <Leaf size={26} />, 
      title: language === 'ne' ? 'दिगोपन' : 'Sustainability', 
      color: 'var(--nature)', 
      desc: language === 'ne' ? 'हाम्रा गाडीहरूमा यात्रा गरिएको हरेक किमीले हानिकारक CO₂ लाई कम गर्छ। नेपालको हरियो यातायात भविष्य यहाँबाट सुरु हुन्छ।' : 'Every kilometer traveled in our vehicles reduces harmful CO2. Nepal\'s green transport future starts here.' 
    },
    { 
      icon: <Shield size={26} />, 
      title: language === 'ne' ? 'सुरक्षा' : 'Safety', 
      color: 'var(--power)', 
      desc: language === 'ne' ? 'जापानी स्तरको इन्जिनियरिङ, हिल-क्लाइम्ब सेन्सर, एन्टी-थेफ्ट, र डिस्क ब्रेकको साथ।' : 'With Japanese-standard engineering, hill-climb sensors, anti-theft, and disc brakes.' 
    },
    { 
      icon: <Award size={26} />, 
      title: language === 'ne' ? 'गुणस्तर' : 'Quality', 
      color: 'var(--elec)', 
      desc: language === 'ne' ? 'उत्कृष्ट दायरा सहितको लिथियम ब्याट्री। सबै मोडेलहरूमा फ्याक्ट्री-समर्थित वारेन्टी।' : 'Lithium batteries with excellent range. Factory-backed warranty on all models.' 
    },
  ];

  return (
    <div>
      {/* Hero */}
      <section style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: 'clamp(100px, 15vw, 140px) 0 clamp(60px, 10vw, 80px)', position: 'relative', overflow: 'hidden' }}>
        <ParticleField count={70} opacity={0.55} />

        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '55vw', height: '55vw', background: 'radial-gradient(ellipse, rgba(0,229,255,0.07) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '-5%', width: '40vw', height: '40vw', background: 'radial-gradient(ellipse, rgba(0,255,135,0.05) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
              <div className="hud-label">
                {language === 'ne' ? 'स्थापना २०१५ — वीरगन्ज, नेपाल' : 'Established 2015 — Birgunj, Nepal'}
              </div>

              <h1 style={{ fontWeight: 900, letterSpacing: '-3px', lineHeight: 1.05, marginBottom: 28, position: 'relative', zIndex: 2 }}>
                {language === 'ne' ? 'हाम्रो' : 'Story &'} <span className="electric-text">{language === 'ne' ? 'कथा' : 'Mission'}</span> {language === 'ne' ? 'र लक्ष्य' : ''}
              </h1>
              <p style={{ color: 'var(--txt-2)', fontSize: '1.1rem', lineHeight: 1.85, maxWidth: 480, marginBottom: 40 }}>
                {language === 'ne' ? 'सन् २०१५ देखि कुशवाहा मोटर्सले नेपालमा गुणस्तरीय र किफायती विद्युतीय सवारी साधनहरू उपलब्ध गराउँदै आएको छ। हाम्रो लक्ष्य नेपालको हरियो भविष्यको लागि दिगो यातायात समाधान प्रदान गर्नु हो।' : 'Since 2015, Kushwaha Motors has been providing quality and affordable electric vehicles in Nepal. Our goal is to provide sustainable transport solutions for Nepal\'s green future.'}
              </p>
              <Link to="/contact" className="btn-nature" style={{ textDecoration: 'none' }}>
                {language === 'ne' ? 'सम्पर्क गर्नुहोस्' : 'Contact Us'} <ChevronRight size={18} />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.95, delay: 0.1 }} style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div style={{ position: 'absolute', inset: -40, borderRadius: '50%', border: '1px solid rgba(0,229,255,0.1)', animation: 'rotate-slow 18s linear infinite', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: '1px dashed rgba(0,255,135,0.08)', animation: 'rotate-slow 12s linear infinite reverse', pointerEvents: 'none' }} />
              
              <div className="cyber-card float-3d" style={{ width: '100%', maxWidth: 540, aspectRatio: '1.4', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', padding: 0, border: '1px solid rgba(255,255,255,0.1)', background: '#000' }}>
                <img 
                  src="/Banner/Gemini_Generated_Image_60b47v60b47v60b4.webp" 
                  alt="" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(30px) brightness(0.4)', opacity: 0.6 }} 
                />
                <motion.img 
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 8, ease: "linear" }}
                  src="/Banner/Gemini_Generated_Image_60b47v60b47v60b4.webp" 
                  alt="Our Story" 
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} 
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ borderTop: '1px solid rgba(0,229,255,0.08)', borderBottom: '1px solid rgba(0,229,255,0.08)', padding: '56px 0', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.03), rgba(0,255,135,0.02), transparent)' }} />
        <div className="container">
          <div className="grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '40px 20px' }}>
            {STATS.map(([num, suf, lbl], i) => (
              <motion.div key={lbl} whileHover={{ y: -4 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(2rem,4vw,3.5rem)', fontWeight: 900, lineHeight: 1, letterSpacing: '-2px' }}>
                  <span className={i % 2 === 0 ? 'text-elec' : 'text-nature'}>{num}</span>
                  <span className="text-elec" style={{ fontSize: '60%' }}>{suf}</span>
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--txt-2)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: 8 }}>{lbl}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '80px 0 100px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img 
            src="/Banner/Gemini_Generated_Image_710s68710s68710s.webp" 
            alt="Values BG" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.03, filter: 'grayscale(100%)' }} 
          />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="label" style={{ display: 'block', marginBottom: 12, fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--nature)' }}>{language === 'ne' ? 'हामीलाई किन छान्ने' : 'Why Choose Us'}</span>
            <h2 style={{ fontWeight: 900, letterSpacing: '-2px' }}>
              {language === 'ne' ? 'मुख्य' : 'Core'} <span className="electric-text">{language === 'ne' ? 'मान्यताहरू' : 'Values'}</span>
            </h2>
          </div>
          <div className="grid-2">
            {VALUES.map((v, i) => (
              <motion.div key={v.title} className="cyber-card" whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                style={{ padding: 'clamp(24px, 5vw, 44px)', borderColor: `${v.color}15` }}
              >
                <div style={{ position: 'absolute', top: -20, left: -20, width: 200, height: 200, background: `radial-gradient(circle, ${v.color}15 0%, transparent 70%)`, pointerEvents: 'none' }} />
                <div style={{ width: 60, height: 60, borderRadius: 14, background: `${v.color}12`, border: `1px solid ${v.color}25`, color: v.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 12, color: v.color }}>{v.title}</h3>
                <p style={{ color: 'var(--txt-2)', lineHeight: 1.8 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
