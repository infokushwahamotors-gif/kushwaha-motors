import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Phone, Mail, MapPin, Globe, Zap, Leaf } from 'lucide-react';

const Footer = () => (
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
            <div style={{ fontWeight: 900, fontSize: '0.95rem', letterSpacing: '-0.3px', lineHeight: 1.1 }}>KUSHWAHA MOTORS</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--nature)', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>Electric Vehicles</div>
          </div>
        </div>
        <p>नेपालको अग्रणी विद्युतीय सवारी वितरक। सन् २०१५ देखि दिगो र किफायती यातायातको पहिचान।</p>
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
        <h4>Company</h4>
        <ul>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/dealers">Dealer Network</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/vehicles">Book Test Ride</Link></li>
        </ul>
      </div>

      {/* Vehicles */}
      <div className="footer-col">
        <h4>Vehicles</h4>
        <ul>
          <li><Link to="/vehicles?category=twoWheeler">Electric Scooters</Link></li>
          <li><Link to="/vehicles?category=threeWheeler&type=passenger">Passenger Rickshaws</Link></li>
          <li><Link to="/vehicles?category=threeWheeler&type=cargo">Cargo Loaders</Link></li>
          <li><Link to="/vehicles?category=threeWheeler&type=school">School Transport</Link></li>
        </ul>
      </div>

      {/* Contact */}
      <div className="footer-col">
        <h4>Contact</h4>
        <div className="footer-contact-item"><MapPin size={16} color="var(--elec)" style={{ flexShrink: 0, marginTop: 2 }} /><span>Trimurti Chowk, Birgunj, Nepal</span></div>
        <div className="footer-contact-item"><Phone size={16} color="var(--nature)" style={{ flexShrink: 0 }} /><span>+977-9821107355</span></div>
        <div className="footer-contact-item"><Mail size={16} color="var(--elec)" style={{ flexShrink: 0 }} /><span>info@kushwahamotors.com.np</span></div>
        <div className="footer-contact-item"><Globe size={16} color="var(--nature)" style={{ flexShrink: 0 }} /><span>www.kushwahamotors.com.np</span></div>
      </div>
    </div>

    <div className="container">
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Kushwaha Motors Pvt. Ltd. All rights reserved.</span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Zap size={12} color="var(--elec)" /> Powered by Clean Energy · Made for Nepal
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
