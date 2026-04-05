import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Zap, AlertTriangle } from 'lucide-react';
import ParticleField from '../components/ParticleField';

// ══════════════════════════════════════════════════════════════════
const EMAILJS_SERVICE_ID  = 'service_u0ym8nu';       // ✅ Set
const EMAILJS_TEMPLATE_ID = 'template_j9z3uoe';      // ✅ Set
const EMAILJS_PUBLIC_KEY  = 'lVQkPWqNEo_WbrR2h';     // ✅ Set

// Initialize EmailJS once at module level
emailjs.init(EMAILJS_PUBLIC_KEY);

const CONTACT_INFO = [
  { icon: <MapPin size={20} />, label: 'Address',  value: 'Trimurti Chowk, Birgunj, Parsa, Nepal', color: 'var(--elec)' },
  { icon: <Phone size={20} />, label: 'Hotline',   value: '+977-9821107355 / 9801082474',           color: 'var(--nature)' },
  { icon: <Mail  size={20} />, label: 'Email',     value: 'info@kushwahamotors.com.np',             color: 'var(--elec)' },
  { icon: <Clock size={20} />, label: 'Hours',     value: 'Sun–Fri: 9:00 AM – 6:00 PM',            color: 'var(--nature)' },
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
  'Just Enquiring',
];

const EMPTY = { name: '', phone: '', email: '', vehicle: '', message: '' };

const Contact = () => {
  const formRef = useRef(null);
  const [form, setForm]     = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

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
      {/* ── Setup Warning Banner ── */}
      {!isConfigured && (
        <div style={{ background: 'rgba(255,107,0,0.1)', border: '1px solid rgba(255,107,0,0.3)', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 12, position: 'sticky', top: 68, zIndex: 100 }}>
          <AlertTriangle size={18} color="var(--power)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--power)' }}>
            <strong>Setup Required:</strong> Replace the 3 EmailJS IDs to enable email notifications.
          </span>
        </div>
      )}

      {/* ── Hero ── */}
      <section style={{ padding: '160px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <ParticleField count={40} opacity={0.6} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(66,169,46,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ghost" style={{ fontSize: 'clamp(5rem,13vw,12rem)', marginBottom: -50 }}>CONNECT</div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="hud-label" style={{ justifyContent: 'center' }}>Get In Touch</div>
            <h1 style={{ fontSize: 'clamp(2.5rem,5vw,4.5rem)', fontWeight: 900, letterSpacing: '-2px', marginBottom: 20 }}>
              Let's <span className="electric-text">Talk</span>
            </h1>
            <p style={{ color: 'var(--txt-2)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto' }}>
              Test ride बुक गर्नुहोस्, मूल्य जान्नुहोस्, वा जुनसुकै प्रश्नको उत्तर पाउनुहोस् — हामी यहाँ छौं।
            </p>
          </div>
        </div>
      </section>

      {/* ── Main Grid ── */}
      <section style={{ padding: '20px 0 120px' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 28, alignItems: 'start' }}>

          {/* ─ Left: Info ─ */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>

            {/* Info card */}
            <div className="cyber-card" style={{ padding: 36 }}>
              <div className="hud-label">Showroom Info</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 28 }}>Find Us</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {CONTACT_INFO.map(({ icon, label, value, color }) => (
                  <div key={label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: `${color}15`, color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {icon}
                    </div>
                    <div>
                      <div style={{ fontFamily:"'Space Mono',monospace", fontSize: '0.62rem', fontWeight: 700, color: 'var(--txt-2)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 5 }}>{label}</div>
                      <div style={{ fontWeight: 600, lineHeight: 1.5, fontSize: '0.92rem' }}>{value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="cyber-card" style={{ padding: 28, textAlign: 'center', background: 'var(--bg-card)' }}>
              <Zap size={32} color="var(--nature)" style={{ margin: '0 auto 12px' }} />
              <div style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: 8 }}>Free Test Ride</div>
              <p style={{ color: 'var(--txt-2)', marginBottom: 18, fontSize: '0.88rem', lineHeight: 1.7 }}>हाम्रो कुनै पनि शोरुममा आउनुहोस् र निःशुल्क टेस्ट राइड लिनुहोस्।</p>
              <a href="tel:9821107355" className="btn-cyber" style={{ textDecoration: 'none' }}>📞 Call for Appointment</a>
            </div>
          </motion.div>

          {/* ─ Right: Form ─ */}
          <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="cyber-card" style={{ padding: '44px 40px' }}>
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <div style={{ position: 'relative', display: 'inline-block', marginBottom: 24 }}>
                      <CheckCircle2 size={72} color="var(--nature)" />
                      <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }} transition={{ duration: 2, repeat: Infinity }}
                        style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '2px solid var(--nature)' }} />
                    </div>
                    <h3 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: 12, color: 'var(--nature)' }}>Message Sent!</h3>
                    <p style={{ color: 'var(--txt-2)', lineHeight: 1.8, marginBottom: 8 }}>हाम्रो टिमले तपाईंलाई २४ घण्टाभित्र सम्पर्क गर्नेछ।</p>
                  </motion.div>
                ) : status === 'error' ? (
                  <motion.div key="error" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                    style={{ textAlign: 'center', padding: '40px 20px' }}>
                    <AlertTriangle size={64} color="var(--power)" style={{ margin: '0 auto 16px' }} />
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 900, marginBottom: 12, color: 'var(--power)' }}>Send Failed</h3>
                    <p style={{ color: 'var(--txt-2)', marginBottom: 20, lineHeight: 1.7 }}>
                      Please contact us directly at <strong style={{ color: 'var(--txt)' }}>+977-9821107355</strong>
                    </p>
                    <button onClick={() => setStatus('idle')} className="btn-outline">Try Again</button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <div className="hud-label">Contact Form</div>
                    <h2 style={{ fontSize: '1.8rem', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 32 }}>Send a Message</h2>

                    <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                      {/* Name + Phone */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                          <label style={{ display: 'block', fontFamily:"'Space Mono',monospace", fontSize: '0.62rem', fontWeight: 700, color: 'var(--txt-2)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 8 }}>Full Name *</label>
                          <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Your name" />
                        </div>
                        <div>
                          <label style={{ display: 'block', fontFamily:"'Space Mono',monospace", fontSize: '0.62rem', fontWeight: 700, color: 'var(--txt-2)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 8 }}>Phone *</label>
                          <input type="tel" name="phone" required value={form.phone} onChange={handleChange} placeholder="+977 98XXXXXXXX" />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label style={{ display: 'block', fontFamily:"'Space Mono',monospace", fontSize: '0.62rem', fontWeight: 700, color: 'var(--txt-2)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 8 }}>Email Address</label>
                        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="your@email.com (optional)" />
                      </div>

                      {/* Vehicle */}
                      <div>
                        <label style={{ display: 'block', fontFamily:"'Space Mono',monospace", fontSize: '0.62rem', fontWeight: 700, color: 'var(--txt-2)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 8 }}>Vehicle Interest</label>
                        <select name="vehicle" value={form.vehicle} onChange={handleChange}>
                          <option value="">Select a model…</option>
                          {VEHICLES.map(v => <option key={v}>{v}</option>)}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label style={{ display: 'block', fontFamily:"'Space Mono',monospace", fontSize: '0.62rem', fontWeight: 700, color: 'var(--txt-2)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 8 }}>Message *</label>
                        <textarea name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="How can we help you? Ask about price, test ride, specs…" />
                      </div>

                      <button type="submit" className="btn-cyber" disabled={status === 'loading'}
                        style={{ marginTop: 4, opacity: status === 'loading' ? 0.7 : 1, cursor: status === 'loading' ? 'wait' : 'pointer' }}>
                        {status === 'loading' ? (
                          <>
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} style={{ width: 16, height: 16, border: '2px solid #fff', borderTopColor: 'transparent', borderRadius: '50%' }} />
                            Sending…
                          </>
                        ) : (
                          <><Send size={16} /> Send Message</>
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
      <div style={{ height: 400, position: 'relative', zIndex: 1, borderTop: '1px solid rgba(19,123,57,0.08)' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113426.65750059533!2d84.8021876!3d27.1350625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3993510e9f8bd4b5%3A0xe67dd44ff8bc63e0!2sBirgunj!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
          width="100%" height="100%"
          style={{ border: 0 }}
          allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          title="Kushwaha Motors Location"
        />
        <div style={{ position: 'absolute', inset: 0, border: '1px solid rgba(19,123,57,0.05)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}>
          <div className="cyber-card" style={{ padding: '12px 18px', textAlign: 'center', whiteSpace: 'nowrap', borderRadius: '100px', background: 'rgba(255,255,255,0.95)' }}>
            <MapPin size={16} color="var(--elec)" style={{ marginBottom: 4 }} />
            <div style={{ fontFamily:"'Space Mono',monospace", fontSize: '0.7rem', fontWeight: 800, color: 'var(--txt)' }}>KUSHWAHA MOTORS HQ</div>
            <div style={{ fontSize: '0.76rem', color: 'var(--txt-2)', marginTop: 2 }}>Trimurti Chowk, Birgunj</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
