import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail, MapPin, Globe, Zap, Leaf } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { language } = useLanguage();
  const isNep = language === 'ne';

  return (
    <footer>
      {/* Top gradient line */}
      <div className="footer-glow" />

      {/* Background particle shimmer */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,229,255,0.04) 0%, transparent 60%)', pointerEvents: 'none' }} />

      <div className="container footer-grid" style={{ position: 'relative', zIndex: 1 }}>
        {/* Brand */}
        <div className="footer-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 38, height: 38, background: 'linear-gradient(135deg,var(--elec),var(--nature))', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,229,255,0.3)' }}>
              <Zap size={20} color="#000" />
            </div>
            <div>
              <div style={{ fontWeight: 900, fontSize: '0.95rem', letterSpacing: '-0.3px', lineHeight: 1.1 }}>{isNep ? 'कुशवाहा मोटर्स' : 'Kushwaha Motors'}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--nature)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>{isNep ? 'विद्युतीय सवारी' : 'Electric Vehicles'}</div>
            </div>
          </div>
          <p>{isNep ? 'नेपालको अग्रणी विद्युतीय सवारी वितरक। सन् २०१५ देखि दिगो र किफायती यातायातको पहिचान।' : 'Nepal\'s leading electric vehicle distributor. Identity of sustainable and affordable transport since 2015.'}</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
            {[Facebook, Instagram].map((Icon, i) => (
              <a key={i} href="#"
                style={{ width: 40, height: 40, background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.1)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--txt-2)', transition: 'all 0.3s', textDecoration: 'none' }}
                onMouseOver={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.12)'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.3)'; e.currentTarget.style.color = 'var(--elec)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(0,229,255,0.25)'; }}
                onMouseOut={e => { e.currentTarget.style.background = 'rgba(0,229,255,0.05)'; e.currentTarget.style.borderColor = 'rgba(0,229,255,0.1)'; e.currentTarget.style.color = 'var(--txt-2)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Company */}
        <div className="footer-col">
          <h4>{isNep ? 'कम्पनी' : 'Company'}</h4>
          <ul>
            <li><Link to="/about">{isNep ? 'हाम्रो बारेमा' : 'About Us'}</Link></li>
            <li><Link to="/dealers">{isNep ? 'डिलर नेटवर्क' : 'Dealer Network'}</Link></li>
            <li><Link to="/contact">{isNep ? 'सम्पर्क' : 'Contact'}</Link></li>
            <li><Link to="/vehicles">{isNep ? 'टेस्ट राइड बुक गर्नुहोस्' : 'Book Test Ride'}</Link></li>
          </ul>
        </div>

        {/* Vehicles */}
        <div className="footer-col">
          <h4>{isNep ? 'सवारी साधनहरू' : 'Vehicles'}</h4>
          <ul>
            <li><Link to="/vehicles?category=twoWheeler">{isNep ? 'विद्युतीय स्कुटरहरू' : 'Electric Scooters'}</Link></li>
            <li><Link to="/vehicles?category=threeWheeler&type=passenger">{isNep ? 'यात्री रिक्शाहरू' : 'Passenger Rickshaws'}</Link></li>
            <li><Link to="/vehicles?category=threeWheeler&type=cargo">{isNep ? 'कार्गो लोडरहरू' : 'Cargo Loaders'}</Link></li>
            <li><Link to="/vehicles?category=threeWheeler&type=school">{isNep ? 'स्कूल यातायात' : 'School Transport'}</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>{isNep ? 'सम्पर्क' : 'Contact'}</h4>
          <div className="footer-contact-item"><MapPin size={16} color="var(--elec)" style={{ flexShrink: 0, marginTop: 2 }} /><span>{isNep ? 'त्रिमूर्ति चोक, वीरगन्ज, नेपाल' : 'Trimurti Chowk, Birgunj, Nepal'}</span></div>
          <div className="footer-contact-item"><Phone size={16} color="var(--nature)" style={{ flexShrink: 0 }} /><span>+977-9821107355</span></div>
          <div className="footer-contact-item"><Mail size={16} color="var(--elec)" style={{ flexShrink: 0 }} /><span>info@kushwahamotors.com.np</span></div>
          <div className="footer-contact-item"><Globe size={16} color="var(--nature)" style={{ flexShrink: 0 }} /><span>www.kushwahamotors.com.np</span></div>
        </div>
      </div>

      <div className="container">
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {isNep ? 'कुशवाहा मोटर्स प्रा. लि. सर्वाधिकार सुरक्षित।' : 'Kushwaha Motors Pvt. Ltd. All rights reserved.'}</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Zap size={12} color="var(--elec)" /> {isNep ? 'स्वच्छ ऊर्जाद्वारा सञ्चालित · नेपालको लागि निर्मित' : 'Powered by Clean Energy · Built for Nepal'}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
