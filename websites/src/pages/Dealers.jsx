import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Search, ArrowRight, Building2, Globe, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

const DEALERS = [
  { city: { ne: "वीरगन्ज", en: "Birgunj" }, location: { ne: "पर्सा", en: "Parsa" }, phone: "9821107355", type: "Head Office", isHead: true, query: "Kushwaha Motors Birgunj" },
  { city: { ne: "कलैया", en: "Kalaiya" }, location: { ne: "बारा", en: "Bara" }, phone: "9802595086", type: "Branch", query: "Kalaiya, Bara, Nepal" },
  { city: { ne: "सिमरा", en: "Simara" }, location: { ne: "बारा", en: "Bara" }, phone: "9812212699", type: "Branch", query: "Simara, Bara, Nepal" },
  { city: { ne: "सुकदेव चोक", en: "Sukdew Chowk" }, location: { ne: "रौतहट", en: "Rautahat" }, phone: "9801287097", type: "Branch", query: "Sukdew Chowk, Rautahat, Nepal" },
  { city: { ne: "हेटौंडा", en: "Hetauda" }, location: { ne: "मकवानपुर", en: "Makwanpur" }, phone: "9801235567", type: "Branch", query: "Hetauda, Makwanpur, Nepal" },
  { city: { ne: "टाँडी", en: "Tandi" }, location: { ne: "चितवन", en: "Chitwan" }, phone: "9843596487", type: "Branch", query: "Tandi, Chitwan, Nepal" },
  { city: { ne: "भरतपुर", en: "Bharatpur" }, location: { ne: "चितवन", en: "Chitwan" }, phone: "9812287436", type: "Branch", query: "Bharatpur, Chitwan, Nepal" },
  { city: { ne: "मलंगवा", en: "Malangwa" }, location: { ne: "सर्लाही", en: "Sarlahi" }, phone: "9866388988", type: "Branch", query: "Malangwa, Sarlahi, Nepal" },
];

const ADDITIONAL_LOCATIONS = [
  { ne: "दमक, झापा", en: "Damak, Jhapa", query: "Damak, Jhapa, Nepal" },
  { ne: "विराटचोक, मोरङ", en: "Biratchowk, Morang", query: "Biratchowk, Morang, Nepal" },
  { ne: "धरान, सुनसरी", en: "Dharan, Sunsari", query: "Dharan, Sunsari, Nepal" },
  { ne: "लहान, सिराहा", en: "Lahan, Siraha", query: "Lahan, Siraha, Nepal" },
  { ne: "लालबन्दी, सर्लाही", en: "Lalbandi, Sarlahi", query: "Lalbandi, Sarlahi, Nepal" },
  { ne: "हरिवन, सर्लाही", en: "Hariwon, Sarlahi", query: "Hariwon, Sarlahi, Nepal" },
  { ne: "चपुर, रौतहट", en: "Chapur, Rautahat", query: "Chapur, Rautahat, Nepal" },
  { ne: "बुटवल, रुपन्देही", en: "Butwal, Rupandehi", query: "Butwal, Rupandehi, Nepal" },
  { ne: "काठमाडौं", en: "Kathmandu", query: "Kathmandu, Nepal" },
  { ne: "भक्तपुर", en: "Bhaktapur", query: "Bhaktapur, Nepal" }
];

const Dealers = () => {
  const { language } = useLanguage();
  const t = translations[language].dealers;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMapQuery, setSelectedMapQuery] = useState('Kushwaha Motors Birgunj');
  const mapSectionRef = React.useRef(null);

  const getVal = (val) => {
    if (!val) return '';
    if (typeof val === 'object') return val[language] || val.en || '';
    return val;
  };

  const handleViewOnMap = (query) => {
    setSelectedMapQuery(query);
    mapSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const getMapUrl = () => {
    if (selectedMapQuery === 'Kushwaha Motors Birgunj') {
      return "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113941.56499645932!2d84.80801833549641!3d26.97723903175245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399355152a5c531d%3A0xe5f99233f260464f!2sKushwaha%20Motors!5e0!3m2!1sen!2snp!4v1715227000000!5m2!1sen!2snp";
    }
    return `https://maps.google.com/maps?q=${encodeURIComponent(selectedMapQuery)}&t=&z=15&ie=UTF8&iwloc=A&output=embed`;
  };
  
  const filteredDealers = DEALERS.filter(d => {
    const city = getVal(d.city).toLowerCase();
    const loc = getVal(d.location).toLowerCase();
    const term = searchTerm.toLowerCase();
    return city.includes(term) || loc.includes(term);
  });

  const filteredAdditional = ADDITIONAL_LOCATIONS.filter(loc =>
    getVal(loc).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ background: '#fcfdfd' }}>
      {/* Hero */}
      <section style={{ padding: 'clamp(100px, 15vw, 160px) 0 60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '80%', height: '80%', background: 'radial-gradient(ellipse, rgba(66,169,46,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div className="hud-label" style={{ justifyContent: 'center', marginBottom: 12 }}>{language === 'ne' ? 'डिलर खोज्नुहोस्' : 'Find a Dealer'}</div>
            <h1 style={{ fontWeight: 900, letterSpacing: '-2px', marginBottom: 20 }}>
              {language === 'ne' ? 'हाम्रो' : 'Our'} <span className="electric-text">{language === 'ne' ? 'नेपालभरि' : 'Nationwide'}</span> {language === 'ne' ? 'नेटवर्क' : 'Network'}
            </h1>
            <p style={{ color: 'var(--txt-2)', maxWidth: 540, margin: '0 auto 40px' }}>
              {t.subtitle}
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
                placeholder={t.searchPlaceholder}
                style={{ 
                   paddingLeft: 52, 
                   borderRadius: 999, 
                   fontSize: '1rem',
                   background: '#fff',
                   border: '1px solid rgba(66,169,46,0.2)',
                   color: 'var(--txt)',
                   boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid: Branches */}
      <section style={{ padding: '20px 0 60px' }}>
        <div className="container">
          <div style={{ marginBottom: 30, textAlign: 'center' }}>
            <h2 style={{ fontWeight: 900, color: 'var(--txt)', display: 'inline-flex', alignItems: 'center', gap: 15 }}>
              <Building2 size={28} color="var(--nature)" /> {t.branches}
            </h2>
          </div>
          
          <AnimatePresence mode="popLayout">
            <motion.div layout className="grid-3">
              {filteredDealers.map((d, index) => (
                <motion.div 
                  key={index} 
                  layout 
                  initial={{ opacity: 0, scale: 0.96 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="cyber-card"
                  style={{ 
                    padding: '16px 12px', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 12,
                    background: '#fff',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    borderColor: 'rgba(0,0,0,0.05)',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.02)',
                    borderRadius: 20,
                    ...(d.isHead ? { borderBottom: `4px solid var(--nature)` } : {}) 
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{
                      background: d.isHead ? 'var(--nature)' : 'rgba(66,169,46,0.1)',
                      color: d.isHead ? '#fff' : 'var(--nature)',
                      padding: '5px 14px', borderRadius: 999,
                      fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1.5px',
                    }}>
                      {d.isHead ? (language === 'ne' ? '⭐ मुख्य कार्यालय' : '⭐ Head Office') : (language === 'ne' ? 'शाखा' : d.type)}
                    </div>
                    <Zap size={18} color="var(--nature)" style={{ opacity: 0.4 }} />
                  </div>

                  <div style={{ marginTop: 'auto' }}>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 900, letterSpacing: '-0.5px', marginBottom: 4, color: 'var(--txt)', lineHeight: 1.2 }}>{getVal(d.city)}</h2>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start', color: 'var(--txt-2)', fontSize: '0.75rem', marginBottom: 8 }}>
                      <MapPin size={14} color="var(--nature)" style={{ marginTop: 2, flexShrink: 0 }} /> {getVal(d.location)}
                    </div>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <Phone size={14} color="var(--nature)" />
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--txt)' }}>{d.phone}</span>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 6, marginTop: 4 }}>
                    <a href={`tel:${d.phone}`} className="btn-outline" style={{ 
                      textAlign: 'center', 
                      textDecoration: 'none', 
                      padding: '10px 4px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 4
                    }}>
                      <Phone size={12} /> {language === 'ne' ? 'कल' : 'Call'}
                    </a>
                    <button onClick={() => handleViewOnMap(d.query)} className="btn-nature" style={{ 
                      fontSize: '0.75rem', 
                      padding: '10px 4px',
                      borderRadius: 12,
                      fontWeight: 800
                    }}>
                      {language === 'ne' ? 'नक्सा' : 'Map'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Additional Presence Section: Dealers */}
      {filteredAdditional.length > 0 && (
        <section style={{ padding: '40px 0 80px' }}>
          <div className="container">
            <div style={{ 
              padding: 'clamp(30px, 8vw, 60px) clamp(16px, 4vw, 40px)', 
              background: 'rgba(66,169,46,0.03)', 
              borderRadius: 32, 
              border: '1px solid rgba(66,169,46,0.1)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <h3 style={{ fontWeight: 900, marginBottom: 12, color: 'var(--txt)' }}>
                {language === 'ne' ? 'आधिकारिक' : 'Authorized'} <span className="electric-text">{language === 'ne' ? 'डिलरहरू' : 'Dealers'}</span>
              </h3>
              <p style={{ color: 'var(--txt-2)', marginBottom: 40 }}>{language === 'ne' ? 'हाम्रा आधिकारिक डिलरहरू निम्न स्थानहरूमा पनि उपलब्ध छन्।' : 'Our authorized dealers are also available in the following locations.'}</p>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 12 }}>
                {filteredAdditional.map((loc, i) => (
                  <motion.div 
                    key={i}
                    onClick={() => handleViewOnMap(loc.query)}
                    style={{ 
                      padding: '12px 20px', 
                      background: '#fff', 
                      borderRadius: 16, 
                      fontSize: '0.9rem', 
                      fontWeight: 800,
                      color: 'var(--txt)',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      border: '1px solid rgba(0,0,0,0.05)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--nature)' }} />
                    {getVal(loc)}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Map Section */}
      <section ref={mapSectionRef} style={{ padding: '40px 0 100px' }}>
        <div className="container">
          <div style={{ 
            background: '#fff', 
            borderRadius: 32, 
            overflow: 'hidden', 
            boxShadow: '0 30px 60px rgba(0,0,0,0.08)',
            border: '1px solid rgba(66,169,46,0.1)'
          }}>
            <div style={{ padding: 'clamp(24px, 5vw, 40px) clamp(16px, 4vw, 40px) 0', textAlign: 'center' }}>
              <h3 style={{ fontWeight: 900, marginBottom: 12 }}>
                {language === 'ne' ? 'हाम्रो' : 'Map'} <span className="electric-text">{language === 'ne' ? 'स्थानहरू' : 'Locations'}</span>
              </h3>
              <p style={{ color: 'var(--txt-2)', marginBottom: 24 }}>
                {language === 'ne' ? 'हाम्रा सबै शाखा र डिलरहरू नक्सामा हेर्नुहोस्।' : 'Find all our branches and dealers on the map.'}
              </p>

              <div style={{ maxWidth: 500, margin: '0 auto 40px' }}>
                <select 
                  value={selectedMapQuery}
                  onChange={(e) => setSelectedMapQuery(e.target.value)}
                  style={{ 
                    width: '100%',
                    padding: '14px 20px', 
                    borderRadius: '16px', 
                    border: '1px solid rgba(66,169,46,0.2)',
                    fontSize: '1rem',
                    fontWeight: 600,
                  }}
                >
                  <optgroup label={language === 'ne' ? 'शाखाहरू' : 'Branches'}>
                    {DEALERS.map(d => (
                      <option key={d.query} value={d.query}>{getVal(d.city)}</option>
                    ))}
                  </optgroup>
                  <optgroup label={language === 'ne' ? 'डिलरहरू' : 'Dealers'}>
                    {ADDITIONAL_LOCATIONS.map(loc => (
                      <option key={loc.query} value={loc.query}>{getVal(loc)}</option>
                    ))}
                  </optgroup>
                </select>
              </div>
            </div>

            <div style={{ height: 'clamp(400px, 70vh, 650px)', width: '100%', position: 'relative', background: '#e5e3df' }}>
              <iframe
                key={selectedMapQuery}
                title="Kushwaha Motors Locations"
                src={getMapUrl()}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10 }}>
                <a 
                  href={`https://www.google.com/maps/search/${encodeURIComponent(selectedMapQuery + ' Nepal')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-nature"
                  style={{ 
                    padding: '10px 16px', 
                    fontSize: '0.75rem', 
                    textDecoration: 'none', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 6,
                    background: 'rgba(255,255,255,0.95)',
                    color: 'var(--txt)',
                    border: '1px solid rgba(66,169,46,0.2)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                >
                  <Globe size={14} color="var(--nature)" /> {language === 'ne' ? 'नक्सा' : 'Maps'}
                </a>
              </div>

              <div style={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                background: 'rgba(255,255,255,0.95)',
                backdropFilter: 'blur(10px)',
                padding: '12px 16px',
                borderRadius: 16,
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                border: '1px solid rgba(66,169,46,0.1)',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                zIndex: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', fontWeight: 700 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--nature)' }} />
                  {language === 'ne' ? 'शाखा' : 'Branch'}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.75rem', fontWeight: 700 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--elec)' }} />
                  {language === 'ne' ? 'डिलर' : 'Dealer'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dealers;
