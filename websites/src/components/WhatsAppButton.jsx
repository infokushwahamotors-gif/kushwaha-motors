import React from 'react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/9779801235567"
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '16px',
        zIndex: 9999,
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        background: '#25D366',
        boxShadow: '0 4px 12px rgba(37,211,102,0.4)',
        transition: 'all 0.3s var(--ease)',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.1) translateY(-5px)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
      }}
    >
      <img 
        src="/whatsapp.png" 
        alt="WhatsApp" 
        style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
      />
    </a>
  );
};

export default WhatsAppButton;
