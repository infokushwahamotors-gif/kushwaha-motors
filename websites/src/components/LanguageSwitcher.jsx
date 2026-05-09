import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = ({ isMobile = false }) => {
  const { language, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const langs = [
    { code: 'ne', label: 'नेपाली', flag: '🇳🇵' },
    { code: 'en', label: 'English', flag: '🇺🇸' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (isMobile) {
    return (
      <div style={{ padding: '16px 0', borderTop: '1px solid rgba(0,0,0,0.05)', marginTop: '8px' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 800, color: 'var(--txt-3)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
          {language === 'ne' ? 'भाषा छान्नुहोस्' : 'Select Language'}
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {langs.map((l) => (
            <button
              key={l.code}
              onClick={() => toggleLanguage(l.code)}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '12px',
                border: '1px solid ' + (language === l.code ? 'var(--nature)' : 'rgba(0,0,0,0.1)'),
                background: language === l.code ? 'rgba(66, 169, 46, 0.08)' : '#fff',
                color: language === l.code ? 'var(--nature)' : 'var(--txt)',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'rgba(0,0,0,0.03)',
          border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: '999px',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          fontWeight: 700,
          color: 'var(--txt)',
          fontSize: '0.85rem',
          transition: 'all 0.2s ease'
        }}
        onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
        onMouseOut={e => e.currentTarget.style.background = 'rgba(0,0,0,0.03)'}
      >
        <Globe size={16} color="var(--nature)" />
        <span>{language === 'ne' ? 'नेपाली' : 'English'}</span>
        <ChevronDown size={14} style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s' }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              position: 'absolute',
              top: '120%',
              right: 0,
              background: '#fff',
              borderRadius: '16px',
              padding: '6px',
              minWidth: '150px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.12)',
              border: '1px solid rgba(0,0,0,0.05)',
              zIndex: 1000
            }}
          >
            {langs.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  toggleLanguage(l.code);
                  setIsOpen(false);
                }}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  border: 'none',
                  background: language === l.code ? 'rgba(66, 169, 46, 0.08)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  color: language === l.code ? 'var(--nature)' : 'var(--txt)',
                  fontWeight: language === l.code ? 800 : 600,
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: '1rem' }}>{l.flag}</span>
                  <span>{l.label}</span>
                </div>
                {language === l.code && <Check size={14} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
