import { useEffect, useRef } from 'react';

/**
 * ParticleField (now LeavesField) — Canvas-based realistic falling leaves
 * Simulates organic, physics-based falling leaves with 3D tumbling.
 */
const ParticleField = ({ count = 40, opacity = 0.8 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame;
    let leaves = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    class Leaf {
      constructor() {
        this.reset(true);
      }
      
      reset(randomY = false) {
        this.x = Math.random() * canvas.width;
        // Start above the screen if not initial random placement
        this.y = randomY ? Math.random() * canvas.height : -100;
        
        // Physics
        this.vy = 0.5 + Math.random() * 1.5; // fall speed
        this.vx = (Math.random() - 0.5) * 1.0; // wind drift base
        this.windOffset = Math.random() * Math.PI * 2;
        this.windSpeed = 0.01 + Math.random() * 0.02;
        
        // Visuals
        this.size = 6 + Math.random() * 10;
        // Color variation: mostly green, some slight yellow/autumn hints
        this.type = Math.random();
        this.baseColor = this.type > 0.85 ? 'rgba(212, 195, 66, ' : this.type > 0.5 ? 'rgba(66, 169, 46, ' : 'rgba(29, 138, 65, ';
        
        // 3D rotation simulation
        this.rotZ = Math.random() * Math.PI * 2; // Flat rotation
        this.vRotZ = (Math.random() - 0.5) * 0.05;
        this.rotX = Math.random() * Math.PI * 2; // Tumbling axis
        this.vRotX = 0.02 + Math.random() * 0.05;
      }
      
      update() {
        // Wind drift via sine wave
        const drift = Math.sin(this.windOffset) * 1.0;
        this.x += this.vx + drift;
        this.y += this.vy;
        
        this.windOffset += this.windSpeed;
        this.rotZ += this.vRotZ;
        this.rotX += this.vRotX;
        
        // Reset if offscreen
        if (this.y > canvas.height + 50) {
          this.reset(false);
        }
        if (this.x > canvas.width + 50) this.x = -50;
        if (this.x < -50) this.x = canvas.width + 50;
      }
      
      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotZ);
        // Simulate 3D tumbling by scaling Y based on a sine wave of rotX
        const scaleY = Math.abs(Math.sin(this.rotX));
        ctx.scale(1, Math.max(0.1, scaleY));
        
        // Draw leaf shape (Almond/Eye shape)
        ctx.beginPath();
        ctx.moveTo(0, -this.size);
        // Right curve
        ctx.quadraticCurveTo(this.size, 0, 0, this.size);
        // Left curve
        ctx.quadraticCurveTo(-this.size, 0, 0, -this.size);
        
        // Leaf Gradient
        const grad = ctx.createLinearGradient(0, -this.size, 0, this.size);
        grad.addColorStop(0, this.baseColor + '0.9)');
        grad.addColorStop(1, this.baseColor + '0.5)');
        
        ctx.fillStyle = grad;
        ctx.fill();
        
        // Stem / Vein
        ctx.beginPath();
        ctx.moveTo(0, -this.size * 1.2);
        ctx.lineTo(0, this.size * 0.8);
        ctx.strokeStyle = `rgba(0,0,0,0.15)`;
        ctx.lineWidth = 1;
        ctx.stroke();
        
        ctx.restore();
      }
    }

    const init = () => {
      resize();
      leaves = Array.from({ length: count }, () => new Leaf());
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Soft ambient sunlight/wind effect could be added here if needed
      
      // Draw leaves
      leaves.forEach(leaf => {
        leaf.update();
        leaf.draw();
      });

      animFrame = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener('resize', init);
    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', init);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        opacity, pointerEvents: 'none', zIndex: 0,
      }}
    />
  );
};

export default ParticleField;
