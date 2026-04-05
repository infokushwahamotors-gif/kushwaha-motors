import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Search, ArrowRight, Building2, Globe, Zap } from 'lucide-react';

const DEALERS = [
  { city: "Birgunj", location: "Trimurti Chowk, Shreepur", phone: "9821107355", type: "Head Office", isHead: true },
  { city: "Kawasoti", location: "Phalphul Chowk", phone: "9828020134", type: "Branch" },
  { city: "Bharatpur", location: "Kshetrapur, near sabji mandi", phone: "9704415777", type: "Branch" },
  { city: "Damak", location: "Main Chowk, Jhapa", phone: "9801082474", type: "Branch" },
  { city: "Itahari", location: "Itahari, Sunsari", phone: "9861580964", type: "Branch" },
  { city: "Janakpur", location: "Janakpurdham", phone: "9801235567", type: "Dealer" },
  { city: "Lahan", location: "Lahan, Siraha", phone: "9843596487", type: "Branch" },
  { city: "Lalbandi", location: "Lalbandi, Sarlahi", phone: "9802595085", type: "Branch" },
  { city: "Dhangadhi", location: "Dhangadhi, Kailali", phone: "9843596487", type: "Branch" },
];

const Dealers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = DEALERS.filter(d =>
    d.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Hero */}
      <section style={{ padding: '160px 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '60%', height: '80%', background: 'radial-gradient(ellipse, rgba(255,92,0,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ghost-text" style={{ marginBottom: -50 }}>NETWORK</div>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="section-label" style={{ marginBottom: 12 }}>Find a Dealer</div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', fontWeight: 900, letterSpacing: '-2px', marginBottom: 20 }}>
              Our <span style={{ color: 'var(--c-orange)' }}>Nationwide</span> Network
            </h1>
            <p style={{ color: 'var(--c-muted)', fontSize: '1.1rem', maxWidth: 540, margin: '0 auto 40px' }}>
              नेपालभरि हाम्रो विश्वस्त डिलर नेटवर्क। तपाईंको नजिकैको शोरुम भेट्नुहोस्।
            </p>

            {/* Search */}
            <div style={{ maxWidth: 540, margin: '0 auto', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 20, top: '50%', transform: 'translateY(-50%)', color: 'var(--c-muted)' }}>
                <Search size={20} />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search by city or location…"
                style={{ paddingLeft: 52, borderRadius: 999, fontSize: '1rem' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '20px 0 120px' }}>
        <div className="container">
          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <Globe size={64} style={{ color: 'var(--c-muted)', margin: '0 auto 24px', opacity: 0.3 }} />
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 12 }}>No dealers found for "{searchTerm}"</h3>
              <button onClick={() => setSearchTerm('')} style={{ background: 'none', border: 'none', color: 'var(--c-orange)', fontWeight: 700, cursor: 'pointer', fontSize: '1rem' }}>
                Clear search
              </button>
            </div>
          )}

          <AnimatePresence mode="popLayout">
            <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
              {filtered.map((d) => (
                <motion.div key={d.city} layout initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
                  className="glass-card"
                  style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20,
                    ...(d.isHead ? { border: '1px solid rgba(255,92,0,0.3)', background: 'linear-gradient(135deg, rgba(255,92,0,0.08) 0%, transparent 70%)' } : {}) }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{
                      background: d.isHead ? 'var(--c-orange)' : 'rgba(255,255,255,0.06)',
                      color: d.isHead ? '#fff' : 'var(--c-muted)',
                      padding: '5px 14px', borderRadius: 999,
                      fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px',
                    }}>
                      {d.isHead ? '⭐ ' : ''}{d.type}
                    </div>
                    <Building2 size={20} color="var(--c-muted)" style={{ opacity: 0.4 }} />
                  </div>

                  {/* City */}
                  <div>
                    <h2 style={{ fontSize: '2rem', fontWeight: 900, letterSpacing: '-1px', marginBottom: 4 }}>{d.city}</h2>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', color: 'var(--c-muted)', fontSize: '0.9rem' }}>
                      <MapPin size={16} color="var(--c-orange)" style={{ marginTop: 2, flexShrink: 0 }} /> {d.location}
                    </div>
                  </div>

                  {/* Phone */}
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <Phone size={16} color="var(--c-orange)" />
                    <span style={{ fontWeight: 800, fontSize: '1.05rem' }}>{d.phone}</span>
                  </div>

                  {/* CTA */}
                  <a href={`tel:${d.phone}`} className="btn-ghost" style={{ textAlign: 'center', textDecoration: 'none', marginTop: 4 }}>
                    Call Now <ArrowRight size={14} />
                  </a>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
};

export default Dealers;
