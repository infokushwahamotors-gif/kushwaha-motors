/**
 * LightningBolt — SVG animated lightning arc
 * Flickers randomly to simulate electric discharge
 */
import { useEffect, useState } from 'react';

const generateLightning = (x1, y1, x2, y2, roughness = 0.5, depth = 5) => {
  if (depth === 0) return [[x1, y1], [x2, y2]];
  const mx = (x1 + x2) / 2 + (Math.random() - 0.5) * roughness * Math.hypot(x2 - x1, y2 - y1);
  const my = (y1 + y2) / 2 + (Math.random() - 0.5) * roughness * Math.hypot(x2 - x1, y2 - y1);
  const left = generateLightning(x1, y1, mx, my, roughness * 0.6, depth - 1);
  const right = generateLightning(mx, my, x2, y2, roughness * 0.6, depth - 1);
  return [...left, ...right];
};

const LightningBolt = ({ x1 = 50, y1 = 0, x2 = 50, y2 = 100, width = 100, height = 100, color = '#00E5FF', interval = 2000 }) => {
  const [points, setPoints] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const trigger = () => {
      const newPts = generateLightning(x1, y1, x2, y2, 0.4, 5);
      setPoints(newPts);
      setVisible(true);
      setTimeout(() => setVisible(false), 80 + Math.random() * 100);
      // Double flash
      setTimeout(() => {
        setVisible(true);
        setTimeout(() => setVisible(false), 40);
      }, 130);
    };
    const t = setInterval(trigger, interval + Math.random() * 1000);
    trigger();
    return () => clearInterval(t);
  }, [x1, y1, x2, y2, interval]);

  const d = points.length < 2 ? '' : `M ${points.map(p => p.join(' ')).join(' L ')}`;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} style={{ position: 'absolute', pointerEvents: 'none', overflow: 'visible' }}>
      {visible && (
        <>
          {/* Outer glow */}
          <path d={d} stroke={color} strokeWidth="3" fill="none" opacity="0.15"
            filter="url(#glow)" strokeLinecap="round" />
          {/* Core bolt */}
          <path d={d} stroke={color} strokeWidth="1" fill="none" opacity="0.8"
            strokeLinecap="round" />
          {/* White hot core */}
          <path d={d} stroke="white" strokeWidth="0.5" fill="none" opacity="0.4"
            strokeLinecap="round" />
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            </filter>
          </defs>
        </>
      )}
    </svg>
  );
};

export default LightningBolt;
