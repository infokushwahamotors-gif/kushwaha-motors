import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LanguageSwitcher = () => {
  const { language, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const langs = [
    { code: 'ne', label: 'नेपाली', flag: '🇳🇵' },
    { code: 'en', label: 'English', flag: '🇺🇸' }
  ];

  return (
    <div style={{ position: 'fixed', top: 20, right: 20, zIndex: 9999 }}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(66, 169, 46, 0.2)',
          borderRadius: '999px',
          padding: '10px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
          cursor: 'pointer',
          fontWeight: 700,
          color: 'var(--txt)'
        }}
      >
        <Globe size={18} color="var(--nature)" />
        <span>{language === 'ne' ? 'नेपाली' : 'English'}</span>
      </motion.button>

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
              borderRadius: '20px',
              padding: '8px',
              minWidth: '160px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
              border: '1px solid rgba(0,0,0,0.05)',
              overflow: 'hidden'
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
                  padding: '12px 16px',
                  border: 'none',
                  background: language === l.code ? 'rgba(66, 169, 46, 0.1)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  color: language === l.code ? 'var(--nature)' : 'var(--txt)',
                  fontWeight: language === l.code ? 800 : 600
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: '1.2rem' }}>{l.flag}</span>
                  <span>{l.label}</span>
                </div>
                {language === l.code && <Check size={16} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
