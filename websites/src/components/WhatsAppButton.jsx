import React from 'react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/9779801235567"
      target="_blank"
      rel="noopener noreferrer"
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        zIndex: 9999,
        width: '64px',
        height: '64px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        filter: 'drop-shadow(0 15px 25px rgba(0,0,0,0.25)) drop-shadow(0 5px 10px rgba(0,0,0,0.15))',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'scale(1.15) translateY(-8px)';
        e.currentTarget.style.filter = 'drop-shadow(0 25px 35px rgba(0,0,0,0.3)) drop-shadow(0 10px 15px rgba(0,0,0,0.2))';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'scale(1) translateY(0)';
        e.currentTarget.style.filter = 'drop-shadow(0 15px 25px rgba(0,0,0,0.25)) drop-shadow(0 5px 10px rgba(0,0,0,0.15))';
      }}
    >
      <img 
        src="/whatsapp.png" 
        alt="Chat on WhatsApp" 
        style={{ 
          width: '100%', 
          height: '100%', 
          objectFit: 'contain' 
        }} 
      />
    </a>
  );
};

export default WhatsAppButton;
