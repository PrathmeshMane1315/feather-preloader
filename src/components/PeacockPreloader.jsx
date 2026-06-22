import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./PeacockPreloader.css";
import feather from "../assets/peacock feather.png";

export default function PeacockPreloader({ onComplete }) {
  const containerRef = useRef(null);
  const featherRef = useRef(null);
  const textRef = useRef(null);
  const sparkleContainerRef = useRef(null);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (!featherRef.current || !containerRef.current) return;

    const featherEl = featherRef.current;
    const w = window.innerWidth;
    const h = window.innerHeight;

    // Responsive final position — feather must land on top of "K"
    // K font-size scales with vw, so offsets scale with viewport too
    let finalX, finalY, finalScale, midX, midY, midScale;

    if (w <= 360) {
      // Extra small phones
      finalX = -28; finalY = -72; finalScale = 0.07;
      midX   = -20; midY  = -30; midScale = 0.10;
    } else if (w <= 480) {
      // Small phones
      finalX = -36; finalY = -88; finalScale = 0.08;
      midX   = -25; midY  = -38; midScale = 0.12;
    } else if (w <= 640) {
      // Large phones / small phablet
      finalX = -52; finalY = -108; finalScale = 0.09;
      midX   = -38; midY  = -50;  midScale = 0.13;
    } else if (w <= 768) {
      // Small tablets / landscape phone
      finalX = -65; finalY = -120; finalScale = 0.10;
      midX   = -48; midY  = -55;  midScale = 0.14;
    } else if (w <= 1024) {
      // Tablets
      finalX = -80; finalY = -135; finalScale = 0.12;
      midX   = -65; midY  = -60;  midScale = 0.16;
    } else {
      // Desktop (original values)
      finalX = -99; finalY = -151; finalScale = 0.15;
      midX   = -80; midY  = -55;  midScale = 0.18;
    }

    const tl = gsap.timeline({
      onComplete: () => setShowText(true)
    });

    // Initial position — enters from right side
    gsap.set(featherEl, {
      x: w * 0.9,
      y: h * 0.6,
      rotation: 43,
      scale: 0.2,
      opacity: 0,
    });

    // Step 1: Feather appears
    tl.to(featherEl, {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: 'power2.out',
    })
    // Step 2: Sweeps across screen
    .to(featherEl, {
      x: -w * 0.4,
      y: -h * 0.3,
      rotation: -20,
      duration: 3,
      ease: 'power1.inOut',
    }, '+=0.3')
    // Step 3: Approaches K top
    .to(featherEl, {
      x: midX,
      y: midY,
      rotation: -75,
      scale: midScale,
      duration: 1.5,
      ease: 'power2.inOut',
    })
    // Step 4: Settles on K
    .to(featherEl, {
      x: finalX,
      y: finalY,
      rotation: -70,
      scale: finalScale,
      duration: 0.8,
      ease: 'back.out(1.2)',
    });

    return () => { tl.kill(); };
  }, []);


  useEffect(() => {
    if (!showText || !textRef.current) return;

    const letters = textRef.current.querySelectorAll('.letter');
    
    gsap.fromTo(letters, 
      { opacity: 0, y: 60, scale: 0.3, filter: "blur(15px)" },
      { 
        opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
        duration: 0.7,
        stagger: 0.12,
        ease: "back.out(1.7)",
        onComplete: () => {
          // 🔥 FIX: Delay kam kar diya 3s se 0.5s
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1.5,
            delay: 0.5, // 3 ki jagah 0.5
            ease: "power2.inOut",
            onComplete: () => { 
              if (onComplete) onComplete(); 
            }
          });
        }
      }
    );
  }, [showText, onComplete]); // ✅ showShow ki jagah showText

  useEffect(() => {
    if (!sparkleContainerRef.current || !showText) return;
    const container = sparkleContainerRef.current;

    const createSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      const size = Math.random() * 5 + 2;
      const colors = ['#FFD700', '#00CED1', '#FF69B4', '#7FFF00', '#FF6347', '#E6E6FA'];
      
      sparkle.style.cssText = `
        position: absolute; left: ${x}px; top: ${y}px;
        width: ${size}px; height: ${size}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        box-shadow: 0 0 ${size * 3}px currentColor, 0 0 ${size * 6}px currentColor;
        pointer-events: none; z-index: 50;
      `;
      
      container.appendChild(sparkle);
      gsap.fromTo(sparkle,
        { opacity: 0, scale: 0 },
        { 
          opacity: 1, scale: 1, duration: 0.2,
          onComplete: () => {
            gsap.to(sparkle, {
              opacity: 0, scale: 0, duration: 0.8, delay: 0.1,
              onComplete: () => sparkle.remove()
            });
          }
        }
      );
    };

    const interval = setInterval(createSparkle, 80);
    return () => clearInterval(interval);
  }, [showText]);

  const brandName = "Krishalaa";

  return (
    <div className="loader-overlay" ref={containerRef}>
      <div ref={sparkleContainerRef} className="sparkle-container" />
      
      <img
        ref={featherRef}
        src={feather}
        alt="Peacock Feather"
        className="feather-image"
      />

      {showText && (
        <div ref={textRef} className="brand-text-container">
          <div className="brand-text">
            {brandName.split('').map((letter, index) => (
              <span 
                key={index} 
                className="letter" 
                style={{ 
                  '--i': index,
                  '--rotate': index === 0 ? '-15deg' : `${(index % 2 === 0 ? 1 : -1) * (Math.random() * 10 + 5)}deg`
                }}
              >
                {letter}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-particles">
        {[...Array(25)].map((_, i) => (
          <div key={i} className="bg-particle" style={{
            '--delay': `${Math.random() * 5}s`,
            '--duration': `${Math.random() * 3 + 2}s`,
            '--x': `${Math.random() * 100}%`,
            '--size': `${Math.random() * 3 + 1}px`,
          }} />
        ))}
      </div>
    </div>
  );
}