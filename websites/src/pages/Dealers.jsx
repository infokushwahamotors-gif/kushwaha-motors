import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Search, ArrowRight, Building2, Globe, Zap } from 'lucide-react';

const DEALERS = [
  { city: "Birgunj", location: "Parsa", phone: "9821107355", type: "Head Office", isHead: true },
  { city: "Kalaiya", location: "Bara", phone: "9802595086", type: "Branch" },
  { city: "Simara", location: "Bara", phone: "9812212699", type: "Branch" },
  { city: "Sukdew Chowk", location: "Rautahat", phone: "9801287097", type: "Branch" },
  { city: "Hetauda", location: "Makwanpur", phone: "9801235567", type: "Branch" },
  { city: "Tandi", location: "Chitwan", phone: "9843596487", type: "Branch" },
  { city: "Bharatpur", location: "Chitwan", phone: "9812287436", type: "Branch" },
  { city: "Malangwa", location: "Sarlahi", phone: "9866388988", type: "Branch" },
];

const ADDITIONAL_LOCATIONS = [
  "Damak, Jhapa", "Biratchowk, Morang", "Dharan, Sunsari", "Lahan, Siraha",
  "Lalbandi, Sarlahi", "Hariwon, Sarlahi", "Chapur, Rautahat", "Butwal, Rupandehi",
  "Kathmandu", "Bhaktapur"
];

const Dealers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDealers = DEALERS.filter(d =>
    d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAdditional = ADDITIONAL_LOCATIONS.filter(loc =>
    loc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '160px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '80%', background: 'radial-gradient(ellipse, rgba(66,169,46,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ghost-text" style={{ marginBottom: -50, color: 'rgba(66,169,46,0.05)' }}>NETWORK</div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="hud-label" style={{ justifyContent: 'center', marginBottom: 12 }}>Find a Dealer</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-2px', marginBottom: 20 }}>
              Our <span className="electric-text">Nationwide</span> Network
            </h1>
            <p style={{ color: 'var(--txt-2)', fontSize: '1.1rem', maxWidth: 540, margin: '0 auto 40px' }}>
              नेपालभरि हाम्रो विश्वस्त डिलर नेटवर्क। तपाईंको नजिकैको शोरुम भेट्नुहोस्।
            </p>

            {/* Search */}
            <div style={{ maxWidth: 540, margin: '0 auto', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'var(--txt-3)' }}>
                <Search size={20} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="सहर वा स्थान अनुसार खोज्नुहोस्…"
                style={{ 
                  paddingLeft: 52, 
                  borderRadius: 999, 
                  fontSize: '1rem',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(66,169,46,0.2)',
                  color: 'var(--txt)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Branches */}
      <section style={{ padding: '20px 0 60px' }}>
        <div className="container">
          <div style={{ marginBottom: 30 }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--txt)', display: 'flex', alignItems: 'center', gap: 12 }}>
              <Building2 color="var(--nature)" /> Our Main Branches
            </h2>
          </div>
          
          {filteredDealers.length === 0 && filteredAdditional.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <Globe size={64} style={{ color: 'var(--txt-3)', margin: '0 auto 24px', opacity: 0.3 }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 12 }}>"{searchTerm}" को लागि कुनै डिलर फेला परेन</h3>
              <button onClick={() => setSearchTerm('')} style={{ background: 'none', border: 'none', color: 'var(--nature)', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
                खोज खाली गर्नुहोस्
              </button>
            </div>
          )}

          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid-3">
              {filteredDealers.map((d) => (
                <motion.div key={d.city} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                  className="cyber-card"
                  style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20,
                    ...(d.isHead ? { borderColor: 'var(--nature)', background: 'linear-gradient(135deg, rgba(66,169,46,0.08) 0%, transparent 70%)' } : {}) }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{
                      background: d.isHead ? 'var(--nature)' : 'rgba(66,169,46,0.1)',
                      color: d.isHead ? '#fff' : 'var(--nature)',
                      padding: '5px 14px', borderRadius: 999,
                      fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px',
                    }}>
                      {d.isHead ? '⭐ Head Office' : d.type}
                    </div>
                    <Zap size={18} color="var(--nature)" style={{ opacity: 0.4 }} />
                  </div>

                  {/* City */}
                  <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: 4, color: 'var(--txt)' }}>{d.city}</h2>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', color: 'var(--txt-2)', fontSize: '0.9rem' }}>
                      <MapPin size={16} color="var(--nature)" style={{ marginTop: 2, flexShrink: 0 }} /> {d.location}
                    </div>
                  </div>

                  {/* Phone */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Phone size={16} color="var(--nature)" />
                    <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--txt)' }}>{d.phone}</span>
                  </div>

                  {/* CTA */}
                  <a href={`tel:${d.phone}`} className="btn-outline" style={{ textAlign: 'center', textDecoration: 'none', marginTop: 4 }}>
                    सम्पर्क गर्नुहोस् <ArrowRight size={14} />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Additional Presence Section: Dealers */}
      {filteredAdditional.length > 0 && (
        <section style={{ padding: '40px 0 120px' }}>
          <div className="container">
            <div style={{ 
              padding: '60px 40px', 
              background: 'rgba(66,169,46,0.03)', 
              borderRadius: 32, 
              border: '1px solid rgba(66,169,46,0.1)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: 'radial-gradient(circle at top right, rgba(66,169,46,0.1), transparent)', pointerEvents: 'none' }} />
              
              <h3 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 12, color: 'var(--txt)' }}>
                Authorized <span className="electric-text">Dealers</span>
              </h3>
              <p style={{ color: 'var(--txt-2)', marginBottom: 40, fontSize: '1.1rem' }}>हाम्रा आधिकारिक डिलरहरू निम्न स्थानहरूमा पनि उपलब्ध छन्।</p>
              
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                justifyContent: 'center', 
                gap: 15 
              }}>
                {filteredAdditional.map((loc, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05, borderColor: 'var(--nature)', color: 'var(--nature)' }}
                    transition={{ delay: i * 0.05 }}
                    style={{ 
                      padding: '14px 28px', 
                      background: '#fff', 
                      borderRadius: 16, 
                      fontSize: '1rem', 
                      fontWeight: 800,
                      color: 'var(--txt)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      border: '1px solid rgba(0,0,0,0.05)',
                      cursor: 'default',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--nature)', boxShadow: '0 0 10px var(--nature)' }} />
                    {loc}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dealers;
