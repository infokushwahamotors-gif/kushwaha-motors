import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Battery, Shield, ArrowRight, CheckCircle2, Cpu } from 'lucide-react';
import { Link } from 'react-router-dom';

// Spec label mapping
const SPEC_LABELS = {
  motor:    { en: 'MOTOR',     np: 'मोटर'     },
  range:    { en: 'RANGE',     np: 'दूरी'      },
  battery:  { en: 'BATTERY',  np: 'ब्याट्री'  },
  speed:    { en: 'TOP SPEED', np: 'गति'       },
  capacity: { en: 'CAPACITY',  np: 'क्षमता'   },
};

const NP_FONT = "'Noto Sans Devanagari', 'Mukta', sans-serif";
const isNepali = (str) => str && /[\u0900-\u097F]/.test(str);

const ProductCard = ({ product: p }) => {
  const nepali = isNepali(p.tagline);

  const specRows = [
    ['motor',    p.specs.motor],
    ['range',    p.specs.range],
    ['battery',  p.specs.battery],
    [p.specs.speed ? 'speed' : 'capacity', p.specs.speed || p.specs.capacity],
  ];

  return (
    <motion.div 
      layout 
      initial={{ opacity:0, y:36 }} 
      animate={{ opacity:1, y:0 }} 
      exit={{ opacity:0, scale:0.95 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="cyber-card"
      style={{ display:'flex', flexDirection:'column', height:'100%', overflow:'hidden', borderColor:`${p.accent}30`, background: '#fff' }}
    >
      {/* ── Image ── */}
      <div style={{ position:'relative', padding:'28px 16px 0', display:'flex', justifyContent:'center', alignItems:'flex-end', minHeight:210,
        background:`radial-gradient(ellipse 80% 70% at 50% 100%, ${p.accent}15 0%, transparent 70%)` }}>
        <img src={p.image} alt={p.name}
          style={{ maxHeight:185, maxWidth:'100%', objectFit:'contain', position:'relative', zIndex:1,
            transition:'transform 0.5s cubic-bezier(0.16,1,0.3,1)' }}
          onError={e => { e.target.style.opacity='0.3'; e.target.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'120\' height=\'80\'%3E%3Crect width=\'120\' height=\'80\' fill=\'%23f0f0f0\'/%3E%3C/svg%3E'; }}
        />

        {/* Type badge */}
        <div style={{ position:'absolute', top:12, right:12 }}>
          <span style={{
            fontFamily: nepali ? NP_FONT : "'Inter',sans-serif",
            background:`${p.accent}15`,
            border:`1px solid ${p.accent}40`,
            color:'#000',
            padding:'5px 13px', borderRadius:8,
            fontSize: nepali ? '0.85rem' : '0.7rem',
            fontWeight:800,
            letterSpacing: nepali ? '0' : '1.2px',
            textTransform: nepali ? 'none' : 'uppercase',
          }}>
            {p.type}
          </span>
        </div>
      </div>

      {/* ── Info ── */}
      <div style={{ padding:'20px 22px 24px', display:'flex', flexDirection:'column', gap:14, flex:1 }}>

        {/* Tagline + Name */}
        <div>
          <div style={{
            fontFamily: nepali ? NP_FONT : "'Inter',sans-serif",
            fontSize: nepali ? '1rem' : '0.75rem',
            fontWeight: 800,
            color: '#000',
            letterSpacing: nepali ? '0' : '1px',
            textTransform: nepali ? 'none' : 'uppercase',
            marginBottom: 6,
            lineHeight: 1.4,
          }}>{p.tagline}</div>
          <h3 style={{ fontSize:'1.7rem', fontWeight:900, letterSpacing:'-0.5px', lineHeight:1.1, color:'#000' }}>
            {p.name}
          </h3>
        </div>

        {/* Specs grid */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {specRows.map(([key, val]) => {
            const label = nepali ? SPEC_LABELS[key]?.np : SPEC_LABELS[key]?.en;
            const Icon = key==='motor' ? Zap : key==='range' ? Battery : key==='battery' ? Shield : Cpu;
            return (
              <div key={key} style={{
                background:`${p.accent}0A`,
                border:`1px solid ${p.accent}30`,
                borderRadius:12, padding:'12px 14px',
              }}>
                {/* Label */}
                <div style={{
                  display:'flex', alignItems:'center', gap:5,
                  fontFamily: nepali ? NP_FONT : "'Inter',sans-serif",
                  fontSize: nepali ? '0.85rem' : '0.7rem',
                  fontWeight: 800,
                  color: '#4B6358', // Muted green for better contrast vs value
                  letterSpacing: nepali ? '0' : '0.5px',
                  marginBottom: 4,
                  textTransform: nepali ? 'none' : 'uppercase',
                }}>
                  <Icon size={12} color={p.accent} /> {label}
                </div>
                {/* Value */}
                <div style={{
                  fontSize:'1.15rem',
                  fontWeight:900,
                  color:'#000',
                  letterSpacing:'-0.2px',
                }}>{val}</div>
              </div>
            );
          })}
        </div>

        {/* Features */}
        <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
          {p.features.map(f => (
            <span key={f} style={{
              display:'flex', alignItems:'center', gap:6,
              background:`${p.accent}0A`,
              border:`1px solid ${p.accent}30`,
              borderRadius:8, padding:'6px 12px',
              fontSize: nepali ? '0.9rem' : '0.85rem',
              fontWeight: 500,
              color: '#000',
              fontFamily: nepali ? NP_FONT : 'inherit',
              lineHeight: 1.3,
            }}>
              <CheckCircle2 size={13} color={p.accent} style={{ flexShrink:0 }} /> {f}
            </span>
          ))}
        </div>

        {/* CTA */}
        <Link to={`/vehicles/${p.id}`} className="btn-outline" style={{
          marginTop:'auto', textAlign:'center', textDecoration:'none',
          borderColor:`${p.accent}50`,
          color:'#000',
          fontWeight:800,
          padding:'12px 16px',
          fontSize:'0.95rem',
          borderRadius: 12,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          transition: 'all 0.3s ease'
        }}>
          {nepali ? 'विस्तृत जानकारी' : 'View Details'} <ArrowRight size={16} />
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;
