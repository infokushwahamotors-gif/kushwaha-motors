import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Zap, AlertTriangle } from 'lucide-react';
import ParticleField from '../components/ParticleField';
import WhatsAppButton from '../components/WhatsAppButton';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

// ══════════════════════════════════════════════════════════════════
const EMAILJS_SERVICE_ID  = 'service_u0ym8nu';       // ✅ Set
const EMAILJS_TEMPLATE_ID = 'template_j9z3uoe';      // ✅ Set
const EMAILJS_PUBLIC_KEY  = 'lVQkPWqNEo_WbrR2h';     // ✅ Set

// Initialize EmailJS once at module level
emailjs.init(EMAILJS_PUBLIC_KEY);

const EMPTY = { name: '', phone: '', email: '', vehicle: '', message: '' };

const Contact = () => {
  const { language } = useLanguage();
  const t = translations[language].contact;
  const formRef = useRef(null);
  const [form, setForm]     = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const CONTACT_INFO = [
    { icon: <MapPin size={20} />, label: language === 'ne' ? 'ठेगाना' : 'Address',  value: language === 'ne' ? 'त्रिमूर्ति चोक, वीरगन्ज, पर्सा, नेपाल' : 'Trimurti Chowk, Birgunj, Parsa, Nepal', color: 'var(--elec)' },
    { icon: <Phone size={20} />, label: language === 'ne' ? 'हटलाइन' : 'Hotline',   value: '+977-9821107355 / 9801082474',           color: 'var(--nature)' },
    { icon: <Mail  size={20} />, label: language === 'ne' ? 'इमेल' : 'Email',     value: 'info@kushwahamotors.com.np',             color: 'var(--elec)' },
    { icon: <Clock size={20} />, label: language === 'ne' ? 'समय' : 'Timing',     value: language === 'ne' ? 'आइत–शुक्र: ९:०० AM – ६:०० PM' : 'Sun–Fri: 9:00 AM – 6:00 PM',            color: 'var(--nature)' },
  ];

  const VEHICLES = [
    '2-Wheeler Scooter (TM007 Pro)',
    '2-Wheeler Scooter (V7G Urban)',
    '3-Wheeler Passenger (KM-E5L)',
    '3-Wheeler Passenger (FT-3)',
    '3-Wheeler School Bus (KM-V3)',
    '3-Wheeler Cargo (MAX-60C)',
    '3-Wheeler Cargo (LM-3)',
    '3-Wheeler Cargo (JC-48)',
    language === 'ne' ? 'सामान्य सोधपुछ' : 'Just Enquiring',
  ];

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const templateParams = {
      from_name:  form.name,
      from_phone: form.phone,
      from_email: form.email || 'Not provided',
      vehicle:    form.vehicle || 'Not specified',
      message:    form.message,
      sent_time:  new Date().toLocaleString('en-NP', { timeZone: 'Asia/Kathmandu' }),
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      setStatus('success');
      setForm(EMPTY);
      setTimeout(() => setStatus('idle'), 8000);
    } catch (err) {
      console.error('EmailJS error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 6000);
    }
  };

  const isConfigured = !EMAILJS_SERVICE_ID.includes('YOUR_');

  return (
    <div>
      <style>{`
        .contact-hero-container {
          width: 100%; 
          aspect-ratio: 1.8 / 1; 
          position: relative; 
          display: flex; 
          align-items: center;
          justify-content: center;
        }
        .form-row {
          display: grid; 
          grid-template-columns: 1fr 1fr; 
          gap: 16px;
        }
        @media (max-width: 1024px) {
          .contact-hero-container { aspect-ratio: 1 / 1; min-height: 500px; }
        }
        @media (max-width: 640px) {
          .contact-hero-container { aspect-ratio: 1 / 1.3; }
          .form-row { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── Setup Warning Banner ── */}
      {!isConfigured && (
        <div style={{ background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.3)', padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, position: 'sticky', top: 68, zIndex: 100, backdropFilter: 'blur(10px)' }}>
          <AlertTriangle size={16} color="var(--power)" />
          <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--power)' }}>
            <strong>EmailJS Setup Required</strong>
          </span>
        </div>
      )}

      {/* ── Hero ── */}
      <section style={{ width: '100%', position: 'relative', overflow: 'hidden', background: '#000' }}>
        <div className="contact-hero-container">
          <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
            <motion.img 
              initial={{ scale: 1.05, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              src="/Banner/Clean_Contact.png" 
              alt="Contact Banner" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.8) 100%)' }} />
          </div>

          <ParticleField count={40} opacity={0.6} />
          
          <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div className="hud-label" style={{ justifyContent: 'center', borderColor: 'rgba(255,255,255,0.4)', color: '#fff', background: 'rgba(0,0,0,0.2)' }}>{language === 'ne' ? 'सम्पर्क गर्नुहोस्' : 'Contact Us'}</div>
              <h1 style={{ fontWeight: 900, letterSpacing: '-2px', marginBottom: 20, color: '#fff', textShadow: '0 4px 15px rgba(0,0,0,0.4)' }}>
                {language === 'ne' ? 'आउनुहोस्' : "Let's"} <span className="electric-text" style={{ textShadow: 'none' }}>{language === 'ne' ? 'कुरा' : 'Talk'}</span> {language === 'ne' ? 'गरौं' : ''}
              </h1>
              <p style={{ color: '#fff', fontSize: '1.1rem', maxWidth: 600, margin: '0 auto', fontWeight: 500, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                {t.subtitle}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Grid ── */}
      <section style={{ padding: '20px 0 80px' }}>
        <div className="container contact-grid">

          {/* ─ Left: Info ─ */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            <div className="cyber-card" style={{ padding: 'clamp(24px, 5vw, 36px)' }}>
              <div className="hud-label">{language === 'ne' ? 'शोरुम जानकारी' : 'Showroom Info'}</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 28 }}>{language === 'ne' ? 'हामीलाई भेट्नुहोस्' : 'Find Us'}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {CONTACT_INFO.map(({ icon, label, value, color }) => (
                  <div key={label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${color}15`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--txt-2)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 5 }}>{label}</div>
                      <div style={{ fontWeight: 600, lineHeight: 1.5, fontSize: '0.92rem' }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="cyber-card" style={{ padding: 28, textAlign: 'center', background: 'var(--bg-card)' }}>
              <Zap size={32} color="var(--nature)" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: 8 }}>{language === 'ne' ? 'निःशुल्क टेस्ट राइड' : 'Free Test Ride'}</div>
              <p style={{ color: 'var(--txt-2)', marginBottom: 18, fontSize: '0.88rem', lineHeight: 1.7 }}>{language === 'ne' ? 'हाम्रो कुनै पनि शोरुममा जानुहोस् र निःशुल्क टेस्ट राइड लिनुहोस्।' : 'Visit any of our showrooms and get a free test ride.'}</p>
              <a href="tel:9821107355" className="btn-cyber" style={{ textDecoration: 'none' }}>{language === 'ne' ? '📞 कल गर्नुहोस्' : '📞 Call Now'}</a>
            </div>
          </motion.div>

          {/* ─ Right: Form ─ */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="cyber-card" style={{ padding: 'clamp(24px, 5vw, 44px) clamp(20px, 4vw, 40px)' }}>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <CheckCircle2 size={72} color="var(--nature)" style={{ margin: '0 auto 24px' }} />
                    <h3 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: 12, color: 'var(--nature)' }}>{language === 'ne' ? 'सन्देश पठाइयो!' : 'Message Sent!'}</h3>
                    <p style={{ color: 'var(--txt-2)', lineHeight: 1.8 }}>{language === 'ne' ? 'हाम्रो टोलीले चाँडै तपाईंलाई सम्पर्क गर्नेछ।' : 'Our team will contact you shortly.'}</p>
                  </motion.div>
                ) : status === 'error' ? (
                  <motion.div key="error" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <AlertTriangle size={64} color="var(--power)" style={{ margin: '0 auto 16px' }} />
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: 12, color: 'var(--power)' }}>{language === 'ne' ? 'पठाउन असफल भयो' : 'Failed to Send'}</h3>
                    <button onClick={() => setStatus('idle')} className="btn-outline">{language === 'ne' ? 'फेरि प्रयास गर्नुहोस्' : 'Try Again'}</button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="hud-label">{language === 'ne' ? 'सम्पर्क फारम' : 'Contact Form'}</div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 32 }}>{language === 'ne' ? 'सन्देश पठाउनुहोस्' : 'Send a Message'}</h2>

                    <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      <div className="form-row">
                        <div>
                          <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 700, color: 'var(--txt-2)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>{language === 'ne' ? 'पूरा नाम *' : 'Full Name *'}</label>
                          <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder={language === 'ne' ? 'तपाईंको नाम' : 'Your Name'} />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 700, color: 'var(--txt-2)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>{language === 'ne' ? 'फोन *' : 'Phone *'}</label>
                          <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+977 98XXXXXXXX" />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 700, color: 'var(--txt-2)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>{language === 'ne' ? 'इमेल ठेगाना' : 'Email Address'}</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com" />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 700, color: 'var(--txt-2)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>{language === 'ne' ? 'रुचि भएको गाडी' : 'Interested Vehicle'}</label>
                        <select name="vehicle" value={form.vehicle} onChange={handleChange}>
                          <option value="">{language === 'ne' ? 'मोडेल छान्नुहोस्…' : 'Choose Model…'}</option>
                          {VEHICLES.map(v => <option key={v}>{v}</option>)}
                        </select>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.62rem', fontWeight: 700, color: 'var(--txt-2)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>{language === 'ne' ? 'सन्देश *' : 'Message *'}</label>
                        <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder={t.formPlaceholder} />
                      </div>

                      <button type="submit" className="btn-cyber" disabled={status === 'loading'} style={{ width: '100%' }}>
                        {status === 'loading' ? (
                          <>
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ width: 16, height: 16, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%' }} />
                            {language === 'ne' ? 'पठाउँदै…' : 'Sending…'}
                          </>
                        ) : (
                          <><Send size={16} /> {t.formBtn}</>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Map ── */}
      <div style={{ height: 'clamp(350px, 50vh, 500px)', position: 'relative', zIndex: 1, borderTop: '1px solid rgba(19,123,57,0.08)' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113426.65750059533!2d84.8021876!3d27.1350625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993510e9f8bd4b5%3A0xe67dd44ff8bc63e0!2sBirgunj!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
          width="100%" height="100%"
          style={{ border: 0 }}
          allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          title="Kushwaha Motors Location"
        />
        <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', width: 'auto', minWidth: '240px' }}>
          <div className="cyber-card" style={{ padding: '10px 20px', textAlign: 'center', borderRadius: '100px', background: 'rgba(255,255,255,0.95)', border: '1px solid var(--nature)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--txt)' }}>{language === 'ne' ? 'कुशवाहा मोटर्स मुख्य कार्यालय' : 'KUSHWAHA MOTORS HQ'}</div>
          </div>
        </div>
      </div>

      <WhatsAppButton />
    </div>
  );
};

export default Contact;
